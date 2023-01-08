// ==UserScript==
// @name         Mastodon Monotext
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  add limited markdown-like formatting capabilities to mastodon using unicode
// @author       MightyPork, using original code by cpsdqs
// @match        https://mstdn.hw2k.com/*
// ==/UserScript==

(function() {
    'use strict';

    let monotext = (function() {
        /**
         * (c) cpsdqs 2016
         * MIT License
         *
         * A small utility for converting text to unicode variants
         */

        // offsets to apply counting up from 0-26 for A-Z, 27-52 for a-z, and 0-9 for 0-9
        /*
         * letters sorted alphabetically
         * m: monospace
         * b: bold
         * i: italic
         * c: script
         * f: fraktur
         * d: double-struck
         * s: sans-serif
         * g: greek
         */
        let offsets = {
            m:   [0x1d670, 0x1d7f6],
            b:   [0x1d400, 0x1d7ce],
            i:   [0x1d434, 0x00030],
            bi:  [0x1d468, 0x00030],
            c:   [0x1d49c, 0x00030],
            bc:  [0x1d4d0, 0x00030],
            f:   [0x1d504, 0x00030],
            d:   [0x1d538, 0x1d7d8],
            bf:  [0x1d56c, 0x00030],
            s:   [0x1d5a0, 0x1d7e2],
            bs:  [0x1d5d4, 0x1d7ec],
            is:  [0x1d608, 0x00030],
            bis: [0x1d63c, 0x00030],
            bg:  [0x1d6a8, 0x00030],
            gi:  [0x1d6e2, 0x00030],
            bgi: [0x1d71c, 0x00030]
        };

        // special characters (absolute values)
        // applied *before* any offsets
        let special = {
            m: {
                ' ': 0x2000,
                '-': 0x2013
            },
            i: {
                'h': 0x210e
            },
            f: {
                'C': 0x212d,
                'H': 0x210c,
                'I': 0x2111,
                'R': 0x211c,
                'Z': 0x2128
            }
        };

        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let numbers = '0123456789';

        let convert = function(t, type) {
            if(!type) return t;
            let result = '';
            for (let k of t) {
                let index;
                let c = k;
                if (type == 'u') {
                    result += c + '\u0332';
                } else
                if (type == 't') {
                    result += c + '\u0336';
                } else {
                    if (special[type] && special[type][c]) c = String.fromCodePoint(special[type][c]);
                    if ((index = chars.indexOf(c)) > -1)
                        result += String.fromCodePoint(index + offsets[type][0]);
                    else if ((index = numbers.indexOf(c)) > -1)
                        result += String.fromCodePoint(index + offsets[type][1]);
                    else
                        result += c;
                }
            }

            return result;
        };

        return convert;
    })();

    let processToot = function(str) {
        const regex = /([\W]|^)([%`_*~=\\-])(.*?)\2(?![a-z0-9])/gi;
        let m;

        return str.replace(regex, function (match, prev, format, text) {
            let type = '';
            if (format == '_') type = 'i';
            if (format == '*') type = 'b';
            if (format == '%') type = 'f';
            if (format == '`') type = 'm';
            if (format == '~') type = 'bc';
            if (format == '=') type = 'd';
            if (format == '\\') type = 'u';
            if (format == '-') type = 't';
            return prev+monotext(text, type);
        });
    };

    setTimeout(() => {
        document.querySelector('.compose-form__publish-button-wrapper > button').addEventListener('click', (e) => {
            let ta = document.querySelector('.autosuggest-textarea__textarea');
            ta.value = processToot(ta.value);
        });
    }, 1000);
})();
