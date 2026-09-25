// CloudFront Function (viewer-request) — attach to each internal-tool
// distribution that must stay out of Google:
//   admin.nipige.com, dev.admin.nipige.com, automation.nipige.com,
//   homecare.nipige.com, rasa.dev.web.nipige.com, live.app.nipige.com,
//   dev.app.nipige.com, fastforge.nipige.com
//
// Self-contained fix — no separate Response Headers Policy required:
//   1. No/invalid credentials -> 401 challenge, WITH X-Robots-Tag: noindex
//      on that same response. This is what curl -I (and Googlebot, which
//      never sends credentials) will always see.
//   2. Valid credentials -> request passes through to the origin as normal.
//      The origin's own 200 response won't carry the noindex header from
//      this function (it only runs on viewer-request); if you want the
//      header on authenticated 200s too, add a CloudFront Response Headers
//      Policy with a custom "X-Robots-Tag: noindex" header on the same
//      cache behavior — belt-and-suspenders, not required for the 401 case.
//
// Deploy per distribution: CloudFront console -> Functions -> Create ->
// paste this (with USER/PASS replaced) -> Publish -> associate with the
// distribution's default cache behavior, event type "Viewer request".
//
// Basic auth credentials are hardcoded below (base64 of "user:password").
// Generate your own with: echo -n 'youruser:yourpassword' | base64
// Rotate this value periodically; anyone with the distribution config can
// read it, so do not reuse a password used elsewhere.

var EXPECTED = "Basic REPLACE_WITH_BASE64_USER_COLON_PASSWORD";

function handler(event) {
  var request = event.request;
  var headers = request.headers;
  var auth = headers.authorization && headers.authorization.value;

  if (auth === EXPECTED) {
    return request;
  }

  return {
    statusCode: 401,
    statusDescription: "Unauthorized",
    headers: {
      "www-authenticate": { value: 'Basic realm="Restricted"' },
      "x-robots-tag": { value: "noindex" },
    },
  };
}
