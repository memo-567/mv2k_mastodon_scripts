// ==UserScript==
// @name         Fix Mastodon 4 web UI & Revert to blue theme
// @version      1.1
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

// =================
// Post Mastodon 4.0

// icon color change / new icons
addGlobalStyle('.fa-at::before {content: "\\f0e0"; color:darkorange}') // revenir à l'icône d'enveloppe au lieu du @ // revert to mail icon instead of @
//addGlobalStyle('.fa-at {color:darkorange}'); // couleur de l'icone @

addGlobalStyle ('abbr[title^="Édité"] {color: gold;     text-decoration: none;}') // mettre en valeur les pouets édités.

/////////////////////////////////
////// Repasser le violet en bleu
// #595aff // violet d'origine en 4.0
// #2b90d9 // ancien bleu

addGlobalStyle('.button:not(.confirmation-modal__cancel-button, .block-modal__cancel-button, .confirmation-modal__secondary-button, .button-secondary, .button-tertiary, .mute-modal__cancel-button) {background-color:#2b90d9}'); // couleur du pouton "Pouet !"
addGlobalStyle('.button-tertiary) {color:#2b90d9, border: 1px solid #2b90d9}'); // couleur du pouton "Pouet !"
addGlobalStyle('.notification__message .fa-home {color:#2b90d9}'); // couleur de l'icône maison
addGlobalStyle('.notification__message .fa-user-plus {color:#2b90d9}'); // couleur de l'icône nouvel abonnement
addGlobalStyle('.column-header.active .column-header__icon   {color:#2b90d9}') // couleur de l'icône de notification
addGlobalStyle('.icon-button--with-counter.active.icon-button.reblogPrivate.status__action-bar-button > .icon-button__counter > .animated-number span   {color:#2b90d9}') // couleur compteur partages/fav en plein écran - pouet privé
addGlobalStyle('.media-modal__overlay .picture-in-picture__footer .icon-button.active   {color:#2b90d9}') // couleur compteur partages/fav en plein écran - pouet public

addGlobalStyle('.active.icon-button > .fa-fw.fa-retweet.fa {filter:hue-rotate(-32deg)}') // couleur de l'icône de partage active
addGlobalStyle('.notification__favourite-icon-wrapper > .fa-fw.fa-retweet.fa ,  .notification__favourite-icon-wrapper >  .fa-tasks, .fa-user-times  {color:#2b90d9}')// couleur de l'icône de partage/sondage/suppression abonnement

addGlobalStyle('.a.column-link--transparent.column-link:nth-of-type(3) > .icon-with-badge {background-color:#2b90d9}') // couleur icône de demande d'abonnements (comptes privés)
addGlobalStyle('.a.column-link--transparent.column-link:nth-of-type(3) > .icon-with-badge {visibility:hidden}') // masquer icône de demande d'abonnements (comptes privés)
addGlobalStyle('.icon-with-badge__badge {background-color:#2b90d9}') // couleur icône de demande d'abonnements (comptes privés)
addGlobalStyle('a[title^="Demandes d’abonnement"] > .icon-with-badge > .icon-with-badge__badge {visibility:hidden}') // masquer icône de demande d'abonnements (comptes privés)


addGlobalStyle('.compose-form__sensitive-button .checkbox.active {border-color::#2b90d9 ; background-color:#2b90d9'); // couleur de l'icône média sensible

addGlobalStyle('.status:not(.muted) .status-link.unhandled-link {color:#4ea2df}'); // couleur des liens // attention l'ancien bleu des liens c'est : 4ea2df
addGlobalStyle('.detailed-status > .status__content > .translate.status__content__text--visible.status__content__text .unhandled-link.status-link > .ellipsis {color:#4ea2df}'); // couleur des liens pour un pouet sélectioné // attention l'ancien bleu des liens c'est : 4ea2df


addGlobalStyle('.text-icon-button.active, .icon-button.inverted.active {color:#2b90d9}'); // couleur des icônes activées
addGlobalStyle('.active.icon-button > .fa-bell-o  {color:#2b90d9}'); // couleur clôche activée
addGlobalStyle('.loading-bar {background-color:#2b90d9}'); // couleur barre chargement


