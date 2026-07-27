/**
 * utils.js — Small dependency-free helpers.
 */

/** Query the first matching element. */
export const qs = (selector, scope = document) => scope.querySelector(selector);

/** Query all matching elements as an array. */
export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/** Run a callback as soon as the DOM is ready. */
export const onReady = (callback) => {
    if (document.readyState !== "loading") {
        callback();
    } else {
        document.addEventListener("DOMContentLoaded", callback, { once: true });
    }
};

/** Whether the user has requested reduced motion. */
export const prefersReducedMotion = () =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
