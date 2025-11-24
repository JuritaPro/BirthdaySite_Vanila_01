# Deployment Guide

This guide explains easy ways to publish `BirthdaySite_Vanila_01` so guests can access it.

1) GitHub Pages (recommended for static sites)
- Ensure the repository is pushed to GitHub (`origin/main`).
- In your repository on GitHub: go to **Settings → Pages** (or **Pages** in the left menu).
- Under **Source**, choose branch `main` and folder `/ (root)`.
- Click **Save**. Wait a few minutes — the site will be live at `https://<your-username>.github.io/<repo-name>/`.

Notes
- Use HTTPS URLs for images or relative paths so GitHub Pages serves them correctly.
- If using a custom domain, configure DNS and add the `CNAME` file in the repo.

2) Netlify (drag & drop or continuous deploy)
- Quick: Drag-and-drop the project folder into Netlify's dashboard to deploy a preview site.
- CI: Connect your GitHub repo to Netlify and set the build command (for static sites usually none) and publish directory `/`.

3) Vercel (easy for static or frameworks)
- Connect the GitHub repo via Vercel. Vercel auto-detects static projects.

4) Local preview (development)
- Use Python simple server (works on Windows):
  ```powershell
  cd "C:\Users\jurit\.vscode\Jurim90\BirthdaySite_Vanila_01"
  python -m http.server 8000
  ```

5) Tips for production
- Ensure images are compressed and sized (see `image-optimization.md`).
- Use relative paths for all assets to avoid CORS issues.
- Test the site on mobile and TV before the event.

Troubleshooting
- 404s for images: check file names (case matters on GitHub Pages) and relative paths.
- Site not updating: ensure the correct branch is selected in Pages and that the commit was pushed.
