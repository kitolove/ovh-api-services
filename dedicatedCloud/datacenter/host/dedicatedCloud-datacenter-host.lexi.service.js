angular.module("ovh-api-services").service("DedicatedCloudDatacenterHostLexi", function ($resource, $cacheFactory) {
    "use strict";

    var queryCache = $cacheFactory("DedicatedCloudDatacenterHostLexiQuery");
    var cache = $cacheFactory("DedicatedCloudDatacenterHostLexi");

    var hostResource = $resource("/dedicatedCloud/:serviceName/datacenter/:datacenterId/host/:hostId", {
        serviceName: "@serviceName",
        datacenterId: "@datacenterId",
        hostId: "@hostId"
    }, {
        get: { method: "GET", cache: cache },
        query: { method: "GET", cache: queryCache, isArray: true }
    });

    hostResource.resetCache = function () {
        cache.removeAll();
    };

    hostResource.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return hostResource;
});
