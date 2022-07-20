sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "app/preview/auth/header/ui5/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("app.preview.auth.header.ui5.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // 'loaded_Without_AuthHeader' model
                $.ajax({
                    url: "my-custom-endpoint",
                    headers: {
                        // 'Authorization': 'Bearer some.bearertoken.here'
                    }
                }).then((data, textStatus, jqXHR) => {
                    this.getModel('loaded_Without_AuthHeader').setData(data);
                }, (jqXHR, textStatus, errorThrown) => {
                    console.error(jqXHR);
                });

                // 'loaded_With_AuthHeader' model
                $.ajax({
                    url: "my-custom-endpoint",
                    headers: {
                        'Authorization': 'Bearer some.bearertoken.here'
                    }
                }).then((data, textStatus, jqXHR) => {
                    this.getModel('loaded_With_AuthHeader').setData(data);
                }, (jqXHR, textStatus, errorThrown) => {
                    console.error(jqXHR);
                });
            }
        });
    }
);