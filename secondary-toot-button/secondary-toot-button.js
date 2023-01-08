// ==UserScript==
// @name         Secondary Toot Button
// @namespace    http://github.com/yuzulabo
// @version      1.3.0
// @description  セカンダリートゥートボタン (inspired by Glitch-soc)
// @author       nzws / ねじわさ
// @match     https://mstdn.hw2k.com/*
// @match     https://mastodon.online/*
// @match     https://masto.ai/*
// @license       MIT License
// ==/UserScript==

(function() {
    const privacy_mode = "private"; // 公開: public, 未収載: unlisted, 非公開: private, ダイレクト: direct

    function generateButton() {
        const form = document.getElementsByClassName("compose-form__publish")[0];
        if (!form) return;

        const privacy_icon =
        privacy_mode === "public" ? "globe" :
        privacy_mode === "unlisted" ? "unlock-alt" :
        privacy_mode === "private" ? "lock" :
        privacy_mode === "direct" ? "envelope" : null;
        if (!privacy_icon) return;

        const div_elem = document.createElement('div');
        div_elem.className = 'compose-form__publish-button-wrapper secondary';
        div_elem.style.marginRight = '10px';
        div_elem.innerHTML = '<button class="button button--block" style="padding: 20 10px"><i class="fa fa-fw fa-'+privacy_icon+'"></i></button>';
        form.insertBefore(div_elem, document.getElementsByClassName("compose-form__publish-button-wrapper")[0]);

        div_elem.addEventListener('click', postSecondary);
    }

    function postSecondary() {
        document.getElementsByClassName('privacy-dropdown__value-icon')[0].click();
        document.querySelector('.privacy-dropdown__option[data-index='+privacy_mode+']').click();
        document.querySelector('.compose-form__publish-button-wrapper:not(.secondary) button').click();
    }

    window.onload = function () {
        generateButton();
    };
})();
