angular.module("ovh-api-services").service("FreeFaxLexi", function ($resource, $cacheFactory, FreeFax) {
    "use strict";

    var interceptor = {
        response: function (response) {
            FreeFax.resetCache();
            return response.resource;
        }
    };

    return $resource("/freefax/:serviceName", {
        serviceName: "@serviceName"
    }, {
        schema: {
            method: "GET",
            url: "/freefax.json"
        },
        query: {
            method: "GET",
            url: "/freefax",
            isArray: true,
            cache: FreeFax.cache
        },
        getPrice: {
            method: "GET",
            url: "/order/freefax/new",
            cache: FreeFax.cache
        },
        orderCredits: {
            method: "POST",
            url: "/order/freefax/new",
            interceptor: interceptor
        },
        voiceMailGet: {
            method: "GET",
            url: "/freefax/:serviceName/voicemail"
        },
        voiceMailGetRouting: {
            method: "GET",
            isArray: false,
            url: "/freefax/:serviceName/voicemail/routing",
            transformResponse: function (resp, headers, status) {
                var data = resp;

                if (status === 200) {
                    data = {
                        value: angular.fromJson(data)
                    };
                }
                return data;
            }
        },
        voiceMailChangeRouting: {
            method: "POST",
            url: "/freefax/:serviceName/voicemail/changeRouting",
            interceptor: interceptor
        },
        voiceMailPut: {
            method: "PUT",
            url: "/freefax/:serviceName/voicemail",
            interceptor: interceptor
        },
        changePassword: {
            method: "POST",
            url: "/freefax/:serviceName/voicemail/changePassword"
        },
        resetPassword: {
            method: "POST",
            url: "/freefax/:serviceName/changePassword",
            transformResponse: function (resp, headers, status) {
                var data = resp;

                if (status === 200) {
                    data = {
                        value: angular.fromJson(data)
                    };
                }
                return data;
            }
        },
        saveConfiguration: {
            method: "PUT",
            url: "/freefax/:serviceName",
            interceptor: interceptor
        }
    });
});
