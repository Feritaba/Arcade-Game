//This is simply an image loading utility.
(function() {
    var resourceCache = {};
    var readyCallbacks = [];

    // This is the publicly accessible image loading function.
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            _load(urlOrArr);
        }
    }

    // This is our private image loader function
    function _load(url) {
        if(resourceCache[url]) {

            return resourceCache[url];
        } else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    // If an image is cached, this functions do the same as calling load() on that URL.
    function get(url) {
        return resourceCache[url];
    }

    // This function checks if all of the images properly loaded.
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    // when all requested images are properly loaded, add a function to the callback stack
    function onReady(func) {
        readyCallbacks.push(func);
    }

    // This object defines the publicly accessible functions available
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();