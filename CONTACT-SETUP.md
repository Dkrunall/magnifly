# Contact delivery

Copy `.env.example` to `.env.local` and fill the SMTP host, port, username,
password, verified sender (`CONTACT_FROM`), and receiving inbox (`CONTACT_TO`).
Keep credentials out of source control. For port 465 the transport uses TLS;
port 587 uses STARTTLS when offered by the provider.

Run `npm run build`, then `npm start -- --port 3100`. Restart the Node process
after changing environment settings. The static files and `/api/contact` are
served from the same origin. A static-only deployment cannot run Nodemailer:
production needs this Node server or an equivalent backend for `/api/contact`.
Set `CONTACT_ORIGIN` to the exact HTTPS site origin behind a reverse proxy.

Run `node --test scripts/contact.test.mjs` for local transport-mock checks.
These tests do not send email. After configuration, submit a deliberate test
inquiry and verify receipt in the destination inbox before public launch.
SMTP acceptance does not guarantee inbox delivery. The request limiter is
in-memory and per server process; production proxy/rate-limit configuration
must be chosen for the eventual hosting environment.
