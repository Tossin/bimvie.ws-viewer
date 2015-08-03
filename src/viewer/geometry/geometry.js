/**
 TODO

 ## Overview

 TODO

 ## Example

 #### Creating a triangle mesh Geometry

 <iframe style="width: 600px; height: 400px" src="../../examples/geometry_Geometry.html">Run this example</iframe>

 ````javascript

 // Create a Viewer
 var viewer = new BIMSURFER.Viewer({ element: "myDiv" });

 // Create a Camera
 var camera = new BIMSURFER.Camera(viewer, {
    eye: [0, 0, -10]
 });

 // Create a CameraControl to interact with the Camera
 var cameraControl = new BIMSURFER.CameraControl(viewer, {
    camera: camera
 });

 // Create a triangle mesh Geometry

 var geometry = new BIMSURFER.Geometry(viewer, {

    primitive: "triangles",

    positions: [
        5, 5, 5, -5, 5, 5, -5, -5, 5, 5, -5, 5, // v0-v1-v2-v3 front
        5, 5, 5, 5, -5, 5, 5, -5, -5, 5, 5, -5, // v0-v3-v4-v5 right
        5, 5, 5, 5, 5, -5, -5, 5, -5, -5, 5, 5, // v0-v5-v6-v1 top
        -5, 5, 5, -5, 5, -5, -5, -5, -5, -5, -5, 5, // v1-v6-v7-v2 left
        -5, -5, -5, 5, -5, -5, 5, -5, 5, -5, -5, 5, // v7-v4-v3-v2 bottom
        5, -5, -5, -5, -5, -5, -5, 5, -5, 5, 5, -5 // v4-v7-v6-v5 back
    ],

    normals: [
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // v0-v1-v2-v3 front
        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // v0-v3-v4-v5 right
        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // v0-v5-v6-v1 top
       -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // v1-v6-v7-v2 left
        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // v7-v4-v3-v2 bottom
        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1 // v4-v7-v6-v5 back
    ],

    indices: [
        0, 1, 2, 0, 2, 3, // back
        4, 5, 6, 4, 6, 7,  // front
        8, 9, 10, 8, 10, 11, // right
        12, 13, 14, 12, 14, 15, // top
        16, 17, 18, 16, 18, 19, // left
        20, 21, 22, 20, 22, 23 // bottom
    ]
 });

 // Create an Object that uses our Geometry
 // Note that an Object can have multiple Geometries

 new BIMSURFER.BoxObject(viewer, {
    id: "foo",
    type: "IfcWall",
    geometries: [ geometry ]
 });

 ````

 @class Geometry
 @module BIMSURFER
 @submodule geometry
 @constructor
 @param [viewer] {Viewer} Parent {{#crossLink "Viewer"}}{{/crossLink}}.
 @param [cfg] {*} Configs
 @param [cfg.id] {String} Optional ID, unique among all components in the parent viewer, generated automatically when omitted.
 @param [cfg.meta] {String:Object} Optional map of user-defined metadata to attach to this BoxGeometry.
 @param [cfg.primitive="triangles"] {String} The primitive type. Accepted values are 'points', 'lines', 'line-loop', 'line-strip', 'triangles', 'triangle-strip' and 'triangle-fan'.
 @param [cfg.positions] {Array of Number} Positions array.
 @param [cfg.normals] {Array of Number} Normals array.
 @param [cfg.uv] {Array of Number} UVs array.
 @param [cfg.uv2] {Array of Number} Second UVs array, for a second UV level.
 @param [cfg.colors] {Array of Number} Vertex colors.
 @param [cfg.indices] {Array of Number} Indices array.
 @extends Component
 */
(function () {

    "use strict";

    BIMSURFER.Geometry = BIMSURFER.Component.extend({

        /**
         JavaScript class name for this Component.

         @property className
         @type String
         @final
         */
        className: "BIMSURFER.Geometry",

        _init: function (cfg) {

            var libraryNode = this.viewer.scene.getNode("library");

            if (cfg.positions && cfg.indices) {

                this._geometryNode = libraryNode.addNode({
                    type: "geometry",
                    primitive: cfg.primitive || "triangles",
                    positions: cfg.positions,
                    normals: cfg.normals,
                    uv: cfg.uv,
                    indices: cfg.indices
                });
            } else {

                // Default box geometry

                this._geometryNode = libraryNode.addNode({

                    type: "geometry",

                    primitive: "triangles",

                    positions: [
                        5, 5, 5, -5, 5, 5, -5, -5, 5, 5, -5, 5, // v0-v1-v2-v3 front
                        5, 5, 5, 5, -5, 5, 5, -5, -5, 5, 5, -5, // v0-v3-v4-v5 right
                        5, 5, 5, 5, 5, -5, -5, 5, -5, -5, 5, 5, // v0-v5-v6-v1 top
                        -5, 5, 5, -5, 5, -5, -5, -5, -5, -5, -5, 5, // v1-v6-v7-v2 left
                        -5, -5, -5, 5, -5, -5, 5, -5, 5, -5, -5, 5, // v7-v4-v3-v2 bottom
                        5, -5, -5, -5, -5, -5, -5, 5, -5, 5, 5, -5 // v4-v7-v6-v5 back
                    ],

                    normals: [
                        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, // v0-v1-v2-v3 front
                        1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, // v0-v3-v4-v5 right
                        0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, // v0-v5-v6-v1 top
                        -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, // v1-v6-v7-v2 left
                        0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, // v7-v4-v3-v2 bottom
                        0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1 // v4-v7-v6-v5 back
                    ],

                    uv: [
                        5, 5, 0, 5, 0, 0, 5, 0, // v0-v1-v2-v3 front
                        0, 5, 0, 0, 5, 0, 5, 5, // v0-v3-v4-v5 right
                        5, 0, 5, 5, 0, 5, 0, 0, // v0-v5-v6-v1 top
                        5, 5, 0, 5, 0, 0, 5, 0, // v1-v6-v7-v2 left
                        0, 0, 5, 0, 5, 5, 0, 5, // v7-v4-v3-v2 bottom
                        0, 0, 5, 0, 5, 5, 0, 5 // v4-v7-v6-v5 back
                    ],

                    indices: [
                        0, 1, 2, 0, 2, 3, // back
                        4, 5, 6, 4, 6, 7,  // front
                        8, 9, 10, 8, 10, 11, // right
                        12, 13, 14, 12, 14, 15, // top
                        16, 17, 18, 16, 18, 19, // left
                        20, 21, 22, 20, 22, 23 // bottom

                    ]
                });
            }

            this.coreId = this._geometryNode.getCoreId();

            this.boundary = this._geometryNode.getBoundary();
        },

        _destroy: function () {
            this._geometryNode.destroy();
        }
    });

})();