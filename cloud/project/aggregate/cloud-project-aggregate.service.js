angular.module("ovh-api-services").service("CloudProjectAggregate", function ($injector) {
    "use strict";

    return {
        Aapi: function () {
            return $injector.get("CloudProjectAggregateAapi");
        }
    };

});
