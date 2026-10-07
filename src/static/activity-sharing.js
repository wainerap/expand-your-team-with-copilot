export function createShareControls(name) {
  const activityUrl = new URL(window.location.pathname, window.location.origin);
  activityUrl.searchParams.set("activity", name);
  const text = `Check out ${name} at Mergington High School!`;
  const controls = document.createElement("div");
  controls.className = "activity-sharing";
  controls.setAttribute("role", "group");
  controls.setAttribute("aria-label", `Share ${name}`);

  const label = document.createElement("span");
  label.textContent = "Share:";
  controls.appendChild(label);

  const destinations = [
    ["Facebook", "https://www.facebook.com/sharer/sharer.php", { u: activityUrl.href }],
    ["X", "https://twitter.com/intent/tweet", { text, url: activityUrl.href }],
    ["WhatsApp", "https://wa.me/", { text: `${text} ${activityUrl.href}` }],
  ];

  destinations.forEach(([platform, destination, parameters]) => {
    const link = document.createElement("a");
    const shareUrl = new URL(destination);
    shareUrl.search = new URLSearchParams(parameters).toString();
    link.href = shareUrl.href;
    link.textContent = platform;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Share ${name} on ${platform} (opens in a new tab)`);
    controls.appendChild(link);
  });

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.textContent = "Copy link";
  copyButton.setAttribute("aria-label", `Copy link to ${name}`);
  const status = document.createElement("span");
  status.className = "share-status";
  status.setAttribute("role", "status");

  copyButton.addEventListener("click", async () => {
    status.textContent = "";
    try {
      await navigator.clipboard.writeText(activityUrl.href);
      status.textContent = "Link copied!";
    } catch {
      window.prompt("Copy this activity link:", activityUrl.href);
    }
  });

  controls.append(copyButton, status);
  return controls;
}
