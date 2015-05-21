(function() {
    var ads = document.getElementsByTagName("gpt-ad");

    for (var i = 0; i < ads.length; i += 1) {
        var ad = ads[i];
        ad.setAttribute("id", "ad-" + i);

        var adSlot = googletag.defineSlot("/4624/TheAtlanticOnline/channel_technology", [300, 250], "ad-" + i)
                              .addService(googletag.pubads());

        // Iterate over attributes to find targeting info.
        for (var j = 0; j < ad.attributes.length; j += 1) {
            var attribute = ad.attributes[j];

            if (attribute.name.startsWith("targeting-")) {
                var targeting = attribute.name.replace(new RegExp(/^targeting-/), "");
                adSlot.setTargeting(targeting, attribute.value);
            }
        }

        // Iterate over sizeset element children..
        var sizeSets = ad.getElementsByTagName("gpt-sizeset");
        var sizeMapping = googletag.sizeMapping();
        for (var k = 0; k < sizeSets.length; k += 1) {
            var sizeSet = sizeSets[k];

            // Build GPT size mapping.
            sizeMapping.addSize(JSON.parse(sizeSet.getAttribute("viewport-size")),
                JSON.parse(sizeSet.getAttribute("sizes")));
        }
        adSlot.defineSizeMapping(sizeMapping.build());
    }

    googletag.cmd.push(function() {
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
    });

    for (var j = 0; j < i; j += 1) {
        googletag.cmd.push(function() {
            googletag.display("ad-" + j);
        });
    }
})();
