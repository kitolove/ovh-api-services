angular.module("ovh-api-services").service("DedicatedCephUserPoolLexi", function ($resource, $cacheFactory) {
    "use strict";

    var queryCache = $cacheFactory("DedicatedCephUserPoolLexi");

    var interceptor = {
        response: function (response) {
            queryCache.removeAll();
            return response;
        }
    };

    var resource = $resource("/dedicated/ceph/:serviceName/user/:userName/pool", {
        serviceName: "@serviceName",
        userName: "@userName"
    }, {
        query: {
            method: "GET",
            cache: queryCache,
            isArray: true
        },
        post: {
            method: "POST",
            interceptor: interceptor
        },
        put: {
            method: "PUT",
            interceptor: interceptor
        }
    });

    resource.resetAllCache = function () {
        resource.resetQueryCache();
    };

    resource.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return resource;
});
