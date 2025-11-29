"use strict";
// Simple Website Darkmode
// Author: Issa Rice
// License: CC0 https://creativecommons.org/publicdomain/zero/1.0/
var darkmode;
(function (darkmode) {
    // local storage: blank (meaning auto), "auto", "light", or "dark"
    // color argument for the functions below: "auto", "light", or "dark"
    function set_root_color_scheme(color) {
        if (color === "dark") {
            // If the user has specifically chosen this particular website to
            // be in dark mode, then honor that over the OS/browser-level
            // preference.
            document.documentElement.style.setProperty("color-scheme", "dark");
        }
        else if (color === "light") {
            document.documentElement.style.setProperty("color-scheme", "light");
        }
        else {
            document.documentElement.style.setProperty("color-scheme", "light dark");
        }
    }
    function set_visual_feedback_color(color) {
        var options_list = ["auto", "light", "dark"];
        var el = document.getElementById(color + "-menu-option");
        if (el) {
            el.style.textDecoration = "underline";
            options_list
                .filter(x => x !== color)
                .forEach((c) => {
                const option_el = document.getElementById(c + "-menu-option");
                if (option_el) {
                    option_el.style.textDecoration = "none";
                }
                else {
                    console.log(`Could not find ${c}-menu-option`);
                }
            });
        }
        else {
            console.log(`Could not find ${color}-menu-option`);
        }
    }
    function add_darkmode_menu() {
        var el = document.getElementById('darkmode-menu');
        if (el) {
            el.innerHTML = `Set color scheme to:
                <span id="auto-menu-option" style="cursor: pointer;" class="unselectable" onclick="darkmode.set_color('auto')">auto</span>,
                <span id="light-menu-option" style="cursor: pointer;" class="unselectable" onclick="darkmode.set_color('light')">light</span>,
                <span id="dark-menu-option" style="cursor: pointer;" class="unselectable" onclick="darkmode.set_color('dark')">dark</span>
            `;
        }
        else {
            console.log("Could not find darkmode-menu.");
        }
    }
    function set_theme_from_local_storage() {
        add_darkmode_menu();
        const site_specific_preferred_color = localStorage.getItem("color") || "auto";
        set_root_color_scheme(site_specific_preferred_color);
        set_visual_feedback_color(site_specific_preferred_color);
    }
    function set_body_class(color) {
        if (color === "dark") {
            if (!document.body.classList.contains("dark")) {
                document.body.classList.add("dark");
            }
        }
        else {
            if (document.body.classList.contains("dark")) {
                document.body.classList.remove("dark");
            }
        }
    }
    function recompute_body_class() {
        const site_color_scheme = getComputedStyle(document.documentElement).getPropertyValue('color-scheme').trim();
        if (site_color_scheme === "dark" || site_color_scheme === "light") {
            set_body_class(site_color_scheme);
        }
        else {
            // site_color_scheme is auto, so fall back to the OS preference
            const os_prefers_dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            set_body_class(os_prefers_dark ? "dark" : "light");
        }
    }
    const darkmode_preference = window.matchMedia("(prefers-color-scheme: dark)");
    // This fires whenever the OS/browser preference changes. This might happen
    // for example when someone has their OS color scheme set to the movement
    // of the sun, so that e.g. at sunset the OS theme gets changed to dark
    // mode.
    darkmode_preference.addEventListener("change", _ => recompute_body_class());
    // This function runs every time the menu buttons (auto/light/dark) are
    // clicked.
    function set_color(color) {
        set_root_color_scheme(color);
        localStorage.setItem("color", color);
        set_visual_feedback_color(color);
        recompute_body_class();
    }
    darkmode.set_color = set_color;
    // This function runs once on each page load.
    function initialize() {
        add_darkmode_menu();
        set_theme_from_local_storage();
        recompute_body_class();
    }
    darkmode.initialize = initialize;
})(darkmode || (darkmode = {}));
