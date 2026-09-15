# FOOR Logistics

A website built with HTML, CSS, and JavaScript, with a Node.js function on Vercel
that sends Request Quote emails through Google Workspace. No frontend build step
is required.

## Run locally with email functionality

### 1. Install dependencies

Use Node.js **24.x**. Open a terminal in the project folder and run:

```bash
npm ci
```

### 2. Configure local email settings

For the first setup, copy the example file:

```bash
cp .env.example .env.local
```

If you already have `.env.local`, edit it instead of copying over it.
Replace the placeholders with your real values:

```dotenv
SMTP_USER=your-actual-mailbox@foorlogistics.com
SMTP_APP_PASSWORD=your-google-app-password
QUOTE_TO=your-actual-receiving-inbox@foorlogistics.com
QUOTE_ORIGIN=http://localhost:3000
```

| Setting | What to enter |
| --- | --- |
| `SMTP_USER` | The existing Google Workspace mailbox used to send notifications |
| `SMTP_APP_PASSWORD` | A Google app password generated for that same mailbox, not its normal login password |
| `QUOTE_TO` | One or more receiving inboxes, separated by commas, e.g. `sam@foorlogistics.com,ash@foorlogistics.com`; can include the sending mailbox |
| `QUOTE_ORIGIN` | The exact address serving the website, with no trailing slash or page path |

To create an app password, sign into the sending mailbox, enable **2-Step
Verification** in [Google Account Security](https://myaccount.google.com/security),
then open [App Passwords](https://myaccount.google.com/apppasswords) and create one
named **FOOR Website Quotes**. If this option is unavailable, contact the Google
Workspace administrator. The current implementation requires app-password access;
OAuth2 would require additional code and configuration.

`.env.local` is excluded from Git. Keep credentials in environment variables,
never in `app.js` or other browser code.

### 3. Start the local server

```bash
npx vercel dev --listen 3000
```

Allow installation of the Vercel CLI if prompted. On the first run, sign into
Vercel and link this folder to the **existing website project**. If asked for the
project directory, use `.`.

Open **http://localhost:3000**. Use this exact address so it matches
`QUOTE_ORIGIN`. Stop the server with **Ctrl+C**. Restart it after changing
`.env.local`.

Submitting the form with valid credentials sends a real email to `QUOTE_TO`.
Without credentials, the website can still be viewed, but quote submission will
show an unavailable message. There is no `npm start` or `npm run dev` command;
use the Vercel command above.

## Preview the layout only

For a quick preview without the email backend, run:

```bash
python3 -m http.server 8080
```

Open **http://localhost:8080**. This serves the static website only; quote emails
require the Vercel development server described above. You can also open
`index.html` directly to preview the page.

## Configure production on Vercel

1. Use the **Other** framework preset, no build command, and the project root
   (`.`) as the static output directory. Vercel installs the npm dependency and
   deploys `api/quote.js` as a Node.js function.
2. Open **Project → Settings → Environment Variables**. Add `SMTP_USER`,
   `SMTP_APP_PASSWORD`, `QUOTE_TO`, and `QUOTE_ORIGIN` for **Production**.
3. Set production `QUOTE_ORIGIN` to the final public website address, such as
   `https://foorlogistics.com`. Include `www` if the website redirects there.
   Do not use `http://localhost:3000` in production.
4. Deploy the updated code. Redeploy whenever production environment variables
   change; editing `.env.local` does not configure the deployed website.
5. Submit a quote on the live site and confirm it arrives in the intended inbox,
   including checking spam. Click Reply and confirm it addresses the customer.

An already working Google Workspace mailbox needs no Squarespace DNS changes
for this feature. If its Google account password changes, generate a new app
password, update Vercel, and redeploy.

## How quote emails work

1. The customer enters their name, optional phone number, email, and freight details.
2. The browser sends the details to `/api/quote` on the same website.
3. The Node.js function validates the submission and uses Nodemailer to connect
   to `smtp.gmail.com` on port `465` with TLS.
4. Google sends the notification from `SMTP_USER` to `QUOTE_TO`. The customer's
   email is set as **Reply-To**, so the team can reply directly to the customer.
5. After Google accepts the message, the website displays confirmation. If sending fails, the form retains the
   details and displays an error.

This sends a notification to the team, not an automatic customer email or a
confirmed freight booking. Google accepting a message does not guarantee inbox
delivery. The app has no database; submitted details are sent through Google to
the receiving mailbox.

The endpoint checks the website origin, validates input, limits message size,
and includes a honeypot. These are basic abuse controls, not a distributed rate
limiter. Configure a Vercel Firewall rate limit for POST `/api/quote` before
public rollout and monitor Workspace sending limits. A lost response followed
by a retry can produce a duplicate email.

## Files

- `index.html` — page content and quote form.
- `styles.css` — website styles.
- `app.js` — navigation, quote submission, and animations.
- `api/quote.js` — server-side Google Workspace SMTP email function.
- `.env.example` — environment-variable template without real credentials.
- `vercel.json` — function configuration.
- `assets/` — images and icons.
- `AGENTS.md` — repository instructions, including the owner's preference not
  to retain QA or automated test files.
