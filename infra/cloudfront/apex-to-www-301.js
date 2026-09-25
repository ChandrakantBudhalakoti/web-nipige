// CloudFront Function (viewer-request) — attach to the nipige.com distribution.
// Forces a true 301 (not 302) from the bare domain to https://www.nipige.com,
// preserving path and query string.
//
// Deploy: CloudFront console -> Functions -> Create function -> paste this ->
// Publish -> associate with the nipige.com distribution's default cache
// behavior, event type "Viewer request".
//
// This only handles host canonicalization. HTTP -> HTTPS should be handled by
// the distribution's built-in "Viewer protocol policy: Redirect HTTP to HTTPS"
// setting on each cache behavior (no code needed, and CloudFront's built-in
// redirect is already a 301).

function handler(event) {
  var request = event.request;
  var host = request.headers.host && request.headers.host.value;

  if (host === "nipige.com") {
    var qs = request.querystring;
    var qsKeys = Object.keys(qs);
    var query = qsKeys.length
      ? "?" + qsKeys.map((k) => qs[k].multiValue
          ? qs[k].multiValue.map((v) => k + "=" + v.value).join("&")
          : k + "=" + qs[k].value).join("&")
      : "";

    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: "https://www.nipige.com" + request.uri + query },
      },
    };
  }

  return request;
}
