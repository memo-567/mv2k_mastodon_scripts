// ==UserScript==
// @name         MastodonHelper
// @namespace    http://tampermonkey.net/
// @version      0.4.6
// @description  Make Mastodon look nicer.
// @author       You
// @match        https://literatur.social/*
// @license      BSD-3-Clause; https://opensource.org/licenses/BSD-3-Clause
// @updateURL    https://openuserjs.org/meta/khzimmer/MastodonHelper.meta.js
// @grant        none
// ==/UserScript==

(function() {
  var MastodonHelperVERSION = '0.4.6';





  // Color of the normal links:

   var linkColorDark = '#74AFDA';
  var linkColorLight = '#0040A0';



  // Color of the little "NOTES" text area below the account name in the right-most column:

   var noteColorDark = '#FED579';
  var noteColorLight = '#800000';


  // Background color of private messages:

   var privColorDark = '#333846';
  var privColorLight = '#DDEEFF';


  // Color for the Publish button:

  var buttonBackgroundColor = '#000060';


  // Color for non-highlighted list rows:
   var textColorDark = '#CCCCCC';
  var textColorLight = '#000000';









  var cssForLight = 'packs/css/mastodon-light';
  // as of yet unused: var cssForContrast = 'packs/css/contrast';

  var linkColor = linkColorDark;
  var noteColor = noteColorDark;
  var privColor = privColorDark;
  var textColor = textColorDark;

  var globalColorsUnknown = true;
  function setGlobalColors ()
  {
    if (globalColorsUnknown)
    {
      var links = document.getElementsByTagName ("link");
      for (var i=0; i<links.length; i++)
      {
        if (links [i].href && links [i].rel && links [i].rel == 'stylesheet')
        {
          if (links [i].href.indexOf (cssForLight) > -1)
          {
            // console.log('(light theme found)');

            linkColor = linkColorLight;
            noteColor = noteColorLight;
            privColor = privColorLight;
            textColor = textColorLight;
          }

          globalColorsUnknown = false;
        }
      }
    }
  }

  function getLinkColor ()
  {
    setGlobalColors ();
    return linkColor;
  }

  function getNoteColor ()
  {
    setGlobalColors ();
    return noteColor;
  }

  function getPrivateMessageColor ()
  {
    setGlobalColors ();
    return privColor;
  }

  function getTextColor ()
  {
    setGlobalColors ();
    return textColor;
  }


  function getFirstChildWithClassName (container, className)
  {
    var element = null;
    var elements = container.getElementsByClassName (className);
    if (elements.length > 0)
    {
      element = elements [0];
    }
    return element;
  }


  function getFirstChildWithTagName (container, tagName)
  {
    var element = null;
    var elements = container.getElementsByTagName (tagName);
    if (elements.length > 0)
    {
      element = elements [0];
    }
    return element;
  }


  var observerActionsAllowed = true;
  var myQuickAccessButton = null;


  function highlightPrivateMessages (rightMostColumn, className)
  {
    var boostButtons = document.getElementsByClassName (className);
    for (var i=0; i<boostButtons.length; i++)
    {
      var button = boostButtons [i];
      if (getFirstChildWithClassName (button, 'fa fa-retweet fa-fw'))
      {
        var parent = rightMostColumn
                   ? button.parentNode.parentNode.parentNode
                   : button.parentNode.parentNode;
        parent.style.backgroundColor = getPrivateMessageColor ();

        var paras = parent.getElementsByTagName ('p');
        for (var j=0; j<paras.length; j++)
        {
          paras [j].style.color = getNoteColor ();
        }
      }
    }
  }


  function colorizeTheLinks ()
  {
    if (! observerActionsAllowed)
    {
      return;
    }
    observerActionsAllowed = false;

    var linkColor = getLinkColor ();
    var links = document.getElementsByTagName ("a");

    for (var i=0; i<links.length; i++)
    {
      if (links [i].href && links [i].style && (links [i].style.color !== linkColor))
      {
        var link = links [i];

        var className = link.className;
        if (className && (className.indexOf ('display-name') < 0) && (className.indexOf ('status__relative-time') < 0) && (link.innerHTML.indexOf ('display-name') < 0))
        {
          link.style.color = linkColor;
        }
      }
    }

    var button = getFirstChildWithClassName (document, 'button logo-button button--destructive button--with-bell');
    if (button)
    {
      if (button.style && (button.style.backgroundColor !== buttonBackgroundColor))
      {
        button.style.backgroundColor = buttonBackgroundColor;
      }
    }
    else
    {
      button = getFirstChildWithClassName (document, 'button logo-button');
      if (button)
      {
        if (button.style && (button.style.backgroundColor !== buttonBackgroundColor))
        {
          button.style.backgroundColor = buttonBackgroundColor;
        }
      }
    }

    var backLink = getFirstChildWithClassName (document, 'column-header__back-button');
    if (! backLink)
    {
      backLink = getFirstChildWithClassName (document, 'column-back-button');
    }
    if (backLink)
    {
      var span = getFirstChildWithTagName (backLink, 'span');
      if (span && span.style && (span.style.color !== linkColor))
      {
        span.style.color = linkColor;
      }
    }

    highlightPrivateMessages (false, 'status__action-bar__button icon-button disabled');
    highlightPrivateMessages (true, 'icon-button disabled');

    setTimeout(function ()
    {
      observerActionsAllowed = true;
    },
    100);
  }


  var renameThePublishButtonWasDone = false;

  function renameThePublishButton ()
  {
    if (renameThePublishButtonWasDone)
    {
      return;
    }

    var buttonContainer = getFirstChildWithClassName (document, 'compose-form__publish-button-wrapper');

    if (renameThePublishButtonWasDone)
    {
      return;
    }

    if (buttonContainer)
    {
      renameThePublishButtonWasDone = true;

      var oldLabelText = 'Veröffentlichen!';

      if (buttonContainer.innerHTML.indexOf (oldLabelText) > -1)
      {
        buttonContainer.innerHTML = '<button class="button button--block" title="Bei evtl. enthaltenen Bildern trage bitte vor dem Tröten eine Bildbeschreibung ein.\n\nDu ermöglichst ScreenReader Nutzenden so eine schönere und bessere Teilhabe. :)" type="submit">Trööt! &nbsp; 🐘</button>';
        var button = getFirstChildWithTagName (buttonContainer, 'button');
        if (button)
        {
          button.style.backgroundColor = buttonBackgroundColor;
        }
        console.log ('Publish button renamed successfully. :)');
      }
      else
      {
        console.log ('No button with label "Veröffentlichen!" was found. Nothing was changed.');
      }
    }
  }


  function getIconButtonContainer ()
  {
    var buttonContainers = document.getElementsByClassName ('account__header__tabs__buttons');

    if (buttonContainers.length > 0)
    {
      return buttonContainers [0];
    }
    return null;
  }

  function getIconButtons ()
  {
    var iconButtons = {};
    var buttonContainer = getIconButtonContainer ();
    if (buttonContainer)
    {
      return buttonContainer.getElementsByClassName ('icon-button');
    }
    return iconButtons;
  }

  function getLinkForLists ()
  {
    var link = null;
    var menu = getFirstChildWithClassName (document, 'dropdown-menu bottom');
    if (menu)
    {
      var items = menu.getElementsByClassName ('dropdown-menu__item');
      for (var i = 0; i < items.length; i++)
      {
        var item = items [i];
        var links = item.getElementsByTagName ('a');
        if (links.length > 0)
        {
          var thisLink = links [0];
          if (thisLink.innerHTML == 'Hinzufügen oder Entfernen von Listen' ||
              thisLink.innerHTML == 'Add or Remove from lists' ||
              thisLink.innerHTML == 'Ajouter ou retirer des listes' ||
              thisLink.innerHTML == 'Aggiungi o togli dalle liste' ||
              thisLink.innerHTML == 'Додати або видалити зі списків' ||
              thisLink.innerHTML == 'Dodaj lub usuń z list')
          {
            link = thisLink;
          }
        }
      }
    }
    return link;
  }


  var listsDialog = null;


  var beautifyListsDialogIsRunning = false;
  function beautifyListsDialog ()
  {
    if (beautifyListsDialogIsRunning || (! listsDialog))
    {
      return;
    }

    beautifyListsDialogIsRunning = true;
    observerActionsAllowed = false;

    var items = listsDialog.getElementsByClassName ('list__wrapper');
    for (var i = 0; i < items.length; i++)
    {
      var item = items [i];
      var rightPart= getFirstChildWithClassName (item, 'account__relationship');
      var button = getFirstChildWithTagName (rightPart, 'button');
      if (button)
      {
        var color = (button.innerHTML.indexOf ('fa-times') > -1)
                  ? getNoteColor ()
                  : getTextColor ();
        var leftPart = getFirstChildWithClassName (item, 'list__display-name');
/*
                var endOfI = leftPart.innerHTML.indexOf ('</i>');
                if (endOfI > -1)
                {
                  var listName = leftPart.innerHTML.substring (endOfI+4);
                  leftPart.innerHTML = leftPart.innerHTML.substring (0, endOfI+4) + '&nbsp; ◆ &nbsp;' + listName;
                }
                else
                {
                  leftPart.innerHTML = leftPart.innerHTML+' &nbsp; ◆◆◆';
                }
*/
        leftPart.style.color = color;

        var star = getFirstChildWithTagName (button, 'i');
        if (star)
        {
          star.style.color = color;
        }
      }
    }

    observerActionsAllowed = true;
    beautifyListsDialogIsRunning = false;
  }


  function checkForListsDialog ()
  {
    var oldDlg = listsDialog;
    listsDialog = getFirstChildWithClassName (document, 'modal-root__modal list-adder');

    beautifyListsDialog ();
  }

  setInterval (checkForListsDialog, 1000);


  function openTheListsDialog ()
  {
    var iconButtons = getIconButtons ();

    if (iconButtons.length > 0)
    {
      observerActionsAllowed = false;

      var menuButton = iconButtons [iconButtons.length - 1];

      // open the menu after a short while:
      setTimeout(function ()
      {
        menuButton.click ();
      },
      250); // Note (A): We specified a short delay here to give the menu time to be shown.

      // Find the opened menu and click the menu item to open the lists dialog:
      setTimeout(function ()
      {
        var link = getLinkForLists ();
        if (link)
        {
          link.click ();
        }
      },
      500); // Note (B): The delay specified here must be longer than the small delay specified at (A).
    }
  }


  var currentUserName = '?';
  var addQuickAccessButtonForListsIsRunning = false;



  function addQuickAccessButtonForLists ()
  {
    if (addQuickAccessButtonForListsIsRunning)
    {
      return;
    }
    addQuickAccessButtonForListsIsRunning = true;

    var buttonContainer = getIconButtonContainer ();
    if (buttonContainer)
    {
      var iconButtons = getIconButtons ();

      if (iconButtons.length > 0)
      {
        var nameContainer = buttonContainer.parentNode.nextElementSibling;
        if (nameContainer)
        {
          var classOfMyButton = 'MastodonHelper-button-for-quick-access-to-lists';

          myQuickAccessButton = getFirstChildWithClassName (nameContainer.parentNode, classOfMyButton);

          if (! myQuickAccessButton)
          {
            var menuButton = iconButtons [iconButtons.length - 1];

            var newButton = document.createElement('button');
            newButton.setAttribute ('type', 'button');
            newButton.setAttribute ('title', 'Add or Remove from lists');
            newButton.setAttribute ('class', classOfMyButton);
            newButton.innerHTML = '&nbsp;<b>L</b>&nbsp;';

            nameContainer.parentNode.insertBefore (newButton, nameContainer);

            myQuickAccessButton = getFirstChildWithClassName (nameContainer.parentNode, classOfMyButton);

            if (myQuickAccessButton)
            {
              myQuickAccessButton.addEventListener("click", function ()
              {
                openTheListsDialog ();
              });
              console.log ('Button "L" was added for opening the add to/remove from lists menu.');
            }
          }

          var textArea = getFirstChildWithTagName (buttonContainer.parentNode.parentNode.parentNode, 'textarea');
          if (textArea)
          {
            textArea.style.color = getNoteColor ();
          }
        }
      }
    }
    else
    {
      console.log ('Container not found, retrying in 1.5 seconds …');

      setTimeout(addQuickAccessButtonForLists (), 1500); // Note: The delay specified here must be longer than the delays specified below.
    }

    setTimeout(function ()
    {
      addQuickAccessButtonForListsIsRunning = false;
    },
    1000); // Note: The delay specified here must be shorter than the delays specified above.
  }


  var observerHasBeenSetUp = false;

  function setupObserver ()
  {
    if (observerHasBeenSetUp)
    {
      return;
    }

    console.log ('Trying to setup observer for column area …');
    var columnsArea = getFirstChildWithClassName (document, 'columns-area');

    if (observerHasBeenSetUp)
    {
      return;
    }

    if (columnsArea)
    {
      observerHasBeenSetUp = true;

      let observer = new MutationObserver(mutationRecords =>
      {
        if (observerActionsAllowed)
        {
          setTimeout(addQuickAccessButtonForLists (), 500);
        }
      });

      observer.observe(columnsArea,
                       {
                         childList: true, // observe direct children
                         subtree: true, // lower descendants too
                         characterDataOldValue: false, // do not pass old data to callback
                       });

      console.log ('Observer was set up for column area.');
    }
  }


  function beautifyMastodon ()
  {
    console.log('Mastodon Helper ' + MastodonHelperVERSION + ' running …');

    setInterval (renameThePublishButton, 1400);

    setInterval (setupObserver, 2500);

    setInterval (colorizeTheLinks, 3000);
  }


  beautifyMastodon ();
})();
