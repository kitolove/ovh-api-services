angular.module("ovh-api-services").service("CloudProjectForecastLexi", function ($resource) {
    "use strict";

    return $resource("/cloud/project/:serviceName/forecast", {
        serviceName: "@serviceName"
    });
});
