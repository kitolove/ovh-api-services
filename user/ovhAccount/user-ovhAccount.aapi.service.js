angular.module("ovh-api-services").service("UserOvhAccountAapi", function ($resource) {
    "use strict";

    return $resource("/me/ovhAccount/all", {}, {
        info: {
            method: "GET",
            serviceType: "aapi",
            isArray: true
        }
    });
});
