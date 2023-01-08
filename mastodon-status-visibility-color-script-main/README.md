[EN] A few CSS scripts to tweak Mastodon Web UI

[FR] Quelques modifications CSS pour modifier l'interface de Mastodon



# Mastodon status visibility color script


A [GreaseMonkey](https://addons.mozilla.org/fr/firefox/addon/greasemonkey/)¹ script that allows you to adjust your Mastodon status visibility icon color (or background color).
For instance the Direct Messages icon color and background color (by default restored to the different look that was used before Mastodon 3.3.3).



¹ should easily be adapted to Stylus, just copy the last lines parenthesis content

# Fix Mastodon4 UI and bring back blue theme

A script to fix new Mastodon UI issues (mobile lateral bar, writing frame marging…) and/or switch back to the previous blue theme (or any color you like)

Feel free to comment (add `//` at the beggining of the line) the parts that you don't need.

Regarding the violet/blue theme: I choosed to set it to the last blue theme by default, but you can change that color as it pleases you :) . You will need to change its hexadecimal code (which is : #2b90d9) to the one you like. *Note: some links don't use the exact same color*.

# How to use these scripts

## GreaseMonkey
Simply import that script into you GraseMonkey, or open a new script and copy-paste it.
You will need to change the domain name in the `@match` line, as since Mastodon 4.0 there is no longer a generic pattern that I could configure for you.
So if your instance is located on `somefunnydomain.name` then put `*://somefunnydomain.name/*`. 
You can add several instances, just add several @match lines.

## With Stylus
I'm not using Stylus so I can't explain the whole procedure… but in theory you could just copy the CSS code that you can find in each `addGlobalStyle('some CSS')` line, without quotes.
