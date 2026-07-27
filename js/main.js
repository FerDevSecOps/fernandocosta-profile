/**
 * main.js — Entry point.
 * Wires together the small pieces of behavior once the DOM is ready.
 */

import { onReady, qs } from "./utils.js";
import { controlAmbientBackground } from "./animations.js";

/** Keep the footer copyright year current without hardcoding it. */
const setCurrentYear = () => {
    const target = qs("[data-year]");
    if (target) target.textContent = String(new Date().getFullYear());
};

// Initialize the page.
onReady(() => {
    setCurrentYear();
    controlAmbientBackground();
});
