angular.module("ovh-api-services").service("TelephonyEasyHuntingHuntingAgentQueueLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("TelephonyEasyHuntingHuntingAgentQueueLexi");
    var queryCache = $cacheFactory("TelephonyEasyHuntingHuntingAgentQueueLexiQuery");

    var interceptor = {
        response: function (response) {
            cache.remove(response.config.url);
            queryCache.removeAll();
            return response.resource;
        }
    };

    var res = $resource("/telephony/:billingAccount/easyHunting/:serviceName/hunting/agent/:agentId/queue/:queueId", {
        billingAccount: "@billingAccount",
        serviceName: "@serviceName",
        agentId: "@agentId",
        queueId: "@queueId"
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
        create: {
            url: "/telephony/:billingAccount/easyHunting/:serviceName/hunting/agent/:agentId/queue",
            method: "POST",
            interceptor: interceptor
        },
        change: {
            method: "PUT",
            interceptor: interceptor
        },
        remove: {
            method: "DELETE",
            interceptor: interceptor
        }
    });

    res.resetCache = function () {
        cache.removeAll();
    };

    res.resetQueryCache = function () {
        queryCache.removeAll();
    };

    res.resetAllCache = function () {
        this.resetCache();
        this.resetQueryCache();
    };

    return res;
});
