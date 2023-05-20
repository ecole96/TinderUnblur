const unblur = async () => {
    try {
        const blurredPhotos = document.querySelectorAll('.Expand.enterAnimationContainer > div:nth-child(1)');
        const unblurredPhotos = await fetch("https://api.gotinder.com/v2/fast-match/teasers", {
                                    'headers': {
                                        'X-Auth-Token': localStorage.getItem('TinderWeb/APIToken'),
                                        'platform': 'android'
                                }})
                                .then(res => res.json())
                                .then(res => res.data.results); // grab unblurred images
        blurredPhotos.forEach((blurred, i) => {
            const { user: {_id: userId, photos: [{ id: photoId }]} } = unblurredPhotos[i];
            const unblurred = `https://preview.gotinder.com/${userId}/original_${photoId}.jpeg`;
            blurred.style.backgroundImage = `url(${unblurred})`; // replace each blurred images with its unblurred counterpart
        });
    }
    catch(err) { // error occurred
        console.error("Tinder Unblur error:",err);
    }
}

// message is sent from background script to content script when ready to unblur
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    setTimeout(() => unblur(), 2000);  // wait 2 seconds for page to load before unblurring
});