addGlobalStyle('.text-icon-button.active {color:#2b90d9}'); // couleur mise en valeur icônes actives
addGlobalStyle('.language-dropdown__dropdown__results__item.active {background:#2b90d9}'); // couleur mise en valeur éléments actif
addGlobalStyle('.privacy-dropdown__option.active {background-color:#2b90d9}'); // couleur mise en valeur éléments : visibilité status
addGlobalStyle('.privacy-dropdown__option.active:hover {background-color:#2b90d9}'); // couleur mise en valeur éléments actif : visibilité status
addGlobalStyle('.privacy-dropdown__option:hover {background-color:#2b90d9}'); // couleur mise en valeur éléments actif : visibilité status
addGlobalStyle('.privacy-dropdown.top.active > .privacy-dropdown__value.active > .inverted.icon-button.privacy-dropdown__value-icon {background-color:#2b90d9}') // couleur mise en valeur icône activée : visibilité status (icônes DM / globe)
addGlobalStyle('.privacy-dropdown.active > .privacy-dropdown__value.active {background-color:#2b90d9}');  // couleur mise en valeur icône activée : visibilité status


addGlobalStyle('.column-header > .column-header__back-button, .column-header__back-button, .column-back-button {color:#2b90d9}'); // couleur bouton retour

addGlobalStyle('.emoji-mart-anchor-selected, .emoji-mart-anchor-bar {color:#2b90d9}'); // couleur icône sélecteur emoji
addGlobalStyle('.emoji-mart-anchor-bar {background-color:#2b90d9}'); // couleur icône sélecteur emoji

addGlobalStyle('.empty-column-indicator a, .follow_requests-unlocked_explanation a {color:#2b90d9}');
addGlobalStyle('.column-header.active , .column-header__icon {color:#ffffff}');

// notifications
addGlobalStyle('.react-toggle--checked .react-toggle-track {background-color:#2b90d9}'); // toggle option des notifications
addGlobalStyle('.react-toggle--checked:is(:hover, :focus-within):not(.react-toggle--disabled) .react-toggle-track {background-color:#2b90d9}'); // toggle option des notifications - focus
addGlobalStyle('.unread::before {border-left-color:#2b90d9}');
addGlobalStyle('.notification.unread::before, .status__wrapper.unread::before {border-left-color:#2b90d9}');
addGlobalStyle('.column-header__wrapper.active::before  {background-image:radial-gradient(ellipse,rgba(43,144,217,.23) 0,rgba(43,144,217,0) 60%)}') // gradient en haut des colonnes en cas de nouveau contenu // halo

addGlobalStyle('.column-header__wrapper.active {box-shadow: 0 1px 0 rgba(43,144,217,.3);}') // gradient en haut des colonnes en cas de nouveau contenu // barre du haut

addGlobalStyle('.poll__chart.leading {background-color:#2b90d9}'); // résultats sondages
addGlobalStyle('.muted .poll__chart.leading {background-color:rgba(43,144,217,.2)}'); // résultats sondages (notification)
addGlobalStyle('.notification__message .fa-pencil {color:#2b90d9}') // icône contenu édité

// Préférences
addGlobalStyle('.admin-wrapper .sidebar ul .simple-navigation-active-leaf a  {background-color:#2b90d9}');
addGlobalStyle('.fa-arrow-right,.accounts-table .fa.active {color:#2b90d9}');

addGlobalStyle('.filters .filter-subset a.selected {color:#2b90d9; border-bottom-color:#2b90d9}');
addGlobalStyle('.simple_form .block-button, .simple_form .button, .simple_form button {background-color:#2b90d9}');

addGlobalStyle('.admin-wrapper .content .muted-hint a, body .muted-hint a {color:#2b90d9}');

   
////// 
/////////////////////////////

// ======================
// Fenêtre de composition // Writing window
addGlobalStyle('.compose-form {padding:0px}') // Marge entre la fenêtre de composition du pouet et les bords de la colonne // ancienne valeur par défaut 10px, nouvelle valeur 15px

// si on supprime la marge, il faut corriger la position du bouton de publication (et des icônes au dessus pour conserver l'alignement ?)
// addGlobalStyle('.compose-form__publish-button-wrapper button {padding-right:10px}') // si on supprime la marge, il faut corriger la position du bouton
addGlobalStyle('.compose-form__publish {padding-right:10px}')

// Changer le texte du bouton de publication en "Pouet !"
// addGlobalStyle('.compose-form__publish-button-wrapper button {position: relative;  color: rgba(0,0,0,0);}'); 

addGlobalStyle('.compose-form__publish-button-wrapper.span button::after {  content: "Pouet !";  position: absolute;  color: #fff;  left: 0;  right: 0;}')



// ======================
// Vue mobile / mobile view

addGlobalStyle('.columns-area__panels__main {order: 2}'); // barre latérale à gauche // lateral bar on the left side
