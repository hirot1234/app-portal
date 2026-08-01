const apps = Object.freeze([
  {
    name: "Travel Expense Splitter",
    description: "複数人・複数通貨の旅行経費を記録し、立替額と精算額をまとめて計算します。",
    category: "お金",
    icon: "↗",
    url: "https://travel-expense-splitter-fawn.vercel.app",
    theme: "blue"
  },
  {
    name: "PDF Local Tool",
    description: "PDFの結合・分割をブラウザ内で処理する、ローカル完結型のユーティリティです。",
    category: "ツール",
    icon: "▤",
    url: "https://pdf-local-tools.vercel.app",
    theme: "orange"
  },
  {
    name: "Deposit Split App",
    description: "参加者ごとのデポジット残高を考慮して、複数明細の負担額を整理します。",
    category: "お金",
    icon: "◫",
    url: "https://deposit-split-app.vercel.app",
    theme: "green"
  },
  {
    name: "Weighted Split App",
    description: "人数だけでなく、参加条件や比率を指定して負担額を柔軟に計算します。",
    category: "お金",
    icon: "％",
    url: "https://weighted-split-app.vercel.app",
    theme: "purple"
  },
  {
    name: "WC2026",
    description: "2026年大会の情報を見やすくまとめたサポートページです。",
    category: "情報",
    icon: "◎",
    url: "https://wc2026-orpin-five.vercel.app",
    theme: "yellow"
  }
]);

const elements = {
  grid: document.querySelector("#app-grid"),
  filters: document.querySelector("#filters"),
  search: document.querySelector("#search"),
  count: document.querySelector("#count"),
  empty: document.querySelector("#empty"),
  year: document.querySelector("#year")
};

let activeCategory = "すべて";
const categories = Object.freeze(["すべて", ...new Set(apps.map(app => app.category))]);

function createFilterButton(category) {
  const button = document.createElement("button");
  const isActive = category === activeCategory;

  button.type = "button";
  button.className = `filter${isActive ? " active" : ""}`;
  button.dataset.category = category;
  button.textContent = category;
  button.setAttribute("aria-pressed", String(isActive));

  return button;
}

function renderFilters() {
  const fragment = document.createDocumentFragment();
  categories.forEach(category => fragment.append(createFilterButton(category)));
  elements.filters.replaceChildren(fragment);
}

function createAppCard(app) {
  const card = document.createElement("a");
  card.className = `app-card theme-${app.theme}`;
  card.href = app.url;
  card.setAttribute("aria-label", `${app.name}を開く`);

  const cardTop = document.createElement("div");
  cardTop.className = "card-top";

  const content = document.createElement("div");
  const icon = document.createElement("div");
  icon.className = "icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = app.icon;

  const title = document.createElement("h3");
  title.textContent = app.name;

  const description = document.createElement("p");
  description.textContent = app.description;

  const arrow = document.createElement("span");
  arrow.className = "arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  content.append(icon, title, description);
  cardTop.append(content, arrow);

  const cardBottom = document.createElement("div");
  cardBottom.className = "card-bottom";

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = app.category;

  const status = document.createElement("span");
  status.className = "status";
  status.textContent = "公開中";

  cardBottom.append(tag, status);
  card.append(cardTop, cardBottom);

  return card;
}

function normalizeSearchText(value) {
  return value.trim().toLocaleLowerCase("ja-JP");
}

function renderApps() {
  const query = normalizeSearchText(elements.search.value);
  const visibleApps = apps.filter(app => {
    const categoryMatches = activeCategory === "すべて" || app.category === activeCategory;
    const searchableText = normalizeSearchText(`${app.name} ${app.description} ${app.category}`);
    return categoryMatches && searchableText.includes(query);
  });

  const fragment = document.createDocumentFragment();
  visibleApps.forEach(app => fragment.append(createAppCard(app)));
  elements.grid.replaceChildren(fragment);

  elements.count.textContent = `${visibleApps.length}件`;
  elements.empty.hidden = visibleApps.length !== 0;
}

function selectCategory(category) {
  if (!categories.includes(category)) return;
  activeCategory = category;
  renderFilters();
  renderApps();
}

elements.filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (button) selectCategory(button.dataset.category);
});

elements.search.addEventListener("input", renderApps);
elements.year.textContent = String(new Date().getFullYear());

renderFilters();
renderApps();
