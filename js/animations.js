/**
 * animations.js — Ambient background animation control.
 * The entrance reveal itself is CSS-driven (see css/animations.css); this module
 * only manages the drifting background so it doesn't run needlessly.
 */

import { qs, prefersReducedMotion } from "./utils.js";

/**
 * Pause the background drift while the tab is hidden to save resources.
 * Skipped entirely when the user prefers reduced motion.
 */
export const controlAmbientBackground = () => {
    const background = qs(".background");
    if (!background || prefersReducedMotion()) return;

    const syncPlayState = () => {
        background.classList.toggle("is-paused", document.hidden);
    };

    document.addEventListener("visibilitychange", syncPlayState);
    syncPlayState();
};
