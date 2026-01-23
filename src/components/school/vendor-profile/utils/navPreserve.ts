export function saveVendorProfileScrollAndFocus(focusKey: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem("vp_scrollY", String(window.scrollY || 0));
    window.sessionStorage.setItem("vp_focus", focusKey);
  } catch {
    // ignore
  }
}

function escapeAttrValue(value: string) {
  // Minimal escaping for attribute selector usage
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function restoreVendorProfileScrollAndFocus() {
  if (typeof window === "undefined") return;
  try {
    const yRaw = window.sessionStorage.getItem("vp_scrollY");
    const focusKey = window.sessionStorage.getItem("vp_focus");

    if (yRaw != null) {
      const y = Number(yRaw);
      if (!Number.isNaN(y)) {
        window.scrollTo({ top: y, left: 0, behavior: "instant" as ScrollBehavior });
      }
    }

    if (focusKey) {
      const selector = `[data-vp-focus="${escapeAttrValue(focusKey)}"]`;
      const el = document.querySelector<HTMLElement>(selector);
      if (el) {
        el.focus({ preventScroll: true });
      }
    }

    window.sessionStorage.removeItem("vp_scrollY");
    window.sessionStorage.removeItem("vp_focus");
  } catch {
    // ignore
  }
}


