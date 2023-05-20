document.addEventListener('DOMContentLoaded', () => {
    // waits for URL changes
    chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
        const currentURL = details.url;
        const blurredURL = 'https://tinder.com/app/likes-you';
        if(currentURL === blurredURL) { // message only sent to content script when on the blurred "Likes You" page
            chrome.tabs.sendMessage(details.tabId, { toUnblur: true }); 
        }
    });
});
