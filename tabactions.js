var LOCAL_STORAGE_ELEMENT_NAME = 'fcpChromeWidgetOn';
var storage = chrome.storage.local;


storage.get("fcpChromeWidgetOn", function(st){
    if (st.fcpChromeWidgetOn && st.fcpChromeWidgetOn == true) {
        chrome.browserAction.setBadgeText({text: "on"});
    } else {
        chrome.browserAction.setBadgeText({text: "off"});
    }
});

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    chrome.browserAction.getBadgeText({}, function(text) {
        if (text === "off") {
            chrome.browserAction.setBadgeText({text: "on"});
            storage.set({fcpChromeWidgetOn: true});
            return;
        }
        chrome.browserAction.setBadgeText({text: "off"});
        storage.set({fcpChromeWidgetOn: false});
    });
});