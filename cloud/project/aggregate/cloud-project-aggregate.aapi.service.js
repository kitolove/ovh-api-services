angular.module("ovh-api-services").service("CloudProjectAggregateAapi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("CloudProjectAggregateAapi");

    var cloudProjectAggregateResource = $resource("/cloud/project/:serviceName/aggregate", {
        serviceName: "@serviceName"
    }, {
        get: {
            method: "GET",
            isArray: false,
            serviceType: "aapi"
        }
    });

    cloudProjectAggregateResource.resetAllCache = function () {
        cloudProjectAggregateResource.resetCache();
    };

    cloudProjectAggregateResource.resetCache = function () {
        cache.removeAll();
    };

    return cloudProjectAggregateResource;
});
