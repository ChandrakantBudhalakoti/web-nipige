# CloudFront-level SEO fixes (manual deploy required)

These are not applied automatically — this repo has no AWS credentials or
CloudFront distribution IDs, so nobody here can push them for you. Each file
is a ready-to-paste CloudFront Function; deploy via the CloudFront console
(or your existing IaC if the distributions are managed in Terraform/CDK
elsewhere — check there first so you don't end up with duplicate/conflicting
functions).

## 1. nipige.com → https://www.nipige.com as a true 301

File: `apex-to-www-301.js`

- Attach to the **nipige.com** distribution's default cache behavior,
  event type **Viewer request**.
- Separately, on **every** cache behavior on **both** the nipige.com and
  www.nipige.com distributions, set **Viewer protocol policy** to
  **"Redirect HTTP to HTTPS."** That's a built-in CloudFront setting (no
  code) and it already returns a 301, so it covers the http:// → https://
  half of task 1.
- If nipige.com currently 302s, that redirect is likely coming from
  somewhere other than this repo already — check for an existing
  CloudFront Function/Lambda@Edge on that distribution, or a domain
  registrar "forwarding" setting (GoDaddy/Namecheap-style), before adding
  this one, so you don't end up with two redirects fighting each other.

## 2. Admin/test subdomains: 401 + noindex

File: `noindex-and-basicauth.js`

Applies to: admin.nipige.com, dev.admin.nipige.com, automation.nipige.com,
homecare.nipige.com, rasa.dev.web.nipige.com, live.app.nipige.com,
dev.app.nipige.com, fastforge.nipige.com — 8 hostnames that must both
require login and stop being indexed.

These are separate applications outside this repo, so there's no app-level
code to change — this CloudFront Function is the entire fix. It returns a
401 with `X-Robots-Tag: noindex` on that same response for anyone without
valid credentials — which is exactly what Googlebot always is, since it
never sends an `Authorization` header. No Response Headers Policy is
required to satisfy the check in this brief (`curl -I` → 401 + noindex);
one is only worth adding on top if you also want authenticated 200s tagged.

### Step-by-step (AWS Console)

**1. Generate your Basic Auth credential once:**
```
echo -n 'yourusername:yourpassword' | base64
```
Pick a password you haven't reused elsewhere — anyone with read access to
the distribution config or the Functions console can see this string.

**2. Find which distribution(s) actually serve these 8 hostnames.**
CloudFront console → **Distributions** → look at the **Alternate domain
name (CNAME)** column for each row. It's common for several of these
hostnames to be aliases on the *same* distribution (e.g. all the `*.app.
nipige.com` ones together) — if so, one function covers all of them at
once. Note down every distribution ID that matches any of the 8 hostnames;
you'll repeat step 5 once per distribution.

**3. Create the function.**
CloudFront console → **Functions** (left sidebar, under "CloudFront") →
**Create function** → name it something like `internal-noindex-auth` →
paste the contents of `noindex-and-basicauth.js`, with
`REPLACE_WITH_BASE64_USER_COLON_PASSWORD` swapped for the string from
step 1 (keep the `Basic ` prefix).

**4. Test it (optional but recommended).**
Still on the function's page → **Test** tab → build a test event with an
event type of "Viewer request" → run it once with no `authorization`
header (expect a 401 in the output) and once with the header set to your
`Basic ...` value (expect the original request passed through unchanged).

**5. Publish, then associate it — once per distribution from step 2.**
- Click **Publish** on the function.
- Go to **Distributions** → open the distribution → **Behaviors** tab →
  select the behavior (usually "Default (*)") → **Edit**.
- Scroll to **Function associations** → **Viewer request** → choose
  **CloudFront Functions** → select the function you just published →
  **Save changes**.
- Repeat for every other distribution identified in step 2.

**6. Wait for propagation.**
CloudFront changes typically take 1–5 minutes to roll out to all edge
locations. The distribution's **Last modified** status will show
"Deploying" until it's done.

**7. Verify.**
```
curl -I https://admin.nipige.com/
```
Expect `HTTP/1.1 401 Unauthorized` and an `x-robots-tag: noindex` header.
Repeat for all 8 hostnames. To confirm the credential itself works:
```
curl -I -u yourusername:yourpassword https://admin.nipige.com/
```
Expect the app's normal response code (200, or whatever it returns) instead
of 401.

**8. (Optional, belt-and-suspenders) Tag authenticated 200s too.**
If you also want the noindex header on responses *after* successful login
(not just the 401): same distribution → **Response headers policies** →
create one with a custom header `X-Robots-Tag: noindex` → attach it to the
same cache behavior. Not required to pass the check in this brief, since
Googlebot will only ever see the 401.

### If I can't do this myself — why

I have no AWS credentials, no CLI access, and no console access in this
environment — there's genuinely no way for me to log into CloudFront and
click these buttons for you. The steps above are exact and copy-pasteable;
if something doesn't match what you see in the console (AWS moves menu
items around occasionally), the anchor points are: **Functions** (create +
associate) and **Behaviors → Function associations → Viewer request**
(attach).
