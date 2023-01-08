// ==UserScript==
// @name         Mastodon Status Icon Color
// @version      2.2
// @description  Customize status visibility icon color and direct messages background color
// @author       Lapineige
// @match        *://mstdn.hw2k.com/*     

// @grant        GM_addStyle
// ==/UserScript==

function addGlobalStyle(css) {
        var head, style;
            head = document.getElementsByTagName('head')[0];
                if (!head) { return; }
                    style = document.createElement('style');
                        style.type = 'text/css';
                            style.innerHTML = css;
                                head.appendChild(style);
}

// default mastodon color : #606984

addGlobalStyle('.fa-at::before {content: "\\f0e0"; color:darkorange}') // revenir à l'icône d'enveloppe au lieu du @ // revert to mail icon instead of @
//addGlobalStyle('.fa-at {color:darkorange}'); // couleur de l'icone enveloppe // envelope icon color // Before Mastodon 4
addGlobalStyle('.status-direct {background:#313543}'); // couleur de fond des messages directs // direct messages color // With Mastodon 4

addGlobalStyle('.fa-lock {color:#406934}'); // couleur de l'icone cadenas // lock icon color
addGlobalStyle('not(.privacy-dropdown__option__icon) > .fa-unlock {color:#606984}'); // couleur de l'icone cadenas ouvert // unlocked lock icon color
addGlobalStyle('not(.privacy-dropdown__option__icon) > .fa-globe {color:#6069B4}'); // couleur de l'icone globe // globe icon color

addGlobalStyle ('abbr[title^="Édité"] {color: gold;     text-decoration: none;}') // mettre en valeur les pouets édités.en colorant l'astérisque (only for French version right now)
