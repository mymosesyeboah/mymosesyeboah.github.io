const stack = document.querySelector(".access-figure");
const switchButton = stack.querySelector(".folder-switch");
const finance = stack.querySelector(".folder-front");
const entra = stack.querySelector(".folder-back");
const caption = stack.querySelector("figcaption");

switchButton.hidden = false;
switchButton.addEventListener("click", () => {
  const showingEntra = stack.classList.toggle("show-entra");
  finance.setAttribute("aria-hidden", String(showingEntra));
  entra.setAttribute("aria-hidden", String(!showingEntra));
  caption.textContent = showingEntra ? "Microsoft Entra lab" : "Active Directory lab";
  switchButton.textContent = showingEntra ? "Show Finance folder →" : "Show Entra folder →";
});

// Keep the initials visible until a portrait has successfully loaded.
const portrait = new Image();
portrait.alt = "Moses Yeboah";
portrait.onload = () => document.querySelector(".portrait-slot").replaceChildren(portrait);
portrait.src = "images/moses-yeboah.jpg";
