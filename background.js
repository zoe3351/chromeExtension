//add searchWiki function row into context menu once installed
chrome.runtime.onInstalled.addListener(function (detail) {
    var title = "Wiki ”%s“";
    
    chrome.contextMenus.create({ "title": title, "contexts": ["selection"], "id": "searchWiki"}); 
});

//add click event handler to handle wikiSearch, this will open the wiki search page in new tab
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "searchWiki" && info.selectionText) {
        var url = "https://en.wikipedia.org/wiki?search=" + encodeURIComponent(info.selectionText);
        chrome.tabs.query({ "active": true, "currentWindow": true }, function (tabArray) {
            var tab = tabArray[0]; // the active tab, we want our tab next to it
            chrome.tabs.create({ "url": url, "index": tab.index + 1, "openerTabId": tab.id });
        });
    }
});





