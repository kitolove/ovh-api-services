angular.module("ovh-api-services").service("SmsUsersOutgoingLexi", function ($cacheFactory, $resource) {
    "use strict";

    var cache = $cacheFactory("SmsUsersOutgoingLexi");
    var queryCache = $cacheFactory("SmsUsersOutgoingLexiQuery");

    var interceptor = {
        response: function (response) {
            cache.remove(response.config.url);
            queryCache.removeAll();
            return response.resource;
        }
    };

    var usersOutgoing = $resource("/sms/:serviceName/users/:login/outgoing/:id", {
        serviceName: "@serviceName",
        login: "@login",
        id: "@id"
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
        "delete": {
            method: "DELETE",
            interceptor: interceptor
        },
        getHlr: {
            method: "GET",
            url: "/sms/:serviceName/users/:login/outgoing/:id/hlr",
            cache: cache
        }
    });

    usersOutgoing.resetCache = function () {
        cache.removeAll();
    };

    usersOutgoing.resetQueryCache = function () {
        queryCache.removeAll();
    };

    return usersOutgoing;
});
