# Mikre Hailemariam — Portfolio

A fast static site (plain HTML, CSS and JavaScript). There are NO folders: every file sits at the top level, so you can select all files and upload them in one go.

| File | What it is |
|---|---|
| index.html | page content |
| styles.css | all styling (colors are variables at the top) |
| main.js | behaviour (typing effect, filters, terminal, background) |
| projects-data.js | YOUR PROJECTS: the file you will edit most |
| mikre-portrait.png / .webp | your photo |
| og-image.png | picture shown when the link is shared |
| favicon.svg | browser-tab icon |

## Add your CVs
Upload two PDFs next to index.html with exactly these names:
- Mikre_Hailemariam_Resume.pdf (employers)
- Mikre_Hailemariam_Academic_CV.pdf (PhD)

Until they exist the two buttons show "soon".

## Update projects
Open projects-data.js, change a project to `status: "completed"`, add the links, save.

## Before sharing
In index.html replace `https://YOUR-SITE-URL` in the og:image line with your real address (for example https://mikre12.github.io).

## Publish
GitHub Pages: new public repository named mikre12.github.io, upload every file, then Settings > Pages > Deploy from a branch > main > / (root).
Vercel: import the same repository, Framework Preset "Other", Deploy.
