async function unblur() {
    let retcode;
    try {
        const blurredPhotos = document.querySelectorAll('.Expand.enterAnimationContainer > div:nth-child(1)');
        const unblurredPhotos = await fetch("https://api.gotinder.com/v2/fast-match/teasers", 
                                        {"headers": {"X-Auth-Token": localStorage.getItem('TinderWeb/APIToken')}})
                                .then(res => res.json())
                                .then(res => res.data.results); // grab unblurred images
        blurredPhotos.forEach((blurred,i) => {
            const unblurred = unblurredPhotos[i].user.photos[0].url;
            blurred.style.backgroundImage = `url(${unblurred})`; // replace each blurred images with its unblurred counterpart
        });
        retcode = 0; // success
    }
    catch(err) { // error occurred
        console.log("Tinder Unblur error:",err);
        retcode = 1; // failure
    }
    return retcode; 
}

chrome.runtime.onMessage.addListener( // message is sent from background script to content script when ready to unblur
    function(message, sender, sendResponse) {
        setTimeout(() => { // wait 2 seconds for page to load before unblurring
            unblur();
        },2000);
    }
);