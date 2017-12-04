"use strict";

/*
 * 2017 Matthias Pronk
 *
 * Code to dynamically switch language. 
 */

(function() {
    var languages = ['nl', 'en', 'fr'];
    var selLang = document.querySelector('select#lang');
    var curLang;
    var userLangs = navigator.languages;

    var changeLanguage = function(newLang) {
        var sel, lang, disp;

        // Remove leading hash signs
        newLang = newLang.replace(/^#/, '');
        
        // No language selected, or language is unknown, try to guess from the browser context.
        if (languages.indexOf(newLang) === -1) {
            newLang = null;
            for (var i = 0; i < userLangs.length; i++) {
                lang = userLangs[i].replace(/-.*$/, '').toLowerCase();
                if (languages.indexOf(lang) > -1) {
                    newLang = lang;
                    break;
                }
            }
            if (newLang === null) {
                // Fall back to first language in array.
                newLang = languages[0];
            }
        }

        // Language is already selected, nothing to do.
        if (curLang === newLang) {
            return;
        }
        curLang = newLang;
        
        // Update language select input
        if (selLang.value != newLang) {
            selLang.value = newLang;
        }

        // Update window hash
        if (window.location.hash != newLang) {
            window.location.hash = '#' + newLang;
        }

        // Hide or show language elements
        for (var i = 0; i < languages.length; i++) {
            lang = languages[i];
            disp = lang === newLang ? '' : 'none';
            sel = document.querySelectorAll(':lang(' + lang + ')');
            for (var item of sel) {
                item.style.display = disp;
            }
        }
    };

    selLang.addEventListener('change', function() {
        changeLanguage(selLang.value);
    });

    window.addEventListener('hashchange', function(event) {
        changeLanguage(window.location.hash);
    });

    document.addEventListener("DOMContentLoaded", function() { 
        changeLanguage(window.location.hash);
    });
})();
