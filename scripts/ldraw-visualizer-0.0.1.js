var SomethingElse;
(function (SomethingElse) {
    var OhHey = (function () {
        function OhHey() {
        }
        OhHey.prototype.doStuff = function () {
            alert('hi');
        };
        return OhHey;
    })();
    SomethingElse.OhHey = OhHey;
})(SomethingElse || (SomethingElse = {}));
/// <reference path="somthing-else.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    // var scene = new THREE.Scene();
    // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // var renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    new SomethingElse.OhHey().doStuff();
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=ldraw-visualizer-0.0.1.js.map