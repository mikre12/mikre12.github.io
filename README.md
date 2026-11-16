# Mikre Hailemariam — Portfolio

A fast, dependency-free static site: plain HTML, CSS and JavaScript. No build step, so it deploys as-is to GitHub Pages and Vercel.

```
index.html              page content
css/styles.css          all styling (colors are variables at the top)
js/main.js              behaviour (typing effect, filters, terminal, background)
js/projects-data.js     YOUR PROJECTS: the file you will edit most
assets/                 photo, favicon, social image
assets/cv/              put your two CV PDFs here (see below)
```

## 1. Preview locally

Open `index.html` in your browser. For the most accurate preview run a tiny server:

```
python -m http.server 8000      # then open http://localhost:8000
```

## 2. Add your CVs

Export two PDFs and save them with exactly these names:

- `assets/cv/Mikre_Hailemariam_Resume.pdf` (1 page, for employers)
- `assets/cv/Mikre_Hailemariam_Academic_CV.pdf` (longer, for PhD applications)

Until the files exist, the two buttons in the hero show "soon" and are disabled. They switch on by themselves once the PDFs are uploaded.

## 3. Update your projects (every time you finish one)

Open `js/projects-data.js`, find the project and change:

```js
status: "completed",
links: { repo: "https://github.com/mikre12/your-repo", demo: "https://…", writeup: "https://…" },
result: "One real, measurable outcome (optional)"
```

Add a new object to the list to add a project. The roadmap strip and filters update automatically.

## 4. Before you publish

1. In `index.html`, replace `https://YOUR-SITE-URL` in the `og:image` line with your real address (for example `https://mikre12.github.io`). This controls the picture shown when you share the link on LinkedIn or WhatsApp.
2. Check that the email, GitHub and LinkedIn links are the ones you want public.

## 5. Deploy to GitHub Pages

1. On GitHub create a new **public** repository. Naming it `mikre12.github.io` gives you the address `https://mikre12.github.io`; any other name gives `https://mikre12.github.io/<repo-name>/`.
2. Upload all files from this folder (keep the folder structure), or from a terminal:
   ```
   git init
   git add .
   git commit -m "Add portfolio site"
   git branch -M main
   git remote add origin https://github.com/mikre12/<repo-name>.git
   git push -u origin main
   ```
3. In the repository go to **Settings → Pages**, set **Source** to "Deploy from a branch", choose branch `main` and folder `/ (root)`, then Save. The site is live in about a minute.

## 6. Deploy to Vercel

1. Sign in at vercel.com with your GitHub account and choose **Add New → Project**.
2. Import the same repository.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty, Root Directory `./`. Click **Deploy**.
4. Every `git push` to `main` redeploys both GitHub Pages and Vercel automatically.

## 7. Custom domain (optional)

Buy a domain, then add it in Vercel (**Project → Settings → Domains**) or in GitHub (**Settings → Pages → Custom domain**) and follow the DNS instructions shown there.

## Tips

- Press the backtick key (`` ` ``) on the site to open the hidden terminal.
- Colors live at the top of `css/styles.css` (`--gold`, `--violet`, `--silver`, `--bg`).
- Keep exploit details and any confidential client work out of the public repositories.
