// ==UserScript==
// @name         Mastodon - Publish-button
// @namespace    https://github.com/phpmacher/mastodon-publish-button/
// @downloadURL  https://github.com/phpmacher/mastodon-publish-button/mastodon-publish-button.user.js
// @updateURL    https://github.com/phpmacher/mastodon-publish-button/mastodon-publish-button.user.js
// @version      0.2
// @description  rename publish button back to trööt (or toot or to whatever)
// @author       @phpmacher@sueden.social
// @license      MIT
// @match        https://mstdn.hw2k.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    function setButton(container) {
        // Edit this variable to change the text of the publish-button
        var buttonText = 'Tröt!';

        if (container.innerHTML != buttonText) {
            container.innerHTML = buttonText;
        }
    }

    window.addEventListener('load', function() {

        var container = document.querySelector(".compose-form__publish-button-wrapper .button.button--block");

        // initial renaming
        setButton(container);

        // monitor the button
        var dom_observer = new MutationObserver(function(mutation) {
            // if change is detected, set button-name again
            setButton(container);
        });

        // config observer and start it
        var config = { attributes: false, childList: false, characterData: true, subtree: true};
        dom_observer.observe(container, config);

    }, false);

})();
