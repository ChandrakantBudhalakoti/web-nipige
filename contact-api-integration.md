# Nipige Contact API — Frontend Integration Guide

**Frontend endpoint:** `POST /api/contact` (Next.js API route proxy)
**Upstream endpoint:** `POST https://8kgtju0kg2.execute-api.ap-south-1.amazonaws.com/contact`
**Content-Type:** `application/json`

All three forms submit to the internal `/api/contact` route. That route validates the payload and forwards it to the upstream AWS Lambda, avoiding cross-origin (CORS) issues in the browser.

The `type` field tells the backend which form was submitted — send exactly `"demo"`, `"agency"`, or `"contact"`.

---

## 1. Book Demo Form

### Fields (in order shown on the form)

| Field | JSON key | Required | Type | Notes |
|---|---|---|---|---|
| Your name | `name` | ✅ Yes | string | |
| Email address | `email` | ✅ Yes | string | Must be a valid email format |
| Company / Project name | `company` | ✅ Yes | string | |
| Solution interest | `interest` | ✅ Yes | string | Dropdown value |
| Message (optional) | `message` | ❌ No | string | Can be empty string or omitted |

### Request payload

```json
{
  "type": "demo",
  "name": "Arup Bera",
  "email": "arup@trigital.in",
  "company": "Trigital",
  "interest": "AI Automation",
  "message": "Tell us about your platform idea (optional)"
}
```

### Example fetch call

```javascript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "demo",
    name: nameValue,
    email: emailValue,
    company: companyValue,
    interest: interestValue,
    message: messageValue || ""
  })
});

const data = await response.json();
```

---

## 2. Apply for Agency Program Form

### Fields (in order shown on the form)

| Field | JSON key | Required | Type | Notes |
|---|---|---|---|---|
| Agency name | `agencyName` | ✅ Yes | string | |
| Your name | `name` | ✅ Yes | string | |
| Email address | `email` | ✅ Yes | string | Must be a valid email format |
| Agency website URL | `website` | ✅ Yes | string | |
| Clients per year | `clientsPerYear` | ✅ Yes | string | |
| Primary solution interest | `interest` | ✅ Yes | string | Dropdown value |
| Message (optional) | `message` | ❌ No | string | Can be empty string or omitted |

### Request payload

```json
{
  "type": "agency",
  "agencyName": "Trigital",
  "name": "Arup Bera",
  "email": "arup@trigital.in",
  "website": "https://trigital.in",
  "clientsPerYear": "10-20",
  "interest": "White-label Platform",
  "message": "Tell us about your agency (optional)"
}
```

### Example fetch call

```javascript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "agency",
    agencyName: agencyNameValue,
    name: nameValue,
    email: emailValue,
    website: websiteValue,
    clientsPerYear: clientsPerYearValue,
    interest: interestValue,
    message: messageValue || ""
  })
});

const data = await response.json();
```

---

## 3. Get in Touch (General Contact) Form

### Fields (in order shown on the form)

| Field | JSON key | Required | Type | Notes |
|---|---|---|---|---|
| Your name | `name` | ✅ Yes | string | |
| Email address | `email` | ✅ Yes | string | Must be a valid email format |
| Subject | `subject` | ✅ Yes | string | |
| How can we help? | `message` | ✅ Yes | string | Required for this form (unlike Demo/Agency) |

### Request payload

```json
{
  "type": "contact",
  "name": "Arup Bera",
  "email": "arup@trigital.in",
  "subject": "Question about pricing",
  "message": "How can we help?"
}
```

### Example fetch call

```javascript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "contact",
    name: nameValue,
    email: emailValue,
    subject: subjectValue,
    message: messageValue
  })
});

const data = await response.json();
```

---

## 4. Responses

### Success (both forms)

```json
{ "success": true }
```
HTTP status: `200`

### Validation error (missing/invalid field)

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "email is required",
    "interest is required"
  ]
}
```
HTTP status: `400`
Show a friendly inline error near the relevant field(s), or a general "please fill in all required fields" message.

### Invalid or missing `type`

```json
{ "success": false, "error": "Invalid or missing 'type'. Must be 'demo', 'agency', or 'contact'." }
```
HTTP status: `400`
This should never happen in production if `type` is hardcoded correctly per form — it's really a dev-side safety check.

### Server error (unexpected failure, e.g. SES issue)

```json
{ "success": false, "error": "Internal server error. Please try again later." }
```
HTTP status: `500`
Show a generic "Something went wrong, please try again" message. Safe to allow retry.

---

## 5. Important integration notes

1. **`type` must be hardcoded per form** — `"demo"` for Book Demo, `"agency"` for Apply for Agency Program, `"contact"` for Get in Touch. Don't make this dynamic/user-editable.
2. **Email format is validated server-side**, but validating on the frontend too (basic regex or `type="email"` input) gives users faster feedback before hitting the API.
3. **All required fields must be non-empty** after trimming whitespace — don't send `"   "` as a valid value.
4. **`message` is optional for Demo and Agency**, but **required for the Contact form** — omit/`""` is fine for Demo/Agency, but Contact must have a non-empty message. Don't send `null` anywhere.
5. **CORS is enabled** — `OPTIONS` preflight is handled automatically, no extra config needed on the frontend beyond a standard `fetch`/`axios` POST.
6. **On success**, show a confirmation state (e.g. "Thanks! Check your email.") — the user will also receive an auto-reply email from Nipige, so no need to duplicate that messaging heavily on-screen.
7. **Disable the submit button while the request is in-flight** to avoid duplicate submissions (duplicate submissions currently send duplicate emails — there's no dedupe logic on the backend).

---

## 6. Quick reference — required fields at a glance

**Demo:** `name`, `email`, `company`, `interest` (message optional)
**Agency:** `agencyName`, `name`, `email`, `website`, `clientsPerYear`, `interest` (message optional)
**Contact:** `name`, `email`, `subject`, `message` (all required)
