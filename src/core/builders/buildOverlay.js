import { fabric } from "../fabric.js";

/**
 * Build overlay element
 * @param {Function} onClick - optional click handler
 * @returns {HTMLElement}
 */
export function buildOverlay(onClick) {
  const overlay = fabric.createElement("div", {
    classes: ["overlay", "overlay-bg"],
    onClick,
  });

  return overlay;
}
