## Res.header and redirect in express:

When you respond with a header and a redirect, it can get confusing. The browser wants to redirect to the new url, but you also want to do something with the header in the response. The header is only getting returned in the redirect response. When the client loads the new page, which it does right away, it won't have access to the Auth header.

I would recommend doing things one at a time. It might be best to send the header back and let the client worry about the redirect. The client can do something with the Auth header, then it can redirect to the appropriate URL.

would recommend a token based form of authentication over session based. You can store the token in localStorage in the web browser and send it as a header with your API requests. Passport has a library for tokens too: passport-jwt


Or you can save token in cookie and restore it later
