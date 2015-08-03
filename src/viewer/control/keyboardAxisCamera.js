/**
 A **KeyboardAxisCamera** lets you switch a {{#crossLink "Camera"}}{{/crossLink}} between preset left, right, anterior, posterior, superior and inferior views using the keyboard.

 ## Overview

 <ul>
 <li>If desired, you can have multiple KeyboardAxisCameras within the same {{#crossLink "Viewer"}}{{/crossLink}}.</li>
 <li>Multiple KeyboardAxisCameras can drive the same {{#crossLink "Camera"}}{{/crossLink}}, or can each drive their own separate {{#crossLink "Camera"}}Cameras{{/crossLink}}.</li>
 <li>At any instant, the KeyboardAxisCamera we're driving is the one whose {{#crossLink "Camera/active:property"}}active{{/crossLink}} property is true.</li>
 <li>You can switch a KeyboardAxisCamera to a different {{#crossLink "Camera"}}{{/crossLink}} at any time.</li>
 </ul>

 ## Example

 <iframe style="width: 600px; height: 400px" src="../../examples/control_KeyboardAxisCamera.html"></iframe>

 @class KeyboardAxisCamera
 @module BIMSURFER
 @submodule control
 @constructor
 @param [viewer] {Viewer} Parent {{#crossLink "Viewer"}}{{/crossLink}}.
 @param [cfg] {*} Configs
 @param [cfg.id] {String} Optional ID, unique among all components in the parent viewer, generated automatically when omitted.
 @param [cfg.meta] {String:Object} Optional map of user-defined metadata to attach to this KeyboardAxisCamera.
 @param [camera] {Camera} The {{#crossLink "Camera"}}{{/crossLink}} to control.
 @extends Component
 */
(function () {

    "use strict";

    BIMSURFER.KeyboardAxisCamera = BIMSURFER.Component.extend({

        /**
         JavaScript class name for this Component.

         @property className
         @type String
         @final
         */
        className: "BIMSURFER.KeyboardAxisCamera",

        _init: function (cfg) {

            this.camera = cfg.camera;

            this._onKeyDown = null;

            this._cameraFly = new BIMSURFER.CameraFlyAnimation(this.viewer, {
                camera: this.camera
            });

            this.active = cfg.active !== false;
        },

        _props: {

            /**
             * Flag which indicates whether this KeyboardAxisCamera is active or not.
             *
             * Fires an {{#crossLink "KeyboardAxisCamera/active:event"}}{{/crossLink}} event on change.
             *
             * @property active
             * @type Boolean
             */
            active: {

                set: function (value) {

                    value = !!value;

                    if (this._active === value) {
                        return;
                    }

                    this._cameraFly.active = value;

                    var self = this;

                    var input = this.viewer.input;

                    if (value) {

                        this._onKeyDown = input.on("keydown",
                            function (keyCode) {

                                if (!self._camera) {
                                    return;
                                }

                                var center = self.viewer.center;

                                var dist;
                                var elev;

                                var eye;
                                var look;
                                var up;

                                switch (keyCode) {

                                    case input.KEY_NUM_1:

                                        // Right view

                                        dist = 100;
                                        elev = 0;

                                        look = center;
                                        eye = [-dist, elev, 0];
                                        up = [ 0, 1, 0 ];

                                        break;

                                    case input.KEY_NUM_2:

                                        // Left view

                                        dist = 100;
                                        elev = 0;

                                        look = center;
                                        eye = [dist, elev, 0];
                                        up = [ 0, 1, 0 ];

                                        break;

                                    case input.KEY_NUM_3:

                                        // Front view

                                        dist = 100;
                                        elev = 0;

                                        look = center;
                                        eye = [0, elev, -dist];
                                        up = [ 0, 1, 0 ];

                                        break;

                                    case input.KEY_NUM_4:

                                        // Back view

                                        dist = 100;
                                        elev = 0;

                                        look = center;
                                        eye = [0, elev, dist];
                                        up = [ 0, 1, 0 ];

                                        break;

                                    case input.KEY_NUM_5:

                                        // Top view

                                        dist = 100;
                                        elev = 0;

                                        look = center;
                                        eye = [0, elev - dist, 0];
                                        up = [ 0, 0, 1 ];

                                        break;

                                    case input.KEY_NUM_6:

                                        // Bottom view

                                        dist = 100;
                                        elev = 0;

                                        look = [0, elev, 0 ];
                                        eye = [0, elev + dist, 0];
                                        up = [ 0, 0, -1 ];

                                        break;
                                }

                                if (look) {

                                    self._cameraFly.flyTo({
                                        look: look,
                                        eye: eye,
                                        up: up
                                    });
                                }
                            });

                    } else {

                        this.viewer.off(this._onKeyDown);
                    }

                    /**
                     * Fired whenever this KeyboardAxisCamera's {{#crossLink "KeyboardAxisCamera/active:property"}}{{/crossLink}} property changes.
                     * @event active
                     * @param value The property's new value
                     */
                    this.fire('active', this._active = value);
                },

                get: function () {
                    return this._active;
                }
            },

            camera: {

                set: function (value) {
                    var camera = value;
                    if (camera) {
                        if (BIMSURFER._isString(camera)) {
                            camera = this.viewer.components[camera];
                            if (!camera) {
                                this.error("camera", "Camera not found in Viewer: " + value);
                                return;
                            }
                        }
                        if (camera.className != "BIMSURFER.Camera") {
                            this.error("camera", "Value is not a BIMSURFER.Camera");
                            return;
                        }
                    }
                    this._camera = camera;
                },

                get: function () {
                    return this._camera;
                }
            }
        },

        _destroy: function () {
            this.active = false;

            this._cameraFly.destroy();
        }
    });

})();
