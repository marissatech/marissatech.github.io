const SITE_DATA = {
  iconPath: "assets/marissa-tech.webp",

  projects: [
    {
      title: "MNotes",
      description: "A sophisticated note-taking web app built to be fast, clean, and pleasant to write in.",
      icon: "assets/proj-mnotes-icon.webp",
      links: [
        { label: "Live", url: "https://marissatech.github.io/mnotes/", primary: true },
        { label: "Code", url: "https://github.com/marissatech/mnotes" }
      ]
    },
    {
      title: "Million Particles",
      description: "A particle gravity toy. Fling particles around and watch them swirl.",
      icon: "assets/proj-particles-icon.webp",
      links: [
        { label: "Live", url: "https://marissatech.github.io/marissatech-particles/", primary: true },
        { label: "Code", url: "https://github.com/marissatech/marissatech-particles" }
      ]
    },
    {
      title: "Personal Homepage",
      description: "This site — a minimalist GitHub Pages page built with plain HTML, CSS, and JS.",
      icon: "assets/marissa-tech.webp",
      links: [
        { label: "Live", url: "https://marissatech.github.io/", primary: true },
        { label: "Code", url: "https://github.com/marissatech" }
      ]
    }
  ],

  organization: [
    {
      title: "m+labs — AI/ML research & technology",
      description: "My research and technology organization, focused mainly on language models.",
      icon: "assets/mpluslabs-icon.webp",
      links: [
        { label: "Website", url: "https://marissatech.github.io/mpluslabs", primary: true },
        { label: "Hugging Face", url: "https://huggingface.co/MPlusLabs" }
      ]
    }
  ],

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "GitHub",
    "AI / ML",
    "Problem Solving",
    "Documentation"
  ]
};

function getPrimaryUrl(item) {
  return item.links.find(link => link.primary)?.url || item.links[0]?.url || "#";
}

function createProjectBar(item) {
  const primaryUrl = getPrimaryUrl(item);

  const bar = document.createElement("article");
  bar.className = "project-bar";
  bar.tabIndex = 0;
  bar.role = "link";
  bar.dataset.href = primaryUrl;
  bar.setAttribute("aria-label", `Open ${item.title}`);

  bar.innerHTML = `
    <img src="${item.icon}" alt="${item.title} icon" class="project-icon">
    <div>
      <div class="project-title">${item.title}</div>
      <p class="project-desc">${item.description}</p>
      <div class="project-links">
        ${item.links.map(link => `<a href="${link.url}">${link.label}</a>`).join("")}
      </div>
    </div>
    <span class="project-open" aria-hidden="true">→</span>
  `;

  return bar;
}

function renderProjectBars(containerId, items) {
  const container = document.getElementById(containerId);
  container.replaceChildren(...items.map(createProjectBar));
}

function renderSkills() {
  const skillList = document.getElementById("skill-list");

  skillList.replaceChildren(
    ...SITE_DATA.skills.map(skill => {
      const span = document.createElement("span");
      span.className = "skill";
      span.textContent = skill;
      return span;
    })
  );
}

function applySiteIcon() {
  document.getElementById("site-logo").src = SITE_DATA.iconPath;

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.href = SITE_DATA.iconPath;
  document.head.appendChild(favicon);

  const appleIcon = document.createElement("link");
  appleIcon.rel = "apple-touch-icon";
  appleIcon.href = SITE_DATA.iconPath;
  document.head.appendChild(appleIcon);
}

function setupClickableBars() {
  document.addEventListener("click", event => {
    const bar = event.target.closest(".project-bar");

    if (!bar || event.target.closest("a")) return;

    window.location.href = bar.dataset.href;
  });

  document.addEventListener("keydown", event => {
    const bar = event.target.closest(".project-bar");

    if (!bar || !["Enter", " "].includes(event.key)) return;

    event.preventDefault();
    window.location.href = bar.dataset.href;
  });
}

applySiteIcon();
renderProjectBars("project-list", SITE_DATA.projects);
renderProjectBars("org-list", SITE_DATA.organization);
renderSkills();
setupClickableBars();