// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use the sample from https://developer.chrome.com/extensions/getstarted

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    callback(url);
  });
}

var keyword = "";
var language = "English";

// Add eventListener to page on select language and search contents
document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {

    var dropdown = document.getElementById('dropdown');

    dropdown.addEventListener('change', () => {
      language = document.getElementById('dropdown').value;

      var url = "";

      if (language == "Spanish") {
        url = "https://es.m.wikipedia.org/wiki/" + keyword;
      } else if (language == "Chinese") {
        url = "https://zh.m.wikipedia.org/wiki/" + keyword;
      } else {
        url = "https://en.m.wikipedia.org/wiki/" + keyword;
      }

      var mobileWiki = document.getElementById('wiki-holder');
      mobileWiki.setAttribute("src", url);
    });



    var searchBox = document.getElementById('searchbox');

    searchBox.addEventListener('keypress', (event) => {
      var charCode = event.keyCode;
      if (charCode == '13') {
        keyword = searchBox.value;

        var url = "";

        if (language == "Spanish") {
          url = "https://es.m.wikipedia.org/wiki/" + keyword;
        } else if (language == "Chinese") {
          url = "https://zh.m.wikipedia.org/wiki/" + keyword;
        } else {
          url = "https://en.m.wikipedia.org/wiki/" + keyword;
        }

        var mobileWiki = document.getElementById('wiki-holder');
        mobileWiki.setAttribute("src", url);
      }
    })

  });
});
