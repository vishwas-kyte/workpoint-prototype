# Fincart Workpoint — Prototype

Low/mid-fi wireframe prototype for the Workpoint (B2B CRM) redesign. Static site, no build step, no dependencies.

**Live link:** *(add the GitHub Pages URL here once Settings → Pages is enabled — it should point at the repo root, so it opens `index.html`)*

## Structure

```
index.html          ← version picker (what people land on)
versions/v1.0.html  ← each shipped version, kept forever
shared/site.js      ← the version list + the access gate — the only file that needs editing
shared/site.css      ← styling for the gate + the version-switcher
```

Every prototype snapshot has a small "v1.0 ▾" control in its top bar — click it to jump straight to any other version, or back to this picker page. The picker page (`index.html`) always shows every version with its date, a one-line summary of what changed, an Open button, and a link to that version's comment thread.

## How to ship a new version

1. Copy the current prototype file into `versions/`, named for the new version — e.g. `versions/v1.1.html`.
2. In that new file, find the line near the bottom that reads `siteRenderVersionSwitch('verSwitch', 'v1.0', '../');` and update the version string to match (`'v1.1'`).
3. Open `shared/site.js` and add one new entry to the top of the `VERSIONS` array — version, date, file path, and a one-line summary of what changed. That's the only file you need to touch to make the new version show up everywhere (the picker page and every snapshot's switcher read from it automatically).
4. Commit all three changed/added files together with one commit message describing the change.
5. The live link (root `index.html`) doesn't need touching — it always reflects whatever's in `VERSIONS`.

No installs, no terminal, no branches needed — everything above is drag-and-drop-and-edit through the GitHub web UI.

## Comments on a version

There's no backend here to store freeform comments, so this reuses GitHub itself: turn on **Discussions** in the repo's Settings → Features, create one discussion thread per version, and paste its link into that version's `commentsUrl` in `shared/site.js`. Until that's filled in, the picker page shows "No comments yet" instead of a broken link.

## Access password

The whole site is behind a simple password prompt (default: `Fincart2026`). This is a soft, client-side gate only — anyone who views page source can read the password, so treat it as a casual deterrent, not real security. To change it: run `btoa("newpassword")` in any browser's console, and paste the result into `GATE_PW_B64` in `shared/site.js`. If you ever need this to be genuinely secure, put Cloudflare Access (free) in front of the GitHub Pages site instead — that enforces auth at the network level rather than in the page itself.
