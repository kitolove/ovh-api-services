angular.module("ovh-api-services").service("TelephonyScreenLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("TelephonyScreenLexi");
    var queryCache = $cacheFactory("TelephonyScreenLexiQuery");

    var interceptor = {
        response: function (response) {
            cache.remove(response.config.url);
            queryCache.removeAll();
            return response.resource;
        }
    };

    var screenResource = $resource("/telephony/:billingAccount/screen/:serviceName", {
        billingAccount: "@billingAccount",
        serviceName: "@serviceName"
    }, {
        query: {
            method: "GET",
            isArray: true,
            cache: queryCache
        },
        get: {
            method: "GET",
            cache: cache
        },
        getBatch: {
            method: "GET",
            isArray: true,
            headers: {
                "X-Ovh-Batch": ","
            },
            cache: cache
        },
        change: {
            method: "PUT",
            interceptor: interceptor
        }
    });

    screenResource.resetAllCache = function () {
        cache.removeAll();
        queryCache.removeAll();
    };

    return screenResource;
});
