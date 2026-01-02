document.addEventListener("DOMContentLoaded", () => {
  let tooltip = null;
  let hideTimer = null;
  let hovering = false;

  function showTooltip(ref, content) {
    hideTooltip();

    tooltip = document.createElement("div");
    tooltip.className = "footnote-tooltip";
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);

    const rect = ref.getBoundingClientRect();
    tooltip.style.left = (rect.left + window.scrollX) + "px";
    tooltip.style.top =
      (rect.top + window.scrollY - tooltip.offsetHeight - 8) + "px";

    tooltip.addEventListener("mouseenter", () => {
      hovering = true;
      clearTimeout(hideTimer);
    });

    tooltip.addEventListener("mouseleave", scheduleHide);
  }

  function scheduleHide() {
    hovering = false;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!hovering) hideTooltip();
    }, 120);
  }

  function hideTooltip() {
    clearTimeout(hideTimer);
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
  }

  document.querySelectorAll("a.footnote-ref").forEach(ref => {
    const id = ref.getAttribute("href").substring(1);
    const note = document.getElementById(id);
    if (!note) return;

    ref.addEventListener("mouseenter", () => {
      hovering = true;
      showTooltip(ref, note.innerHTML);
    });

    ref.addEventListener("mouseleave", scheduleHide);
  });
});

