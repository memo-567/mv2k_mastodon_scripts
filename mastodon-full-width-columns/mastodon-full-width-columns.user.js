// ==UserScript==
// @name         Mastodon full width columns
// @namespace    http://isobeef.org/
// @version      0.1
// @description  Mastodon full width columns
// @author       rash <rashfael@isobeef.org>
// @updateUrl    https://gist.github.com/rashfael/b0fa9c7ffff1cf44bc7639269440a026/raw/mastodon-full-width-columns.user.js
// @downloadUrl  https://gist.github.com/rashfael/b0fa9c7ffff1cf44bc7639269440a026/raw/mastodon-full-width-columns.user.js
// @match        https://mstdn.hw2k.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle('.column, .drawer { flex: 1 1 auto; max-width: none; }');
})();
