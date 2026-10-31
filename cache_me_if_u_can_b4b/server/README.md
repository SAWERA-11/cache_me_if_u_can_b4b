# Mashq video server

1. Set `YOUTUBE_API_KEY` in the host's environment settings; optionally set `PORT` (default `8787`). `.env.example` documents these variables; Node does not load `.env` automatically.
2. Run `npm ci` inside `server/`.
3. Run `npm start`. For local PowerShell, set `$env:YOUTUBE_API_KEY` before starting.

The app only calls this optional service for video searches. Deploy the `server/`
folder with Node 18 or newer, using `npm start` as the start command.

Run `node server/index.test.js` from the app root for offline HTTP tests covering secret rejection, cache, quota, malformed responses, timeout and rate limiting. Tests use a temporary cache and fake YouTube responses.

The server allows 30 searches per IP per hour and aborts upstream searches after five seconds. The cache contains search queries and video metadata; never enter personal details into video search. A cache write failure does not interrupt a successful search. Deploy one instance for this in-memory rate limiter; configure trusted proxies for the specific host before relying on forwarded client IPs.
