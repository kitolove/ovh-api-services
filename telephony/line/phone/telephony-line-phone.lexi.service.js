angular.module("ovh-api-services").service("TelephonyLinePhoneLexi", function ($resource, $cacheFactory) {
    "use strict";

    var cache = $cacheFactory("TelephonyLinePhoneLexi");

    var interceptor = {
        response: function (response) {
            cache.remove(response.config.url.replace("/changePhoneConfiguration", ""));
            return response.data;
        }
    };

    return $resource("/telephony/:billingAccount/line/:serviceName/phone", {
        billingAccount: "@billingAccount",
        serviceName: "@serviceName"
    }, {
        get: {
            method: "GET",
            cache: cache
        },
        edit: {
            method: "PUT",
            interceptor: interceptor
        },
        changePhoneConfiguration: {
            method: "POST",
            url: "/telephony/:billingAccount/line/:serviceName/phone/changePhoneConfiguration",
            interceptor: interceptor
        },
        getMerchandiseAvailable: {
            method: "GET",
            url: "/telephony/:billingAccount/line/:serviceName/phone/merchandiseAvailable",
            isArray: true
        },
        reboot: {
            method: "POST",
            url: "/telephony/:billingAccount/line/:serviceName/phone/reboot"
        },
        resetConfig: {
            method: "POST",
            url: "/telephony/:billingAccount/line/:serviceName/phone/resetConfig"
        }
    });
});
