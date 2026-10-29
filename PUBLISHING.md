# Publishing Builder Miami

This checkout is the working copy of `npgeorge/builder-miami`. Edit the website here and publish through GitHub Desktop. A separate upload folder is no longer needed.

## Publish updates

1. Open `builder-miami` in GitHub Desktop and fetch or pull any remote changes before starting new work.
2. Edit and preview the site in this folder.
3. Review the changed files in GitHub Desktop, enter a commit summary, and commit to `main`.
4. Click **Push origin**. GitHub Pages publishes the update after its deployment completes.

GitHub Pages should publish from `main` and `/ (root)`. The repository root is the website root. No build command or dependencies are required.

- `index.html`: the Builder Miami homepage and roundtable index.
- `about/`: the Builder Miami overview and Bitcoin Grove organizer credit.
- `events/`: a permanent dated folder for each roundtable.
- `dist/`: shared artwork and styles, plus a redirect for the original `/dist/` event link.
- `CNAME`: the custom domain, `buildermiami.ai`.
- `.nojekyll`: tells GitHub Pages to serve the static files directly.

## Preview locally

Double-click `Start Roundtable.command` and open http://127.0.0.1:8048/. Keep that terminal window open while previewing. Stop the server with Control-C before starting another server on the same port.

Alternatively, run this from the repository root:

```sh
python3 -m http.server 8048 --bind 127.0.0.1 --directory .
```

Both the homepage and the event pages are served from this checkout. Refresh the browser after saving changes.

## Adding another roundtable

Create a new dated folder under `events/`, with its own `index.html`, questions, and sources. Use a unique browser storage key for each new event so discussion progress and room sentiment stay separate. The October 29 event retains its original key to preserve existing browser state. Add a card above the existing roundtable in the homepage. Give its status badge the correct `data-start` and `data-end` timestamps, including the Miami UTC offset for that date. The badge automatically changes from Upcoming to Happening now to Past roundtable.

Keep earlier event pages and their source collections available at their original URLs. The October 29, 2026 event is at `/events/2026-10-29/`; its complete source list opens at `/events/2026-10-29/#links`.

Discussion progress and room sentiment stay in the current browser. The presentation has no private host panel, timer, or note-capture tools.
