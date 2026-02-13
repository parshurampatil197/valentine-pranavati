# Share Your Valentine Site

## Option 1: GitHub Pages (Recommended)

Run these commands from your terminal:

```bash
cd /Users/pranavatipatil/Desktop/New/valentine-pranavati

git init -b main
git add .
git commit -m "Initial Valentine site"

git remote add origin https://github.com/YOUR_GITHUB_USERNAME/valentine-pranavati.git
git push -u origin main
```

Then in GitHub:

1. Create repo `valentine-pranavati` (Public).
2. Open repo `Settings`.
3. Open `Pages`.
4. Under `Build and deployment`:
   - Source: `Deploy from a branch`
   - Branch: `main` and `/ (root)`
5. Save.

Your link will be:

`https://YOUR_GITHUB_USERNAME.github.io/valentine-pranavati/`

## Important: Update Share Preview Image

In `index.html`, replace `YOUR_GITHUB_USERNAME` in these tags:

- `og:image`
- `twitter:image`

Example:

`https://pranavati123.github.io/valentine-pranavati/photo2.jpg`

## Option 2: Fastest Link (No Git Required)

Use Netlify Drop:

1. Open https://app.netlify.com/drop
2. Drag the full `valentine-pranavati` folder
3. Netlify gives an instant public URL

This is the fastest path if you just want to send a link now.
