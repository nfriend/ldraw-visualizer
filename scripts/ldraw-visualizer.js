var LdrawVisualizer;
(function (LdrawVisualizer) {
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container;
    var camera, controls, scene, renderer;
    init();
    render();
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    }
    function init() {
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 200;
        controls = new THREE.OrbitControls(camera);
        controls.damping = 0.2;
        controls.addEventListener('change', render);
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x111111, 0.002);
        var cubeGeometry = new THREE.BoxGeometry(96, 65, 160);
        var cylinderGeometry = new THREE.CylinderGeometry(12, 12, 9, 32);
        var material = new THREE.MeshPhongMaterial({ color: 0xff0000, shading: THREE.FlatShading });
        // just for looks.
        var cube = new THREE.Mesh(cubeGeometry, material);
        scene.add(cube);
        var cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 24;
        cylinder.position.z = 50 - 30;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 72;
        cylinder.position.z = 50 - 30;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 24;
        cylinder.position.z = 50 + 6;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 72;
        cylinder.position.z = 50 + 6;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 24;
        cylinder.position.z = 50 - 66;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 72;
        cylinder.position.z = 50 - 66;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 24;
        cylinder.position.z = 50 - 102;
        scene.add(cylinder);
        cylinder = new THREE.Mesh(cylinderGeometry, material);
        cylinder.geometry.mergeVertices();
        cylinder.position.y = 37;
        cylinder.position.x = 50 - 72;
        cylinder.position.z = 50 - 102;
        scene.add(cylinder);
        // for (var i = 0; i < 500; i++) {
        // 	var mesh = new THREE.Mesh(geometry, material);
        // 	mesh.position.x = (Math.random() - 0.5) * 1000;
        // 	mesh.position.y = (Math.random() - 0.5) * 1000;
        // 	mesh.position.z = (Math.random() - 0.5) * 1000;
        // 	mesh.updateMatrix();
        // 	mesh.matrixAutoUpdate = false;
        // 	scene.add(mesh);
        // }
        // lights
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, .6, -.2);
        scene.add(directionalLight);
        directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(-1, -1.5, 1.7);
        scene.add(directionalLight);
        var ambientLight = new THREE.AmbientLight(0x000000);
        scene.add(ambientLight);
        // renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container = document.getElementById('container');
        container.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);
        animate();
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }
    function render() {
        renderer.render(scene, camera);
    }
})(LdrawVisualizer || (LdrawVisualizer = {}));
/////////////////////////////////////////////////////////////
// https://github.com/mrdoob/three.js/tree/master/examples
//////////////////////////////////////////////////////////////
/// <reference path="../../stats/stats.d.ts" />
/// <reference path="../../dat-gui/dat-gui.d.ts" />
/// <reference path="../detector.d.ts" />
/// <reference path="../three-canvasrenderer.d.ts" />
/// <reference path="../three-css3drenderer.d.ts" />
/// <reference path="../three-projector.d.ts" />
/// <reference path="../three-orbitcontrols.d.ts" />
/// <reference path="../three-trackballcontrols.d.ts" />
/// <reference path="../three-effectcomposer.d.ts" />
/// <reference path="../three-renderpass.d.ts" />
/// <reference path="../three-shaderpass.d.ts" />
/// <reference path="../three-copyshader.d.ts" />
/// <reference path="../../three.d.ts" />
/// <reference path="../../../qunit/qunit.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/tree/master/test/unit/math
(function () {
    // -------------------------------------------- Constants
    var x = 2;
    var y = 3;
    var z = 4;
    var w = 5;
    var negInf2 = new THREE.Vector2(-Infinity, -Infinity);
    var posInf2 = new THREE.Vector2(Infinity, Infinity);
    var zero2 = new THREE.Vector2();
    var one2 = new THREE.Vector2(1, 1);
    var two2 = new THREE.Vector2(2, 2);
    var negInf3 = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
    var posInf3 = new THREE.Vector3(Infinity, Infinity, Infinity);
    var zero3 = new THREE.Vector3();
    var one3 = new THREE.Vector3(1, 1, 1);
    var two3 = new THREE.Vector3(2, 2, 2);
    // -------------------------------------------- Box2
    test("constructor", function () {
        var a = new THREE.Box2();
        ok(a.min.equals(posInf2), "Passed!");
        ok(a.max.equals(negInf2), "Passed!");
        a = new THREE.Box2(zero2.clone(), zero2.clone());
        ok(a.min.equals(zero2), "Passed!");
        ok(a.max.equals(zero2), "Passed!");
        a = new THREE.Box2(zero2.clone(), one2.clone());
        ok(a.min.equals(zero2), "Passed!");
        ok(a.max.equals(one2), "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Box2(zero2.clone(), one2.clone());
        var b = new THREE.Box2().copy(a);
        ok(b.min.equals(zero2), "Passed!");
        ok(b.max.equals(one2), "Passed!");
        // ensure that it is a true copy
        a.min = zero2;
        a.max = one2;
        ok(b.min.equals(zero2), "Passed!");
        ok(b.max.equals(one2), "Passed!");
    });
    test("set", function () {
        var a = new THREE.Box2();
        a.set(zero2, one2);
        ok(a.min.equals(zero2), "Passed!");
        ok(a.max.equals(one2), "Passed!");
    });
    test("setFromPoints", function () {
        var a = new THREE.Box2();
        a.setFromPoints([zero2, one2, two2]);
        ok(a.min.equals(zero2), "Passed!");
        ok(a.max.equals(two2), "Passed!");
        a.setFromPoints([one2]);
        ok(a.min.equals(one2), "Passed!");
        ok(a.max.equals(one2), "Passed!");
        a.setFromPoints([]);
        ok(a.empty(), "Passed!");
    });
    test("empty/makeEmpty", function () {
        var a = new THREE.Box2();
        ok(a.empty(), "Passed!");
        var a = new THREE.Box2(zero2.clone(), one2.clone());
        ok(!a.empty(), "Passed!");
        a.makeEmpty();
        ok(a.empty(), "Passed!");
    });
    test("center", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        ok(a.center().equals(zero2), "Passed!");
        a = new THREE.Box2(zero2, one2);
        var midpoint = one2.clone().multiplyScalar(0.5);
        ok(a.center().equals(midpoint), "Passed!");
    });
    test("size", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        ok(a.size().equals(zero2), "Passed!");
        a = new THREE.Box2(zero2.clone(), one2.clone());
        ok(a.size().equals(one2), "Passed!");
    });
    test("expandByPoint", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        a.expandByPoint(zero2);
        ok(a.size().equals(zero2), "Passed!");
        a.expandByPoint(one2);
        ok(a.size().equals(one2), "Passed!");
        a.expandByPoint(one2.clone().negate());
        ok(a.size().equals(one2.clone().multiplyScalar(2)), "Passed!");
        ok(a.center().equals(zero2), "Passed!");
    });
    test("expandByVector", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        a.expandByVector(zero2);
        ok(a.size().equals(zero2), "Passed!");
        a.expandByVector(one2);
        ok(a.size().equals(one2.clone().multiplyScalar(2)), "Passed!");
        ok(a.center().equals(zero2), "Passed!");
    });
    test("expandByScalar", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        a.expandByScalar(0);
        ok(a.size().equals(zero2), "Passed!");
        a.expandByScalar(1);
        ok(a.size().equals(one2.clone().multiplyScalar(2)), "Passed!");
        ok(a.center().equals(zero2), "Passed!");
    });
    test("containsPoint", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        ok(a.containsPoint(zero2), "Passed!");
        ok(!a.containsPoint(one2), "Passed!");
        a.expandByScalar(1);
        ok(a.containsPoint(zero2), "Passed!");
        ok(a.containsPoint(one2), "Passed!");
        ok(a.containsPoint(one2.clone().negate()), "Passed!");
    });
    test("containsBox", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        var b = new THREE.Box2(zero2.clone(), one2.clone());
        var c = new THREE.Box2(one2.clone().negate(), one2.clone());
        ok(a.containsBox(a), "Passed!");
        ok(!a.containsBox(b), "Passed!");
        ok(!a.containsBox(c), "Passed!");
        ok(b.containsBox(a), "Passed!");
        ok(c.containsBox(a), "Passed!");
        ok(!b.containsBox(c), "Passed!");
    });
    test("getParameter", function () {
        var a = new THREE.Box2(zero2.clone(), one2.clone());
        var b = new THREE.Box2(one2.clone().negate(), one2.clone());
        ok(a.getParameter(new THREE.Vector2(0, 0)).equals(new THREE.Vector2(0, 0)), "Passed!");
        ok(a.getParameter(new THREE.Vector2(1, 1)).equals(new THREE.Vector2(1, 1)), "Passed!");
        ok(b.getParameter(new THREE.Vector2(-1, -1)).equals(new THREE.Vector2(0, 0)), "Passed!");
        ok(b.getParameter(new THREE.Vector2(0, 0)).equals(new THREE.Vector2(0.5, 0.5)), "Passed!");
        ok(b.getParameter(new THREE.Vector2(1, 1)).equals(new THREE.Vector2(1, 1)), "Passed!");
    });
    test("clampPoint", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        var b = new THREE.Box2(one2.clone().negate(), one2.clone());
        ok(a.clampPoint(new THREE.Vector2(0, 0)).equals(new THREE.Vector2(0, 0)), "Passed!");
        ok(a.clampPoint(new THREE.Vector2(1, 1)).equals(new THREE.Vector2(0, 0)), "Passed!");
        ok(a.clampPoint(new THREE.Vector2(-1, -1)).equals(new THREE.Vector2(0, 0)), "Passed!");
        ok(b.clampPoint(new THREE.Vector2(2, 2)).equals(new THREE.Vector2(1, 1)), "Passed!");
        ok(b.clampPoint(new THREE.Vector2(1, 1)).equals(new THREE.Vector2(1, 1)), "Passed!");
        ok(b.clampPoint(new THREE.Vector2(0, 0)).equals(new THREE.Vector2(0, 0)), "Passed!");
        ok(b.clampPoint(new THREE.Vector2(-1, -1)).equals(new THREE.Vector2(-1, -1)), "Passed!");
        ok(b.clampPoint(new THREE.Vector2(-2, -2)).equals(new THREE.Vector2(-1, -1)), "Passed!");
    });
    test("distanceToPoint", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        var b = new THREE.Box2(one2.clone().negate(), one2.clone());
        ok(a.distanceToPoint(new THREE.Vector2(0, 0)) == 0, "Passed!");
        ok(a.distanceToPoint(new THREE.Vector2(1, 1)) == Math.sqrt(2), "Passed!");
        ok(a.distanceToPoint(new THREE.Vector2(-1, -1)) == Math.sqrt(2), "Passed!");
        ok(b.distanceToPoint(new THREE.Vector2(2, 2)) == Math.sqrt(2), "Passed!");
        ok(b.distanceToPoint(new THREE.Vector2(1, 1)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector2(0, 0)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector2(-1, -1)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector2(-2, -2)) == Math.sqrt(2), "Passed!");
    });
    test("isIntersectionBox", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        var b = new THREE.Box2(zero2.clone(), one2.clone());
        var c = new THREE.Box2(one2.clone().negate(), one2.clone());
        ok(a.isIntersectionBox(a), "Passed!");
        ok(a.isIntersectionBox(b), "Passed!");
        ok(a.isIntersectionBox(c), "Passed!");
        ok(b.isIntersectionBox(a), "Passed!");
        ok(c.isIntersectionBox(a), "Passed!");
        ok(b.isIntersectionBox(c), "Passed!");
        b.translate(new THREE.Vector2(2, 2));
        ok(!a.isIntersectionBox(b), "Passed!");
        ok(!b.isIntersectionBox(a), "Passed!");
        ok(!b.isIntersectionBox(c), "Passed!");
    });
    test("intersect", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        var b = new THREE.Box2(zero2.clone(), one2.clone());
        var c = new THREE.Box2(one2.clone().negate(), one2.clone());
        ok(a.clone().intersect(a).equals(a), "Passed!");
        ok(a.clone().intersect(b).equals(a), "Passed!");
        ok(b.clone().intersect(b).equals(b), "Passed!");
        ok(a.clone().intersect(c).equals(a), "Passed!");
        ok(b.clone().intersect(c).equals(b), "Passed!");
        ok(c.clone().intersect(c).equals(c), "Passed!");
    });
    test("union", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        var b = new THREE.Box2(zero2.clone(), one2.clone());
        var c = new THREE.Box2(one2.clone().negate(), one2.clone());
        ok(a.clone().union(a).equals(a), "Passed!");
        ok(a.clone().union(b).equals(b), "Passed!");
        ok(a.clone().union(c).equals(c), "Passed!");
        ok(b.clone().union(c).equals(c), "Passed!");
    });
    test("translate", function () {
        var a = new THREE.Box2(zero2.clone(), zero2.clone());
        var b = new THREE.Box2(zero2.clone(), one2.clone());
        var c = new THREE.Box2(one2.clone().negate(), one2.clone());
        var d = new THREE.Box2(one2.clone().negate(), zero2.clone());
        ok(a.clone().translate(one2).equals(new THREE.Box2(one2, one2)), "Passed!");
        ok(a.clone().translate(one2).translate(one2.clone().negate()).equals(a), "Passed!");
        ok(d.clone().translate(one2).equals(b), "Passed!");
        ok(b.clone().translate(one2.clone().negate()).equals(d), "Passed!");
    });
    // -------------------------------------------- Box3
    test("constructor", function () {
        var a = new THREE.Box3();
        ok(a.min.equals(posInf3), "Passed!");
        ok(a.max.equals(negInf3), "Passed!");
        a = new THREE.Box3(zero3.clone(), zero3.clone());
        ok(a.min.equals(zero3), "Passed!");
        ok(a.max.equals(zero3), "Passed!");
        a = new THREE.Box3(zero3.clone(), one3.clone());
        ok(a.min.equals(zero3), "Passed!");
        ok(a.max.equals(one3), "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Box3(zero3.clone(), one3.clone());
        var b = new THREE.Box3().copy(a);
        ok(b.min.equals(zero3), "Passed!");
        ok(b.max.equals(one3), "Passed!");
        // ensure that it is a true copy
        a.min = zero3;
        a.max = one3;
        ok(b.min.equals(zero3), "Passed!");
        ok(b.max.equals(one3), "Passed!");
    });
    test("set", function () {
        var a = new THREE.Box3();
        a.set(zero3, one3);
        ok(a.min.equals(zero3), "Passed!");
        ok(a.max.equals(one3), "Passed!");
    });
    test("setFromPoints", function () {
        var a = new THREE.Box3();
        a.setFromPoints([zero3, one3, two3]);
        ok(a.min.equals(zero3), "Passed!");
        ok(a.max.equals(two3), "Passed!");
        a.setFromPoints([one3]);
        ok(a.min.equals(one3), "Passed!");
        ok(a.max.equals(one3), "Passed!");
        a.setFromPoints([]);
        ok(a.empty(), "Passed!");
    });
    test("empty/makeEmpty", function () {
        var a = new THREE.Box3();
        ok(a.empty(), "Passed!");
        var a = new THREE.Box3(zero3.clone(), one3.clone());
        ok(!a.empty(), "Passed!");
        a.makeEmpty();
        ok(a.empty(), "Passed!");
    });
    test("center", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        ok(a.center().equals(zero3), "Passed!");
        a = new THREE.Box3(zero3.clone(), one3.clone());
        var midpoint = one3.clone().multiplyScalar(0.5);
        ok(a.center().equals(midpoint), "Passed!");
    });
    test("size", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        ok(a.size().equals(zero3), "Passed!");
        a = new THREE.Box3(zero3.clone(), one3.clone());
        ok(a.size().equals(one3), "Passed!");
    });
    test("expandByPoint", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        a.expandByPoint(zero3);
        ok(a.size().equals(zero3), "Passed!");
        a.expandByPoint(one3);
        ok(a.size().equals(one3), "Passed!");
        a.expandByPoint(one3.clone().negate());
        ok(a.size().equals(one3.clone().multiplyScalar(2)), "Passed!");
        ok(a.center().equals(zero3), "Passed!");
    });
    test("expandByVector", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        a.expandByVector(zero3);
        ok(a.size().equals(zero3), "Passed!");
        a.expandByVector(one3);
        ok(a.size().equals(one3.clone().multiplyScalar(2)), "Passed!");
        ok(a.center().equals(zero3), "Passed!");
    });
    test("expandByScalar", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        a.expandByScalar(0);
        ok(a.size().equals(zero3), "Passed!");
        a.expandByScalar(1);
        ok(a.size().equals(one3.clone().multiplyScalar(2)), "Passed!");
        ok(a.center().equals(zero3), "Passed!");
    });
    test("containsPoint", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        ok(a.containsPoint(zero3), "Passed!");
        ok(!a.containsPoint(one3), "Passed!");
        a.expandByScalar(1);
        ok(a.containsPoint(zero3), "Passed!");
        ok(a.containsPoint(one3), "Passed!");
        ok(a.containsPoint(one3.clone().negate()), "Passed!");
    });
    test("containsBox", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(zero3.clone(), one3.clone());
        var c = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.containsBox(a), "Passed!");
        ok(!a.containsBox(b), "Passed!");
        ok(!a.containsBox(c), "Passed!");
        ok(b.containsBox(a), "Passed!");
        ok(c.containsBox(a), "Passed!");
        ok(!b.containsBox(c), "Passed!");
    });
    test("getParameter", function () {
        var a = new THREE.Box3(zero3.clone(), one3.clone());
        var b = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.getParameter(new THREE.Vector3(0, 0, 0)).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        ok(a.getParameter(new THREE.Vector3(1, 1, 1)).equals(new THREE.Vector3(1, 1, 1)), "Passed!");
        ok(b.getParameter(new THREE.Vector3(-1, -1, -1)).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        ok(b.getParameter(new THREE.Vector3(0, 0, 0)).equals(new THREE.Vector3(0.5, 0.5, 0.5)), "Passed!");
        ok(b.getParameter(new THREE.Vector3(1, 1, 1)).equals(new THREE.Vector3(1, 1, 1)), "Passed!");
    });
    test("clampPoint", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.clampPoint(new THREE.Vector3(0, 0, 0)).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        ok(a.clampPoint(new THREE.Vector3(1, 1, 1)).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        ok(a.clampPoint(new THREE.Vector3(-1, -1, -1)).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        ok(b.clampPoint(new THREE.Vector3(2, 2, 2)).equals(new THREE.Vector3(1, 1, 1)), "Passed!");
        ok(b.clampPoint(new THREE.Vector3(1, 1, 1)).equals(new THREE.Vector3(1, 1, 1)), "Passed!");
        ok(b.clampPoint(new THREE.Vector3(0, 0, 0)).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        ok(b.clampPoint(new THREE.Vector3(-1, -1, -1)).equals(new THREE.Vector3(-1, -1, -1)), "Passed!");
        ok(b.clampPoint(new THREE.Vector3(-2, -2, -2)).equals(new THREE.Vector3(-1, -1, -1)), "Passed!");
    });
    test("distanceToPoint", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.distanceToPoint(new THREE.Vector3(0, 0, 0)) == 0, "Passed!");
        ok(a.distanceToPoint(new THREE.Vector3(1, 1, 1)) == Math.sqrt(3), "Passed!");
        ok(a.distanceToPoint(new THREE.Vector3(-1, -1, -1)) == Math.sqrt(3), "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(2, 2, 2)) == Math.sqrt(3), "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(1, 1, 1)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(0, 0, 0)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(-1, -1, -1)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(-2, -2, -2)) == Math.sqrt(3), "Passed!");
    });
    test("distanceToPoint", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.distanceToPoint(new THREE.Vector3(0, 0, 0)) == 0, "Passed!");
        ok(a.distanceToPoint(new THREE.Vector3(1, 1, 1)) == Math.sqrt(3), "Passed!");
        ok(a.distanceToPoint(new THREE.Vector3(-1, -1, -1)) == Math.sqrt(3), "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(2, 2, 2)) == Math.sqrt(3), "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(1, 1, 1)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(0, 0, 0)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(-1, -1, -1)) == 0, "Passed!");
        ok(b.distanceToPoint(new THREE.Vector3(-2, -2, -2)) == Math.sqrt(3), "Passed!");
    });
    test("isIntersectionBox", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(zero3.clone(), one3.clone());
        var c = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.isIntersectionBox(a), "Passed!");
        ok(a.isIntersectionBox(b), "Passed!");
        ok(a.isIntersectionBox(c), "Passed!");
        ok(b.isIntersectionBox(a), "Passed!");
        ok(c.isIntersectionBox(a), "Passed!");
        ok(b.isIntersectionBox(c), "Passed!");
        b.translate(new THREE.Vector3(2, 2, 2));
        ok(!a.isIntersectionBox(b), "Passed!");
        ok(!b.isIntersectionBox(a), "Passed!");
        ok(!b.isIntersectionBox(c), "Passed!");
    });
    test("getBoundingSphere", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(zero3.clone(), one3.clone());
        var c = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.getBoundingSphere().equals(new THREE.Sphere(zero3, 0)), "Passed!");
        ok(b.getBoundingSphere().equals(new THREE.Sphere(one3.clone().multiplyScalar(0.5), Math.sqrt(3) * 0.5)), "Passed!");
        ok(c.getBoundingSphere().equals(new THREE.Sphere(zero3, Math.sqrt(12) * 0.5)), "Passed!");
    });
    test("intersect", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(zero3.clone(), one3.clone());
        var c = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.clone().intersect(a).equals(a), "Passed!");
        ok(a.clone().intersect(b).equals(a), "Passed!");
        ok(b.clone().intersect(b).equals(b), "Passed!");
        ok(a.clone().intersect(c).equals(a), "Passed!");
        ok(b.clone().intersect(c).equals(b), "Passed!");
        ok(c.clone().intersect(c).equals(c), "Passed!");
    });
    test("union", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(zero3.clone(), one3.clone());
        var c = new THREE.Box3(one3.clone().negate(), one3.clone());
        ok(a.clone().union(a).equals(a), "Passed!");
        ok(a.clone().union(b).equals(b), "Passed!");
        ok(a.clone().union(c).equals(c), "Passed!");
        ok(b.clone().union(c).equals(c), "Passed!");
    });
    var compareBox = function (a, b, threshold) {
        threshold = threshold || 0.0001;
        return (a.min.distanceTo(b.min) < threshold &&
            a.max.distanceTo(b.max) < threshold);
    };
    test("applyMatrix4", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(zero3.clone(), one3.clone());
        var c = new THREE.Box3(one3.clone().negate(), one3.clone());
        var d = new THREE.Box3(one3.clone().negate(), zero3.clone());
        var m = new THREE.Matrix4().makeTranslation(1, -2, 1);
        var t1 = new THREE.Vector3(1, -2, 1);
        ok(compareBox(a.clone().applyMatrix4(m), a.clone().translate(t1)), "Passed!");
        ok(compareBox(b.clone().applyMatrix4(m), b.clone().translate(t1)), "Passed!");
        ok(compareBox(c.clone().applyMatrix4(m), c.clone().translate(t1)), "Passed!");
        ok(compareBox(d.clone().applyMatrix4(m), d.clone().translate(t1)), "Passed!");
    });
    test("translate", function () {
        var a = new THREE.Box3(zero3.clone(), zero3.clone());
        var b = new THREE.Box3(zero3.clone(), one3.clone());
        var c = new THREE.Box3(one3.clone().negate(), one3.clone());
        var d = new THREE.Box3(one3.clone().negate(), zero3.clone());
        ok(a.clone().translate(one3).equals(new THREE.Box3(one3, one3)), "Passed!");
        ok(a.clone().translate(one3).translate(one3.clone().negate()).equals(a), "Passed!");
        ok(d.clone().translate(one3).equals(b), "Passed!");
        ok(b.clone().translate(one3.clone().negate()).equals(d), "Passed!");
    });
    // -------------------------------------------- Color
    test("constructor", function () {
        var c = new THREE.Color();
        ok(c.r, "Red: " + c.r);
        ok(c.g, "Green: " + c.g);
        ok(c.b, "Blue: " + c.b);
    });
    test("rgb constructor", function () {
        var c = new THREE.Color(1, 1, 1);
        ok(c.r == 1, "Passed");
        ok(c.g == 1, "Passed");
        ok(c.b == 1, "Passed");
    });
    test("copyHex", function () {
        var c = new THREE.Color();
        var c2 = new THREE.Color(0xF5FFFA);
        c.copy(c2);
        ok(c.getHex() == c2.getHex(), "Hex c: " + c.getHex() + " Hex c2: " + c2.getHex());
    });
    test("copyColorString", function () {
        var c = new THREE.Color();
        var c2 = new THREE.Color('ivory');
        c.copy(c2);
        ok(c.getHex() == c2.getHex(), "Hex c: " + c.getHex() + " Hex c2: " + c2.getHex());
    });
    test("setRGB", function () {
        var c = new THREE.Color();
        c.setRGB(1, 0.2, 0.1);
        ok(c.r == 1, "Red: " + c.r);
        ok(c.g == 0.2, "Green: " + c.g);
        ok(c.b == 0.1, "Blue: " + c.b);
    });
    test("copyGammaToLinear", function () {
        var c = new THREE.Color();
        var c2 = new THREE.Color();
        c2.setRGB(0.3, 0.5, 0.9);
        c.copyGammaToLinear(c2);
        ok(c.r == 0.09, "Red c: " + c.r + " Red c2: " + c2.r);
        ok(c.g == 0.25, "Green c: " + c.g + " Green c2: " + c2.g);
        ok(c.b == 0.81, "Blue c: " + c.b + " Blue c2: " + c2.b);
    });
    test("copyLinearToGamma", function () {
        var c = new THREE.Color();
        var c2 = new THREE.Color();
        c2.setRGB(0.09, 0.25, 0.81);
        c.copyLinearToGamma(c2);
        ok(c.r == 0.3, "Red c: " + c.r + " Red c2: " + c2.r);
        ok(c.g == 0.5, "Green c: " + c.g + " Green c2: " + c2.g);
        ok(c.b == 0.9, "Blue c: " + c.b + " Blue c2: " + c2.b);
    });
    test("convertGammaToLinear", function () {
        var c = new THREE.Color();
        c.setRGB(0.3, 0.5, 0.9);
        c.convertGammaToLinear();
        ok(c.r == 0.09, "Red: " + c.r);
        ok(c.g == 0.25, "Green: " + c.g);
        ok(c.b == 0.81, "Blue: " + c.b);
    });
    test("convertLinearToGamma", function () {
        var c = new THREE.Color();
        c.setRGB(4, 9, 16);
        c.convertLinearToGamma();
        ok(c.r == 2, "Red: " + c.r);
        ok(c.g == 3, "Green: " + c.g);
        ok(c.b == 4, "Blue: " + c.b);
    });
    test("setWithNum", function () {
        var c = new THREE.Color();
        c.set(0xFF0000);
        ok(c.r == 1, "Red: " + c.r);
        ok(c.g === 0, "Green: " + c.g);
        ok(c.b === 0, "Blue: " + c.b);
    });
    test("setWithString", function () {
        var c = new THREE.Color();
        c.set('silver');
        ok(c.getHex() == 0xC0C0C0, "Hex c: " + c.getHex());
    });
    test("clone", function () {
        var c = new THREE.Color('teal');
        var c2 = c.clone();
        ok(c2.getHex() == 0x008080, "Hex c2: " + c2.getHex());
    });
    test("lerp", function () {
        var c = new THREE.Color();
        var c2 = new THREE.Color();
        c.setRGB(0, 0, 0);
        c.lerp(c2, 0.2);
        ok(c.r == 0.2, "Red: " + c.r);
        ok(c.g == 0.2, "Green: " + c.g);
        ok(c.b == 0.2, "Blue: " + c.b);
    });
    test("setStyleRGBRed", function () {
        var c = new THREE.Color();
        c.setStyle('rgb(255,0,0)');
        ok(c.r == 1, "Red: " + c.r);
        ok(c.g === 0, "Green: " + c.g);
        ok(c.b === 0, "Blue: " + c.b);
    });
    test("setStyleRGBRedWithSpaces", function () {
        var c = new THREE.Color();
        c.setStyle('rgb(255, 0, 0)');
        ok(c.r == 1, "Red: " + c.r);
        ok(c.g === 0, "Green: " + c.g);
        ok(c.b === 0, "Blue: " + c.b);
    });
    test("setStyleRGBPercent", function () {
        var c = new THREE.Color();
        c.setStyle('rgb(100%,50%,10%)');
        ok(c.r == 1, "Red: " + c.r);
        ok(c.g == 0.5, "Green: " + c.g);
        ok(c.b == 0.1, "Blue: " + c.b);
    });
    test("setStyleRGBPercentWithSpaces", function () {
        var c = new THREE.Color();
        c.setStyle('rgb(100%,50%,10%)');
        ok(c.r == 1, "Red: " + c.r);
        ok(c.g == 0.5, "Green: " + c.g);
        ok(c.b == 0.1, "Blue: " + c.b);
    });
    test("setStyleHexSkyBlue", function () {
        var c = new THREE.Color();
        c.setStyle('#87CEEB');
        ok(c.getHex() == 0x87CEEB, "Hex c: " + c.getHex());
    });
    test("setStyleHex2Olive", function () {
        var c = new THREE.Color();
        c.setStyle('#F00');
        ok(c.getHex() == 0xFF0000, "Hex c: " + c.getHex());
    });
    test("setStyleColorName", function () {
        var c = new THREE.Color();
        c.setStyle('powderblue');
        ok(c.getHex() == 0xB0E0E6, "Hex c: " + c.getHex());
    });
    test("getHex", function () {
        var c = new THREE.Color('red');
        var res = c.getHex();
        ok(res == 0xFF0000, "Hex: " + res);
    });
    test("setHex", function () {
        var c = new THREE.Color();
        c.setHex(0xFA8072);
        ok(c.getHex() == 0xFA8072, "Hex: " + c.getHex());
    });
    test("getHexString", function () {
        var c = new THREE.Color('tomato');
        var res = c.getHexString();
        ok(res == 'ff6347', "Hex: " + res);
    });
    test("getStyle", function () {
        var c = new THREE.Color('plum');
        var res = c.getStyle();
        ok(res == 'rgb(221,160,221)', "style: " + res);
    });
    test("getHSL", function () {
        var c = new THREE.Color(0x80ffff);
        var hsl = c.getHSL();
        ok(hsl.h == 0.5, "hue: " + hsl.h);
        ok(hsl.s == 1.0, "saturation: " + hsl.s);
        ok((Math.round(parseFloat(hsl.l.toString()) * 100) / 100) == 0.75, "lightness: " + hsl.l);
    });
    test("setHSL", function () {
        var c = new THREE.Color();
        c.setHSL(0.75, 1.0, 0.25);
        var hsl = c.getHSL();
        ok(hsl.h == 0.75, "hue: " + hsl.h);
        ok(hsl.s == 1.00, "saturation: " + hsl.s);
        ok(hsl.l == 0.25, "lightness: " + hsl.l);
    });
    // -------------------------------------------- Euler
    var eulerZero = new THREE.Euler(0, 0, 0, "XYZ");
    var eulerAxyz = new THREE.Euler(1, 0, 0, "XYZ");
    var eulerAzyx = new THREE.Euler(0, 1, 0, "ZYX");
    var matrixEquals4 = function (a, b) {
        var tolerance = 0.0001;
        if (a.elements.length != b.elements.length) {
            return false;
        }
        for (var i = 0, il = a.elements.length; i < il; i++) {
            var delta = a.elements[i] - b.elements[i];
            if (delta > tolerance) {
                return false;
            }
        }
        return true;
    };
    var eulerEquals = function (a, b, tolerance) {
        tolerance = tolerance || 0.0001;
        var diff = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
        return (diff < tolerance);
    };
    var quatEquals = function (a, b, tolerance) {
        tolerance = tolerance || 0.0001;
        var diff = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) + Math.abs(a.w - b.w);
        return (diff < tolerance);
    };
    test("constructor/equals", function () {
        var a = new THREE.Euler();
        ok(a.equals(eulerZero), "Passed!");
        ok(!a.equals(eulerAxyz), "Passed!");
        ok(!a.equals(eulerAzyx), "Passed!");
    });
    test("clone/copy/equals", function () {
        var a = eulerAxyz.clone();
        ok(a.equals(eulerAxyz), "Passed!");
        ok(!a.equals(eulerZero), "Passed!");
        ok(!a.equals(eulerAzyx), "Passed!");
        a.copy(eulerAzyx);
        ok(a.equals(eulerAzyx), "Passed!");
        ok(!a.equals(eulerAxyz), "Passed!");
        ok(!a.equals(eulerZero), "Passed!");
    });
    test("set/setFromVector3/toVector3", function () {
        var a = new THREE.Euler();
        a.set(0, 1, 0, "ZYX");
        ok(a.equals(eulerAzyx), "Passed!");
        ok(!a.equals(eulerAxyz), "Passed!");
        ok(!a.equals(eulerZero), "Passed!");
        var vec = new THREE.Vector3(0, 1, 0);
        var b = new THREE.Euler().setFromVector3(vec, "ZYX");
        console.log(a, b);
        ok(a.equals(b), "Passed!");
        var c = b.toVector3();
        console.log(c, vec);
        ok(c.equals(vec), "Passed!");
    });
    test("Quaternion.setFromEuler/Euler.fromQuaternion", function () {
        var testValues = [eulerZero, eulerAxyz, eulerAzyx];
        for (var i = 0; i < testValues.length; i++) {
            var v = testValues[i];
            var q = new THREE.Quaternion().setFromEuler(v);
            var v2 = new THREE.Euler().setFromQuaternion(q, v.order);
            var q2 = new THREE.Quaternion().setFromEuler(v2);
            ok(eulerEquals(q, q2), "Passed!");
        }
    });
    test("Matrix4.setFromEuler/Euler.fromRotationMatrix", function () {
        var testValues = [eulerZero, eulerAxyz, eulerAzyx];
        for (var i = 0; i < testValues.length; i++) {
            var v = testValues[i];
            var m = new THREE.Matrix4().makeRotationFromEuler(v);
            var v2 = new THREE.Euler().setFromRotationMatrix(m, v.order);
            var m2 = new THREE.Matrix4().makeRotationFromEuler(v2);
            ok(matrixEquals4(m, m2), "Passed!");
        }
    });
    test("reorder", function () {
        var testValues = [eulerZero, eulerAxyz, eulerAzyx];
        for (var i = 0; i < testValues.length; i++) {
            var v = testValues[i];
            var q = new THREE.Quaternion().setFromEuler(v);
            v.reorder('YZX');
            var q2 = new THREE.Quaternion().setFromEuler(v);
            ok(quatEquals(q, q2), "Passed!");
            v.reorder('ZXY');
            var q3 = new THREE.Quaternion().setFromEuler(v);
            ok(quatEquals(q, q3), "Passed!");
        }
    });
    test("gimbalLocalQuat", function () {
        // known problematic quaternions
        var q1 = new THREE.Quaternion(0.5207769385244341, -0.4783214164122354, 0.520776938524434, 0.47832141641223547);
        var q2 = new THREE.Quaternion(0.11284905712620674, 0.6980437630368944, -0.11284905712620674, 0.6980437630368944);
        var eulerOrder = "ZYX";
        // create Euler directly from a Quaternion
        var eViaQ1 = new THREE.Euler().setFromQuaternion(q1, eulerOrder); // there is likely a bug here
        // create Euler from Quaternion via an intermediate Matrix4
        var mViaQ1 = new THREE.Matrix4().makeRotationFromQuaternion(q1);
        var eViaMViaQ1 = new THREE.Euler().setFromRotationMatrix(mViaQ1, eulerOrder);
        // the results here are different
        ok(eulerEquals(eViaQ1, eViaMViaQ1), "Passed!"); // this result is correct
    });
    // -------------------------------------------- Frustum
    var unit3 = new THREE.Vector3(1, 0, 0);
    var planeEquals = function (a, b, tolerance) {
        tolerance = tolerance || 0.0001;
        if (a.normal.distanceTo(b.normal) > tolerance) {
            return false;
        }
        if (Math.abs(a.constant - b.constant) > tolerance) {
            return false;
        }
        return true;
    };
    test("constructor", function () {
        var a = new THREE.Frustum();
        ok(a.planes !== undefined, "Passed!");
        ok(a.planes.length === 6, "Passed!");
        var pDefault = new THREE.Plane();
        for (var i = 0; i < 6; i++) {
            ok(a.planes[i].equals(pDefault), "Passed!");
        }
        var p0 = new THREE.Plane(unit3, -1);
        var p1 = new THREE.Plane(unit3, 1);
        var p2 = new THREE.Plane(unit3, 2);
        var p3 = new THREE.Plane(unit3, 3);
        var p4 = new THREE.Plane(unit3, 4);
        var p5 = new THREE.Plane(unit3, 5);
        a = new THREE.Frustum(p0, p1, p2, p3, p4, p5);
        ok(a.planes[0].equals(p0), "Passed!");
        ok(a.planes[1].equals(p1), "Passed!");
        ok(a.planes[2].equals(p2), "Passed!");
        ok(a.planes[3].equals(p3), "Passed!");
        ok(a.planes[4].equals(p4), "Passed!");
        ok(a.planes[5].equals(p5), "Passed!");
    });
    test("copy", function () {
        var p0 = new THREE.Plane(unit3, -1);
        var p1 = new THREE.Plane(unit3, 1);
        var p2 = new THREE.Plane(unit3, 2);
        var p3 = new THREE.Plane(unit3, 3);
        var p4 = new THREE.Plane(unit3, 4);
        var p5 = new THREE.Plane(unit3, 5);
        var b = new THREE.Frustum(p0, p1, p2, p3, p4, p5);
        var a = new THREE.Frustum().copy(b);
        ok(a.planes[0].equals(p0), "Passed!");
        ok(a.planes[1].equals(p1), "Passed!");
        ok(a.planes[2].equals(p2), "Passed!");
        ok(a.planes[3].equals(p3), "Passed!");
        ok(a.planes[4].equals(p4), "Passed!");
        ok(a.planes[5].equals(p5), "Passed!");
        // ensure it is a true copy by modifying source
        b.planes[0] = p1;
        ok(a.planes[0].equals(p0), "Passed!");
    });
    test("setFromMatrix/makeOrthographic/containsPoint", function () {
        var m = new THREE.Matrix4().makeOrthographic(-1, 1, -1, 1, 1, 100);
        var a = new THREE.Frustum().setFromMatrix(m);
        ok(!a.containsPoint(new THREE.Vector3(0, 0, 0)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(0, 0, -50)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(0, 0, -1.001)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(-1, -1, -1.001)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(-1.1, -1.1, -1.001)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(1, 1, -1.001)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(1.1, 1.1, -1.001)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(0, 0, -100)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(-1, -1, -100)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(-1.1, -1.1, -100.1)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(1, 1, -100)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(1.1, 1.1, -100.1)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(0, 0, -101)), "Passed!");
    });
    test("setFromMatrix/makeFrustum/containsPoint", function () {
        var m = new THREE.Matrix4().makeFrustum(-1, 1, -1, 1, 1, 100);
        var a = new THREE.Frustum().setFromMatrix(m);
        ok(!a.containsPoint(new THREE.Vector3(0, 0, 0)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(0, 0, -50)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(0, 0, -1.001)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(-1, -1, -1.001)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(-1.1, -1.1, -1.001)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(1, 1, -1.001)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(1.1, 1.1, -1.001)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(0, 0, -99.999)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(-99.999, -99.999, -99.999)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(-100.1, -100.1, -100.1)), "Passed!");
        ok(a.containsPoint(new THREE.Vector3(99.999, 99.999, -99.999)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(100.1, 100.1, -100.1)), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(0, 0, -101)), "Passed!");
    });
    test("setFromMatrix/makeFrustum/intersectsSphere", function () {
        var m = new THREE.Matrix4().makeFrustum(-1, 1, -1, 1, 1, 100);
        var a = new THREE.Frustum().setFromMatrix(m);
        ok(!a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(0, 0, 0), 0)), "Passed!");
        ok(!a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(0, 0, 0), 0.9)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1.1)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(0, 0, -50), 0)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(0, 0, -1.001), 0)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(-1, -1, -1.001), 0)), "Passed!");
        ok(!a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(-1.1, -1.1, -1.001), 0)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(-1.1, -1.1, -1.001), 0.5)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(1, 1, -1.001), 0)), "Passed!");
        ok(!a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(1.1, 1.1, -1.001), 0)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(1.1, 1.1, -1.001), 0.5)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(0, 0, -99.999), 0)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(-99.999, -99.999, -99.999), 0)), "Passed!");
        ok(!a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(-100.1, -100.1, -100.1), 0)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(-100.1, -100.1, -100.1), 0.5)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(99.999, 99.999, -99.999), 0)), "Passed!");
        ok(!a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(100.1, 100.1, -100.1), 0)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(100.1, 100.1, -100.1), 0.2)), "Passed!");
        ok(!a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(0, 0, -101), 0)), "Passed!");
        ok(a.intersectsSphere(new THREE.Sphere(new THREE.Vector3(0, 0, -101), 1.1)), "Passed!");
    });
    test("clone", function () {
        var p0 = new THREE.Plane(unit3, -1);
        var p1 = new THREE.Plane(unit3, 1);
        var p2 = new THREE.Plane(unit3, 2);
        var p3 = new THREE.Plane(unit3, 3);
        var p4 = new THREE.Plane(unit3, 4);
        var p5 = new THREE.Plane(unit3, 5);
        var b = new THREE.Frustum(p0, p1, p2, p3, p4, p5);
        var a = b.clone();
        ok(a.planes[0].equals(p0), "Passed!");
        ok(a.planes[1].equals(p1), "Passed!");
        ok(a.planes[2].equals(p2), "Passed!");
        ok(a.planes[3].equals(p3), "Passed!");
        ok(a.planes[4].equals(p4), "Passed!");
        ok(a.planes[5].equals(p5), "Passed!");
        // ensure it is a true copy by modifying source
        a.planes[0].copy(p1);
        ok(b.planes[0].equals(p0), "Passed!");
    });
    // -------------------------------------------- Line3
    test("constructor/equals", function () {
        var a = new THREE.Line3();
        ok(a.start.equals(zero3), "Passed!");
        ok(a.end.equals(zero3), "Passed!");
        a = new THREE.Line3(two3.clone(), one3.clone());
        ok(a.start.equals(two3), "Passed!");
        ok(a.end.equals(one3), "Passed!");
    });
    test("copy/equals", function () {
        var a = new THREE.Line3(zero3.clone(), one3.clone());
        var b = new THREE.Line3().copy(a);
        ok(b.start.equals(zero3), "Passed!");
        ok(b.end.equals(one3), "Passed!");
        // ensure that it is a true copy
        a.start = zero3;
        a.end = one3;
        ok(b.start.equals(zero3), "Passed!");
        ok(b.end.equals(one3), "Passed!");
    });
    test("set", function () {
        var a = new THREE.Line3();
        a.set(one3, one3);
        ok(a.start.equals(one3), "Passed!");
        ok(a.end.equals(one3), "Passed!");
    });
    test("at", function () {
        var a = new THREE.Line3(one3.clone(), new THREE.Vector3(1, 1, 2));
        ok(a.at(-1).distanceTo(new THREE.Vector3(1, 1, 0)) < 0.0001, "Passed!");
        ok(a.at(0).distanceTo(one3.clone()) < 0.0001, "Passed!");
        ok(a.at(1).distanceTo(new THREE.Vector3(1, 1, 2)) < 0.0001, "Passed!");
        ok(a.at(2).distanceTo(new THREE.Vector3(1, 1, 3)) < 0.0001, "Passed!");
    });
    test("closestPointToPoint/closestPointToPointParameter", function () {
        var a = new THREE.Line3(one3.clone(), new THREE.Vector3(1, 1, 2));
        // nearby the ray
        ok(a.closestPointToPointParameter(zero3.clone(), true) == 0, "Passed!");
        var b1 = a.closestPointToPoint(zero3.clone(), true);
        ok(b1.distanceTo(new THREE.Vector3(1, 1, 1)) < 0.0001, "Passed!");
        // nearby the ray
        ok(a.closestPointToPointParameter(zero3.clone(), false) == -1, "Passed!");
        var b2 = a.closestPointToPoint(zero3.clone(), false);
        ok(b2.distanceTo(new THREE.Vector3(1, 1, 0)) < 0.0001, "Passed!");
        // nearby the ray
        ok(a.closestPointToPointParameter(new THREE.Vector3(1, 1, 5), true) == 1, "Passed!");
        var b = a.closestPointToPoint(new THREE.Vector3(1, 1, 5), true);
        ok(b.distanceTo(new THREE.Vector3(1, 1, 2)) < 0.0001, "Passed!");
        // exactly on the ray
        ok(a.closestPointToPointParameter(one3.clone(), true) == 0, "Passed!");
        var c = a.closestPointToPoint(one3.clone(), true);
        ok(c.distanceTo(one3.clone()) < 0.0001, "Passed!");
    });
    // -------------------------------------------- Matrix3
    var matrixEquals3 = function (a, b, tolerance) {
        tolerance = tolerance || 0.0001;
        if (a.elements.length != b.elements.length) {
            return false;
        }
        for (var i = 0, il = a.elements.length; i < il; i++) {
            var delta = a.elements[i] - b.elements[i];
            if (delta > tolerance) {
                return false;
            }
        }
        return true;
    };
    var toMatrix4 = function (m3) {
        var result = new THREE.Matrix4();
        var re = result.elements;
        var me = m3.elements;
        re[0] = me[0];
        re[1] = me[1];
        re[2] = me[2];
        re[4] = me[3];
        re[5] = me[4];
        re[6] = me[5];
        re[8] = me[6];
        re[9] = me[7];
        re[10] = me[8];
        return result;
    };
    test("constructor", function () {
        var a = new THREE.Matrix3();
        ok(a.determinant() == 1, "Passed!");
        var b = new THREE.Matrix3(0, 1, 2, 3, 4, 5, 6, 7, 8);
        ok(b.elements[0] == 0);
        ok(b.elements[1] == 3);
        ok(b.elements[2] == 6);
        ok(b.elements[3] == 1);
        ok(b.elements[4] == 4);
        ok(b.elements[5] == 7);
        ok(b.elements[6] == 2);
        ok(b.elements[7] == 5);
        ok(b.elements[8] == 8);
        ok(!matrixEquals3(a, b), "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Matrix3(0, 1, 2, 3, 4, 5, 6, 7, 8);
        var b = new THREE.Matrix3().copy(a);
        ok(matrixEquals3(a, b), "Passed!");
        // ensure that it is a true copy
        a.elements[0] = 2;
        ok(!matrixEquals3(a, b), "Passed!");
    });
    test("set", function () {
        var b = new THREE.Matrix3();
        ok(b.determinant() == 1, "Passed!");
        b.set(0, 1, 2, 3, 4, 5, 6, 7, 8);
        ok(b.elements[0] == 0);
        ok(b.elements[1] == 3);
        ok(b.elements[2] == 6);
        ok(b.elements[3] == 1);
        ok(b.elements[4] == 4);
        ok(b.elements[5] == 7);
        ok(b.elements[6] == 2);
        ok(b.elements[7] == 5);
        ok(b.elements[8] == 8);
    });
    test("identity", function () {
        var b = new THREE.Matrix3(0, 1, 2, 3, 4, 5, 6, 7, 8);
        ok(b.elements[0] == 0);
        ok(b.elements[1] == 3);
        ok(b.elements[2] == 6);
        ok(b.elements[3] == 1);
        ok(b.elements[4] == 4);
        ok(b.elements[5] == 7);
        ok(b.elements[6] == 2);
        ok(b.elements[7] == 5);
        ok(b.elements[8] == 8);
        var a = new THREE.Matrix3();
        ok(!matrixEquals3(a, b), "Passed!");
        b.identity();
        ok(matrixEquals3(a, b), "Passed!");
    });
    test("multiplyScalar", function () {
        var b = new THREE.Matrix3(0, 1, 2, 3, 4, 5, 6, 7, 8);
        ok(b.elements[0] == 0);
        ok(b.elements[1] == 3);
        ok(b.elements[2] == 6);
        ok(b.elements[3] == 1);
        ok(b.elements[4] == 4);
        ok(b.elements[5] == 7);
        ok(b.elements[6] == 2);
        ok(b.elements[7] == 5);
        ok(b.elements[8] == 8);
        b.multiplyScalar(2);
        ok(b.elements[0] == 0 * 2);
        ok(b.elements[1] == 3 * 2);
        ok(b.elements[2] == 6 * 2);
        ok(b.elements[3] == 1 * 2);
        ok(b.elements[4] == 4 * 2);
        ok(b.elements[5] == 7 * 2);
        ok(b.elements[6] == 2 * 2);
        ok(b.elements[7] == 5 * 2);
        ok(b.elements[8] == 8 * 2);
    });
    test("determinant", function () {
        var a = new THREE.Matrix3();
        ok(a.determinant() == 1, "Passed!");
        a.elements[0] = 2;
        ok(a.determinant() == 2, "Passed!");
        a.elements[0] = 0;
        ok(a.determinant() == 0, "Passed!");
        // calculated via http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/threeD/index.htm
        a.set(2, 3, 4, 5, 13, 7, 8, 9, 11);
        ok(a.determinant() == -73, "Passed!");
    });
    test("getInverse", function () {
        var identity = new THREE.Matrix4();
        var a = new THREE.Matrix4();
        var b = new THREE.Matrix3(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var c = new THREE.Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0);
        ok(!matrixEquals3(a, b), "Passed!");
        b.getInverse(a, false);
        ok(matrixEquals3(b, new THREE.Matrix3()), "Passed!");
        try {
            b.getInverse(c, true);
            ok(false, "Passed!"); // should never get here.
        }
        catch (err) {
            ok(true, "Passed!");
        }
        var testMatrices = [
            new THREE.Matrix4().makeRotationX(0.3),
            new THREE.Matrix4().makeRotationX(-0.3),
            new THREE.Matrix4().makeRotationY(0.3),
            new THREE.Matrix4().makeRotationY(-0.3),
            new THREE.Matrix4().makeRotationZ(0.3),
            new THREE.Matrix4().makeRotationZ(-0.3),
            new THREE.Matrix4().makeScale(1, 2, 3),
            new THREE.Matrix4().makeScale(1 / 8, 1 / 2, 1 / 3)
        ];
        for (var i = 0, il = testMatrices.length; i < il; i++) {
            var m = testMatrices[i];
            var mInverse3 = new THREE.Matrix3().getInverse(m);
            var mInverse = toMatrix4(mInverse3);
            // the determinant of the inverse should be the reciprocal
            ok(Math.abs(m.determinant() * mInverse3.determinant() - 1) < 0.0001, "Passed!");
            ok(Math.abs(m.determinant() * mInverse.determinant() - 1) < 0.0001, "Passed!");
            var mProduct = new THREE.Matrix4().multiplyMatrices(m, mInverse);
            ok(Math.abs(mProduct.determinant() - 1) < 0.0001, "Passed!");
            ok(matrixEquals3(mProduct, identity), "Passed!");
        }
    });
    test("transpose", function () {
        var a = new THREE.Matrix3();
        var b = a.clone().transpose();
        ok(matrixEquals3(a, b), "Passed!");
        b = new THREE.Matrix3(0, 1, 2, 3, 4, 5, 6, 7, 8);
        var c = b.clone().transpose();
        ok(!matrixEquals3(b, c), "Passed!");
        c.transpose();
        ok(matrixEquals3(b, c), "Passed!");
    });
    test("clone", function () {
        var a = new THREE.Matrix3(0, 1, 2, 3, 4, 5, 6, 7, 8);
        var b = a.clone();
        ok(matrixEquals3(a, b), "Passed!");
        // ensure that it is a true copy
        a.elements[0] = 2;
        ok(!matrixEquals3(a, b), "Passed!");
    });
    // -------------------------------------------- Matrix4
    var matrixEquals4 = function (a, b) {
        var tolerance = 0.0001;
        if (a.elements.length != b.elements.length) {
            return false;
        }
        for (var i = 0, il = a.elements.length; i < il; i++) {
            var delta = a.elements[i] - b.elements[i];
            if (delta > tolerance) {
                return false;
            }
        }
        return true;
    };
    test("constructor", function () {
        var a = new THREE.Matrix4();
        ok(a.determinant() == 1, "Passed!");
        var b = new THREE.Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        ok(b.elements[0] == 0);
        ok(b.elements[1] == 4);
        ok(b.elements[2] == 8);
        ok(b.elements[3] == 12);
        ok(b.elements[4] == 1);
        ok(b.elements[5] == 5);
        ok(b.elements[6] == 9);
        ok(b.elements[7] == 13);
        ok(b.elements[8] == 2);
        ok(b.elements[9] == 6);
        ok(b.elements[10] == 10);
        ok(b.elements[11] == 14);
        ok(b.elements[12] == 3);
        ok(b.elements[13] == 7);
        ok(b.elements[14] == 11);
        ok(b.elements[15] == 15);
        ok(!matrixEquals4(a, b), "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        var b = new THREE.Matrix4().copy(a);
        ok(matrixEquals4(a, b), "Passed!");
        // ensure that it is a true copy
        a.elements[0] = 2;
        ok(!matrixEquals4(a, b), "Passed!");
    });
    test("set", function () {
        var b = new THREE.Matrix4();
        ok(b.determinant() == 1, "Passed!");
        b.set(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        ok(b.elements[0] == 0);
        ok(b.elements[1] == 4);
        ok(b.elements[2] == 8);
        ok(b.elements[3] == 12);
        ok(b.elements[4] == 1);
        ok(b.elements[5] == 5);
        ok(b.elements[6] == 9);
        ok(b.elements[7] == 13);
        ok(b.elements[8] == 2);
        ok(b.elements[9] == 6);
        ok(b.elements[10] == 10);
        ok(b.elements[11] == 14);
        ok(b.elements[12] == 3);
        ok(b.elements[13] == 7);
        ok(b.elements[14] == 11);
        ok(b.elements[15] == 15);
    });
    test("identity", function () {
        var b = new THREE.Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        ok(b.elements[0] == 0);
        ok(b.elements[1] == 4);
        ok(b.elements[2] == 8);
        ok(b.elements[3] == 12);
        ok(b.elements[4] == 1);
        ok(b.elements[5] == 5);
        ok(b.elements[6] == 9);
        ok(b.elements[7] == 13);
        ok(b.elements[8] == 2);
        ok(b.elements[9] == 6);
        ok(b.elements[10] == 10);
        ok(b.elements[11] == 14);
        ok(b.elements[12] == 3);
        ok(b.elements[13] == 7);
        ok(b.elements[14] == 11);
        ok(b.elements[15] == 15);
        var a = new THREE.Matrix4();
        ok(!matrixEquals4(a, b), "Passed!");
        b.identity();
        ok(matrixEquals4(a, b), "Passed!");
    });
    test("multiplyScalar", function () {
        var b = new THREE.Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        ok(b.elements[0] == 0);
        ok(b.elements[1] == 4);
        ok(b.elements[2] == 8);
        ok(b.elements[3] == 12);
        ok(b.elements[4] == 1);
        ok(b.elements[5] == 5);
        ok(b.elements[6] == 9);
        ok(b.elements[7] == 13);
        ok(b.elements[8] == 2);
        ok(b.elements[9] == 6);
        ok(b.elements[10] == 10);
        ok(b.elements[11] == 14);
        ok(b.elements[12] == 3);
        ok(b.elements[13] == 7);
        ok(b.elements[14] == 11);
        ok(b.elements[15] == 15);
        b.multiplyScalar(2);
        ok(b.elements[0] == 0 * 2);
        ok(b.elements[1] == 4 * 2);
        ok(b.elements[2] == 8 * 2);
        ok(b.elements[3] == 12 * 2);
        ok(b.elements[4] == 1 * 2);
        ok(b.elements[5] == 5 * 2);
        ok(b.elements[6] == 9 * 2);
        ok(b.elements[7] == 13 * 2);
        ok(b.elements[8] == 2 * 2);
        ok(b.elements[9] == 6 * 2);
        ok(b.elements[10] == 10 * 2);
        ok(b.elements[11] == 14 * 2);
        ok(b.elements[12] == 3 * 2);
        ok(b.elements[13] == 7 * 2);
        ok(b.elements[14] == 11 * 2);
        ok(b.elements[15] == 15 * 2);
    });
    test("determinant", function () {
        var a = new THREE.Matrix4();
        ok(a.determinant() == 1, "Passed!");
        a.elements[0] = 2;
        ok(a.determinant() == 2, "Passed!");
        a.elements[0] = 0;
        ok(a.determinant() == 0, "Passed!");
        // calculated via http://www.euclideanspace.com/maths/algebra/matrix/functions/determinant/fourD/index.htm
        a.set(2, 3, 4, 5, -1, -21, -3, -4, 6, 7, 8, 10, -8, -9, -10, -12);
        ok(a.determinant() == 76, "Passed!");
    });
    test("getInverse", function () {
        var identity = new THREE.Matrix4();
        var a = new THREE.Matrix4();
        var b = new THREE.Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        var c = new THREE.Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        ok(!matrixEquals4(a, b), "Passed!");
        b.getInverse(a, false);
        ok(matrixEquals4(b, new THREE.Matrix4()), "Passed!");
        try {
            b.getInverse(c, true);
            ok(false, "Passed!"); // should never get here.
        }
        catch (err) {
            ok(true, "Passed!");
        }
        var testMatrices = [
            new THREE.Matrix4().makeRotationX(0.3),
            new THREE.Matrix4().makeRotationX(-0.3),
            new THREE.Matrix4().makeRotationY(0.3),
            new THREE.Matrix4().makeRotationY(-0.3),
            new THREE.Matrix4().makeRotationZ(0.3),
            new THREE.Matrix4().makeRotationZ(-0.3),
            new THREE.Matrix4().makeScale(1, 2, 3),
            new THREE.Matrix4().makeScale(1 / 8, 1 / 2, 1 / 3),
            new THREE.Matrix4().makeFrustum(-1, 1, -1, 1, 1, 1000),
            new THREE.Matrix4().makeFrustum(-16, 16, -9, 9, 0.1, 10000),
            new THREE.Matrix4().makeTranslation(1, 2, 3)
        ];
        for (var i = 0, il = testMatrices.length; i < il; i++) {
            var m = testMatrices[i];
            var mInverse = new THREE.Matrix4().getInverse(m);
            var mSelfInverse = m.clone();
            mSelfInverse.getInverse(mSelfInverse);
            // self-inverse should the same as inverse
            ok(matrixEquals4(mSelfInverse, mInverse), "Passed!");
            // the determinant of the inverse should be the reciprocal
            ok(Math.abs(m.determinant() * mInverse.determinant() - 1) < 0.0001, "Passed!");
            var mProduct = new THREE.Matrix4().multiplyMatrices(m, mInverse);
            // the determinant of the identity matrix is 1
            ok(Math.abs(mProduct.determinant() - 1) < 0.0001, "Passed!");
            ok(matrixEquals4(mProduct, identity), "Passed!");
        }
    });
    test("makeBasis/extractBasis", function () {
        var identityBasis = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
        var a = new THREE.Matrix4().makeBasis(identityBasis[0], identityBasis[1], identityBasis[2]);
        var identity = new THREE.Matrix4();
        ok(matrixEquals4(a, identity), "Passed!");
        var testBases = [[new THREE.Vector3(0, 1, 0), new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0, 1)]];
        for (var i = 0; i < testBases.length; i++) {
            var testBasis = testBases[i];
            var b = new THREE.Matrix4().makeBasis(testBasis[0], testBasis[1], testBasis[2]);
            var outBasis = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
            b.extractBasis(outBasis[0], outBasis[1], outBasis[2]);
            // check what goes in, is what comes out.
            for (var j = 0; j < outBasis.length; j++) {
                console.log(outBasis[j], testBasis[j]);
                ok(outBasis[j].equals(testBasis[j]), "Passed!");
            }
            // get the basis out the hard war
            for (var j = 0; j < identityBasis.length; j++) {
                outBasis[j].copy(identityBasis[j]);
                outBasis[j].applyMatrix4(b);
            }
            // did the multiply method of basis extraction work?
            for (var j = 0; j < outBasis.length; j++) {
                ok(outBasis[j].equals(testBasis[j]), "Passed!");
            }
        }
    });
    test("transpose", function () {
        var a = new THREE.Matrix4();
        var b = a.clone().transpose();
        ok(matrixEquals4(a, b), "Passed!");
        b = new THREE.Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        var c = b.clone().transpose();
        ok(!matrixEquals4(b, c), "Passed!");
        c.transpose();
        ok(matrixEquals4(b, c), "Passed!");
    });
    test("clone", function () {
        var a = new THREE.Matrix4(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        var b = a.clone();
        ok(matrixEquals4(a, b), "Passed!");
        // ensure that it is a true copy
        a.elements[0] = 2;
        ok(!matrixEquals4(a, b), "Passed!");
    });
    test("compose/decompose", function () {
        var tValues = [
            new THREE.Vector3(),
            new THREE.Vector3(3, 0, 0),
            new THREE.Vector3(0, 4, 0),
            new THREE.Vector3(0, 0, 5),
            new THREE.Vector3(-6, 0, 0),
            new THREE.Vector3(0, -7, 0),
            new THREE.Vector3(0, 0, -8),
            new THREE.Vector3(-2, 5, -9),
            new THREE.Vector3(-2, -5, -9)
        ];
        var sValues = [
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(1, -1, 1),
            new THREE.Vector3(-1, 1, 1),
            new THREE.Vector3(1, 1, -1),
            new THREE.Vector3(2, -2, 1),
            new THREE.Vector3(-1, 2, -2),
            new THREE.Vector3(-1, -1, -1),
            new THREE.Vector3(-2, -2, -2)
        ];
        var rValues = [
            new THREE.Quaternion(),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(1, 1, 0)),
            new THREE.Quaternion().setFromEuler(new THREE.Euler(1, -1, 1)),
            new THREE.Quaternion(0, 0.9238795292366128, 0, 0.38268342717215614)
        ];
        for (var ti = 0; ti < tValues.length; ti++) {
            for (var si = 0; si < sValues.length; si++) {
                for (var ri = 0; ri < rValues.length; ri++) {
                    var t = tValues[ti];
                    var s = sValues[si];
                    var r = rValues[ri];
                    var m = new THREE.Matrix4().compose(t, r, s);
                    var t2 = new THREE.Vector3();
                    var r2 = new THREE.Quaternion();
                    var s2 = new THREE.Vector3();
                    m.decompose(t2, r2, s2);
                    var m2 = new THREE.Matrix4().compose(t2, r2, s2);
                    var matrixIsSame = matrixEquals4(m, m2);
                    /* debug code
                     if( ! matrixIsSame ) {
                     console.log( t, s, r );
                     console.log( t2, s2, r2 );
                     console.log( m, m2 );
                     }*/
                    ok(matrixEquals4(m, m2), "Passed!");
                }
            }
        }
    });
    // -------------------------------------------- Plane
    var comparePlane = function (a, b, threshold) {
        threshold = threshold || 0.0001;
        return (a.normal.distanceTo(b.normal) < threshold &&
            Math.abs(a.constant - b.constant) < threshold);
    };
    test("constructor", function () {
        var a = new THREE.Plane();
        ok(a.normal.x == 1, "Passed!");
        ok(a.normal.y == 0, "Passed!");
        ok(a.normal.z == 0, "Passed!");
        ok(a.constant == 0, "Passed!");
        a = new THREE.Plane(one3.clone(), 0);
        ok(a.normal.x == 1, "Passed!");
        ok(a.normal.y == 1, "Passed!");
        ok(a.normal.z == 1, "Passed!");
        ok(a.constant == 0, "Passed!");
        a = new THREE.Plane(one3.clone(), 1);
        ok(a.normal.x == 1, "Passed!");
        ok(a.normal.y == 1, "Passed!");
        ok(a.normal.z == 1, "Passed!");
        ok(a.constant == 1, "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Plane(new THREE.Vector3(x, y, z), w);
        var b = new THREE.Plane().copy(a);
        ok(b.normal.x == x, "Passed!");
        ok(b.normal.y == y, "Passed!");
        ok(b.normal.z == z, "Passed!");
        ok(b.constant == w, "Passed!");
        // ensure that it is a true copy
        a.normal.x = 0;
        a.normal.y = -1;
        a.normal.z = -2;
        a.constant = -3;
        ok(b.normal.x == x, "Passed!");
        ok(b.normal.y == y, "Passed!");
        ok(b.normal.z == z, "Passed!");
        ok(b.constant == w, "Passed!");
    });
    test("set", function () {
        var a = new THREE.Plane();
        ok(a.normal.x == 1, "Passed!");
        ok(a.normal.y == 0, "Passed!");
        ok(a.normal.z == 0, "Passed!");
        ok(a.constant == 0, "Passed!");
        var b = a.clone().set(new THREE.Vector3(x, y, z), w);
        ok(b.normal.x == x, "Passed!");
        ok(b.normal.y == y, "Passed!");
        ok(b.normal.z == z, "Passed!");
        ok(b.constant == w, "Passed!");
    });
    test("setComponents", function () {
        var a = new THREE.Plane();
        ok(a.normal.x == 1, "Passed!");
        ok(a.normal.y == 0, "Passed!");
        ok(a.normal.z == 0, "Passed!");
        ok(a.constant == 0, "Passed!");
        var b = a.clone().setComponents(x, y, z, w);
        ok(b.normal.x == x, "Passed!");
        ok(b.normal.y == y, "Passed!");
        ok(b.normal.z == z, "Passed!");
        ok(b.constant == w, "Passed!");
    });
    test("setFromNormalAndCoplanarPoint", function () {
        var normal = one3.clone().normalize();
        var a = new THREE.Plane().setFromNormalAndCoplanarPoint(normal, zero3);
        ok(a.normal.equals(normal), "Passed!");
        ok(a.constant == 0, "Passed!");
    });
    test("normalize", function () {
        var a = new THREE.Plane(new THREE.Vector3(2, 0, 0), 2);
        a.normalize();
        ok(a.normal.length() == 1, "Passed!");
        ok(a.normal.equals(new THREE.Vector3(1, 0, 0)), "Passed!");
        ok(a.constant == 1, "Passed!");
    });
    test("negate/distanceToPoint", function () {
        var a = new THREE.Plane(new THREE.Vector3(2, 0, 0), -2);
        a.normalize();
        ok(a.distanceToPoint(new THREE.Vector3(4, 0, 0)) === 3, "Passed!");
        ok(a.distanceToPoint(new THREE.Vector3(1, 0, 0)) === 0, "Passed!");
        a.negate();
        ok(a.distanceToPoint(new THREE.Vector3(4, 0, 0)) === -3, "Passed!");
        ok(a.distanceToPoint(new THREE.Vector3(1, 0, 0)) === 0, "Passed!");
    });
    test("distanceToPoint", function () {
        var a = new THREE.Plane(new THREE.Vector3(2, 0, 0), -2);
        a.normalize();
        ok(a.distanceToPoint(a.projectPoint(zero3.clone())) === 0, "Passed!");
        ok(a.distanceToPoint(new THREE.Vector3(4, 0, 0)) === 3, "Passed!");
    });
    test("distanceToSphere", function () {
        var a = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        var b = new THREE.Sphere(new THREE.Vector3(2, 0, 0), 1);
        ok(a.distanceToSphere(b) === 1, "Passed!");
        a.set(new THREE.Vector3(1, 0, 0), 2);
        ok(a.distanceToSphere(b) === 3, "Passed!");
        a.set(new THREE.Vector3(1, 0, 0), -2);
        ok(a.distanceToSphere(b) === -1, "Passed!");
    });
    test("isInterestionLine/intersectLine", function () {
        var a = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        var l1 = new THREE.Line3(new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0));
        ok(a.isIntersectionLine(l1), "Passed!");
        ok(a.intersectLine(l1).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        a = new THREE.Plane(new THREE.Vector3(1, 0, 0), -3);
        ok(a.isIntersectionLine(l1), "Passed!");
        ok(a.intersectLine(l1).equals(new THREE.Vector3(3, 0, 0)), "Passed!");
        a = new THREE.Plane(new THREE.Vector3(1, 0, 0), -11);
        ok(!a.isIntersectionLine(l1), "Passed!");
        ok(a.intersectLine(l1) === undefined, "Passed!");
        a = new THREE.Plane(new THREE.Vector3(1, 0, 0), 11);
        ok(!a.isIntersectionLine(l1), "Passed!");
        ok(a.intersectLine(l1) === undefined, "Passed!");
    });
    test("projectPoint", function () {
        var a = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        ok(a.projectPoint(new THREE.Vector3(10, 0, 0)).equals(zero3), "Passed!");
        ok(a.projectPoint(new THREE.Vector3(-10, 0, 0)).equals(zero3), "Passed!");
        a = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1);
        ok(a.projectPoint(new THREE.Vector3(0, 0, 0)).equals(new THREE.Vector3(0, 1, 0)), "Passed!");
        ok(a.projectPoint(new THREE.Vector3(0, 1, 0)).equals(new THREE.Vector3(0, 1, 0)), "Passed!");
    });
    test("orthoPoint", function () {
        var a = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        ok(a.orthoPoint(new THREE.Vector3(10, 0, 0)).equals(new THREE.Vector3(10, 0, 0)), "Passed!");
        ok(a.orthoPoint(new THREE.Vector3(-10, 0, 0)).equals(new THREE.Vector3(-10, 0, 0)), "Passed!");
    });
    test("coplanarPoint", function () {
        var a = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        ok(a.distanceToPoint(a.coplanarPoint()) === 0, "Passed!");
        a = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1);
        ok(a.distanceToPoint(a.coplanarPoint()) === 0, "Passed!");
    });
    test("applyMatrix4/translate", function () {
        var a = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
        var m = new THREE.Matrix4();
        m.makeRotationZ(Math.PI * 0.5);
        ok(comparePlane(a.clone().applyMatrix4(m), new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)), "Passed!");
        a = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1);
        ok(comparePlane(a.clone().applyMatrix4(m), new THREE.Plane(new THREE.Vector3(-1, 0, 0), -1)), "Passed!");
        m.makeTranslation(1, 1, 1);
        ok(comparePlane(a.clone().applyMatrix4(m), a.clone().translate(new THREE.Vector3(1, 1, 1))), "Passed!");
    });
    // -------------------------------------------- Quaternion
    var orders = ['XYZ', 'YXZ', 'ZXY', 'ZYX', 'YZX', 'XZY'];
    var eulerAngles = new THREE.Euler(0.1, -0.3, 0.25);
    var qSub = function (a, b) {
        var result = new THREE.Quaternion();
        result.copy(a);
        result.x -= b.x;
        result.y -= b.y;
        result.z -= b.z;
        result.w -= b.w;
        return result;
    };
    test("constructor", function () {
        var a = new THREE.Quaternion();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        ok(a.w == 1, "Passed!");
        a = new THREE.Quaternion(x, y, z, w);
        ok(a.x === x, "Passed!");
        ok(a.y === y, "Passed!");
        ok(a.z === z, "Passed!");
        ok(a.w === w, "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Quaternion(x, y, z, w);
        var b = new THREE.Quaternion().copy(a);
        ok(b.x == x, "Passed!");
        ok(b.y == y, "Passed!");
        ok(b.z == z, "Passed!");
        ok(b.w == w, "Passed!");
        // ensure that it is a true copy
        a.x = 0;
        a.y = -1;
        a.z = 0;
        a.w = -1;
        ok(b.x == x, "Passed!");
        ok(b.y == y, "Passed!");
    });
    test("set", function () {
        var a = new THREE.Quaternion();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        ok(a.w == 1, "Passed!");
        a.set(x, y, z, w);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
        ok(a.z === z, "Passed!");
        ok(a.w === w, "Passed!");
    });
    test("setFromAxisAngle", function () {
        // TODO: find cases to validate.
        ok(true, "Passed!");
        var zero = new THREE.Quaternion();
        var a = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0);
        ok(a.equals(zero), "Passed!");
        a = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0);
        ok(a.equals(zero), "Passed!");
        a = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0);
        ok(a.equals(zero), "Passed!");
        var b1 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
        ok(!a.equals(b1), "Passed!");
        var b2 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI);
        ok(!a.equals(b2), "Passed!");
        b1.multiply(b2);
        ok(a.equals(b1), "Passed!");
    });
    test("setFromEuler/setFromQuaternion", function () {
        var angles = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
        // ensure euler conversion to/from Quaternion matches.
        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < angles.length; j++) {
                var eulers2 = new THREE.Euler().setFromQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(angles[j].x, angles[j].y, angles[j].z, orders[i])), orders[i]);
                var newAngle = new THREE.Vector3(eulers2.x, eulers2.y, eulers2.z);
                ok(newAngle.distanceTo(angles[j]) < 0.001, "Passed!");
            }
        }
    });
    test("setFromEuler/setFromRotationMatrix", function () {
        // ensure euler conversion for Quaternion matches that of Matrix4
        for (var i = 0; i < orders.length; i++) {
            var q = new THREE.Quaternion().setFromEuler(eulerAngles, false);
            var m = new THREE.Matrix4().makeRotationFromEuler(eulerAngles);
            var q2 = new THREE.Quaternion().setFromRotationMatrix(m);
            ok(qSub(q, q2).length() < 0.001, "Passed!");
        }
    });
    test("normalize/length/lengthSq", function () {
        var a = new THREE.Quaternion(x, y, z, w);
        var b = new THREE.Quaternion(-x, -y, -z, -w);
        ok(a.length() != 1, "Passed!");
        ok(a.lengthSq() != 1, "Passed!");
        a.normalize();
        ok(a.length() == 1, "Passed!");
        ok(a.lengthSq() == 1, "Passed!");
        a.set(0, 0, 0, 0);
        ok(a.lengthSq() == 0, "Passed!");
        ok(a.length() == 0, "Passed!");
        a.normalize();
        ok(a.lengthSq() == 1, "Passed!");
        ok(a.length() == 1, "Passed!");
    });
    test("inverse/conjugate", function () {
        var a = new THREE.Quaternion(x, y, z, w);
        // TODO: add better validation here.
        var b = a.clone().conjugate();
        ok(a.x == -b.x, "Passed!");
        ok(a.y == -b.y, "Passed!");
        ok(a.z == -b.z, "Passed!");
        ok(a.w == b.w, "Passed!");
    });
    test("multiplyQuaternions/multiply", function () {
        var angles = [new THREE.Euler(1, 0, 0), new THREE.Euler(0, 1, 0), new THREE.Euler(0, 0, 1)];
        var q1 = new THREE.Quaternion().setFromEuler(angles[0], false);
        var q2 = new THREE.Quaternion().setFromEuler(angles[1], false);
        var q3 = new THREE.Quaternion().setFromEuler(angles[2], false);
        var q = new THREE.Quaternion().multiplyQuaternions(q1, q2).multiply(q3);
        var m1 = new THREE.Matrix4().makeRotationFromEuler(angles[0]);
        var m2 = new THREE.Matrix4().makeRotationFromEuler(angles[1]);
        var m3 = new THREE.Matrix4().makeRotationFromEuler(angles[2]);
        var m = new THREE.Matrix4().multiplyMatrices(m1, m2).multiply(m3);
        var qFromM = new THREE.Quaternion().setFromRotationMatrix(m);
        ok(qSub(q, qFromM).length() < 0.001, "Passed!");
    });
    test("multiplyVector3", function () {
        var angles = [new THREE.Euler(1, 0, 0), new THREE.Euler(0, 1, 0), new THREE.Euler(0, 0, 1)];
        // ensure euler conversion for Quaternion matches that of Matrix4
        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < angles.length; j++) {
                var q = new THREE.Quaternion().setFromEuler(angles[j], false);
                var m = new THREE.Matrix4().makeRotationFromEuler(angles[j]);
                var v0 = new THREE.Vector3(1, 0, 0);
                var qv = v0.clone().applyQuaternion(q);
                var mv = v0.clone().applyMatrix4(m);
                ok(qv.distanceTo(mv) < 0.001, "Passed!");
            }
        }
    });
    test("equals", function () {
        var a = new THREE.Quaternion(x, y, z, w);
        var b = new THREE.Quaternion(-x, -y, -z, -w);
        ok(a.x != b.x, "Passed!");
        ok(a.y != b.y, "Passed!");
        ok(!a.equals(b), "Passed!");
        ok(!b.equals(a), "Passed!");
        a.copy(b);
        ok(a.x == b.x, "Passed!");
        ok(a.y == b.y, "Passed!");
        ok(a.equals(b), "Passed!");
        ok(b.equals(a), "Passed!");
    });
    // -------------------------------------------- Ray
    test("constructor/equals", function () {
        var a = new THREE.Ray();
        ok(a.origin.equals(zero3), "Passed!");
        ok(a.direction.equals(zero3), "Passed!");
        a = new THREE.Ray(two3.clone(), one3.clone());
        ok(a.origin.equals(two3), "Passed!");
        ok(a.direction.equals(one3), "Passed!");
    });
    test("copy/equals", function () {
        var a = new THREE.Ray(zero3.clone(), one3.clone());
        var b = new THREE.Ray().copy(a);
        ok(b.origin.equals(zero3), "Passed!");
        ok(b.direction.equals(one3), "Passed!");
        // ensure that it is a true copy
        a.origin = zero3;
        a.direction = one3;
        ok(b.origin.equals(zero3), "Passed!");
        ok(b.direction.equals(one3), "Passed!");
    });
    test("set", function () {
        var a = new THREE.Ray();
        a.set(one3, one3);
        ok(a.origin.equals(one3), "Passed!");
        ok(a.direction.equals(one3), "Passed!");
    });
    test("at", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        ok(a.at(0).equals(one3), "Passed!");
        ok(a.at(-1).equals(new THREE.Vector3(1, 1, 0)), "Passed!");
        ok(a.at(1).equals(new THREE.Vector3(1, 1, 2)), "Passed!");
    });
    test("recast/clone", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        ok(a.recast(0).equals(a), "Passed!");
        var b = a.clone();
        ok(b.recast(-1).equals(new THREE.Ray(new THREE.Vector3(1, 1, 0), new THREE.Vector3(0, 0, 1))), "Passed!");
        var c = a.clone();
        ok(c.recast(1).equals(new THREE.Ray(new THREE.Vector3(1, 1, 2), new THREE.Vector3(0, 0, 1))), "Passed!");
        var d = a.clone();
        var e = d.clone().recast(1);
        ok(d.equals(a), "Passed!");
        ok(!e.equals(d), "Passed!");
        ok(e.equals(c), "Passed!");
    });
    test("closestPointToPoint", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        // behind the ray
        var b = a.closestPointToPoint(zero3);
        ok(b.equals(one3), "Passed!");
        // front of the ray
        var c = a.closestPointToPoint(new THREE.Vector3(0, 0, 50));
        ok(c.equals(new THREE.Vector3(1, 1, 50)), "Passed!");
        // exactly on the ray
        var d = a.closestPointToPoint(one3);
        ok(d.equals(one3), "Passed!");
    });
    test("distanceToPoint", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        // behind the ray
        var b = a.distanceToPoint(zero3);
        ok(b === Math.sqrt(3), "Passed!");
        // front of the ray
        var c = a.distanceToPoint(new THREE.Vector3(0, 0, 50));
        ok(c === Math.sqrt(2), "Passed!");
        // exactly on the ray
        var d = a.distanceToPoint(one3);
        ok(d === 0, "Passed!");
    });
    test("isIntersectionSphere", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        var b = new THREE.Sphere(zero3, 0.5);
        var c = new THREE.Sphere(zero3, 1.5);
        var d = new THREE.Sphere(one3, 0.1);
        var e = new THREE.Sphere(two3, 0.1);
        var f = new THREE.Sphere(two3, 1);
        ok(!a.isIntersectionSphere(b), "Passed!");
        ok(!a.isIntersectionSphere(c), "Passed!");
        ok(a.isIntersectionSphere(d), "Passed!");
        ok(!a.isIntersectionSphere(e), "Passed!");
        ok(!a.isIntersectionSphere(f), "Passed!");
    });
    test("intersectSphere", function () {
        var TOL = 0.0001;
        // ray a0 origin located at ( 0, 0, 0 ) and points outward in negative-z direction
        var a0 = new THREE.Ray(zero3.clone(), new THREE.Vector3(0, 0, -1));
        // ray a1 origin located at ( 1, 1, 1 ) and points left in negative-x direction
        var a1 = new THREE.Ray(one3.clone(), new THREE.Vector3(-1, 0, 0));
        // sphere (radius of 2) located behind ray a0, should result in null
        var b = new THREE.Sphere(new THREE.Vector3(0, 0, 3), 2);
        ok(a0.intersectSphere(b) === null, "Passed!");
        // sphere (radius of 2) located in front of, but too far right of ray a0, should result in null
        var b = new THREE.Sphere(new THREE.Vector3(3, 0, -1), 2);
        ok(a0.intersectSphere(b) === null, "Passed!");
        // sphere (radius of 2) located below ray a1, should result in null
        var b = new THREE.Sphere(new THREE.Vector3(1, -2, 1), 2);
        ok(a1.intersectSphere(b) === null, "Passed!");
        // sphere (radius of 1) located to the left of ray a1, should result in intersection at 0, 1, 1
        var b = new THREE.Sphere(new THREE.Vector3(-1, 1, 1), 1);
        ok(a1.intersectSphere(b).distanceTo(new THREE.Vector3(0, 1, 1)) < TOL, "Passed!");
        // sphere (radius of 1) located in front of ray a0, should result in intersection at 0, 0, -1
        var b = new THREE.Sphere(new THREE.Vector3(0, 0, -2), 1);
        ok(a0.intersectSphere(b).distanceTo(new THREE.Vector3(0, 0, -1)) < TOL, "Passed!");
        // sphere (radius of 2) located in front & right of ray a0, should result in intersection at 0, 0, -1, or left-most edge of sphere
        var b = new THREE.Sphere(new THREE.Vector3(2, 0, -1), 2);
        ok(a0.intersectSphere(b).distanceTo(new THREE.Vector3(0, 0, -1)) < TOL, "Passed!");
        // same situation as above, but move the sphere a fraction more to the right, and ray a0 should now just miss
        var b = new THREE.Sphere(new THREE.Vector3(2.01, 0, -1), 2);
        ok(a0.intersectSphere(b) === null, "Passed!");
        // following tests are for situations where the ray origin is inside the sphere
        // sphere (radius of 1) center located at ray a0 origin / sphere surrounds the ray origin, so the first intersect point 0, 0, 1,
        // is behind ray a0.  Therefore, second exit point on back of sphere will be returned: 0, 0, -1
        // thus keeping the intersection point always in front of the ray.
        var b = new THREE.Sphere(zero3.clone(), 1);
        ok(a0.intersectSphere(b).distanceTo(new THREE.Vector3(0, 0, -1)) < TOL, "Passed!");
        // sphere (radius of 4) center located behind ray a0 origin / sphere surrounds the ray origin, so the first intersect point 0, 0, 5,
        // is behind ray a0.  Therefore, second exit point on back of sphere will be returned: 0, 0, -3
        // thus keeping the intersection point always in front of the ray.
        var b = new THREE.Sphere(new THREE.Vector3(0, 0, 1), 4);
        ok(a0.intersectSphere(b).distanceTo(new THREE.Vector3(0, 0, -3)) < TOL, "Passed!");
        // sphere (radius of 4) center located in front of ray a0 origin / sphere surrounds the ray origin, so the first intersect point 0, 0, 3,
        // is behind ray a0.  Therefore, second exit point on back of sphere will be returned: 0, 0, -5
        // thus keeping the intersection point always in front of the ray.
        var b = new THREE.Sphere(new THREE.Vector3(0, 0, -1), 4);
        ok(a0.intersectSphere(b).distanceTo(new THREE.Vector3(0, 0, -5)) < TOL, "Passed!");
    });
    test("isIntersectionPlane", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        // parallel plane in front of the ray
        var b = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), one3.clone().sub(new THREE.Vector3(0, 0, -1)));
        ok(a.isIntersectionPlane(b), "Passed!");
        // parallel plane coincident with origin
        var c = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), one3.clone().sub(new THREE.Vector3(0, 0, 0)));
        ok(a.isIntersectionPlane(c), "Passed!");
        // parallel plane behind the ray
        var d = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), one3.clone().sub(new THREE.Vector3(0, 0, 1)));
        ok(!a.isIntersectionPlane(d), "Passed!");
        // perpendical ray that overlaps exactly
        var e = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(1, 0, 0), one3);
        ok(a.isIntersectionPlane(e), "Passed!");
        // perpendical ray that doesn't overlap
        var f = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(1, 0, 0), zero3);
        ok(!a.isIntersectionPlane(f), "Passed!");
    });
    test("intersectPlane", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        // parallel plane behind
        var b = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 1, -1));
        ok(a.intersectPlane(b) === null, "Passed!");
        // parallel plane coincident with origin
        var c = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 1, 0));
        ok(a.intersectPlane(c) === null, "Passed!");
        // parallel plane infront
        var d = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 1, 1));
        ok(a.intersectPlane(d).equals(a.origin), "Passed!");
        // perpendical ray that overlaps exactly
        var e = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(1, 0, 0), one3);
        ok(a.intersectPlane(e).equals(a.origin), "Passed!");
        // perpendical ray that doesn't overlap
        var f = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(1, 0, 0), zero3);
        ok(a.intersectPlane(f) === null, "Passed!");
    });
    test("applyMatrix4", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        var m = new THREE.Matrix4();
        ok(a.clone().applyMatrix4(m).equals(a), "Passed!");
        a = new THREE.Ray(zero3.clone(), new THREE.Vector3(0, 0, 1));
        m.makeRotationZ(Math.PI);
        ok(a.clone().applyMatrix4(m).equals(a), "Passed!");
        m.makeRotationX(Math.PI);
        var b = a.clone();
        b.direction.negate();
        var a2 = a.clone().applyMatrix4(m);
        ok(a2.origin.distanceTo(b.origin) < 0.0001, "Passed!");
        ok(a2.direction.distanceTo(b.direction) < 0.0001, "Passed!");
        a.origin = new THREE.Vector3(0, 0, 1);
        b.origin = new THREE.Vector3(0, 0, -1);
        var a2 = a.clone().applyMatrix4(m);
        ok(a2.origin.distanceTo(b.origin) < 0.0001, "Passed!");
        ok(a2.direction.distanceTo(b.direction) < 0.0001, "Passed!");
    });
    test("distanceSqToSegment", function () {
        var a = new THREE.Ray(one3.clone(), new THREE.Vector3(0, 0, 1));
        var ptOnLine = new THREE.Vector3();
        var ptOnSegment = new THREE.Vector3();
        //segment in front of the ray
        var v0 = new THREE.Vector3(3, 5, 50);
        var v1 = new THREE.Vector3(50, 50, 50); // just a far away point
        var distSqr = a.distanceSqToSegment(v0, v1, ptOnLine, ptOnSegment);
        ok(ptOnSegment.distanceTo(v0) < 0.0001, "Passed!");
        ok(ptOnLine.distanceTo(new THREE.Vector3(1, 1, 50)) < 0.0001, "Passed!");
        // ((3-1) * (3-1) + (5-1) * (5-1) = 4 + 16 = 20
        ok(Math.abs(distSqr - 20) < 0.0001, "Passed!");
        //segment behind the ray
        v0 = new THREE.Vector3(-50, -50, -50); // just a far away point
        v1 = new THREE.Vector3(-3, -5, -4);
        distSqr = a.distanceSqToSegment(v0, v1, ptOnLine, ptOnSegment);
        ok(ptOnSegment.distanceTo(v1) < 0.0001, "Passed!");
        ok(ptOnLine.distanceTo(one3) < 0.0001, "Passed!");
        // ((-3-1) * (-3-1) + (-5-1) * (-5-1) + (-4-1) + (-4-1) = 16 + 36 + 25 = 77
        ok(Math.abs(distSqr - 77) < 0.0001, "Passed!");
        //exact intersection between the ray and the segment
        v0 = new THREE.Vector3(-50, -50, -50);
        v1 = new THREE.Vector3(50, 50, 50);
        distSqr = a.distanceSqToSegment(v0, v1, ptOnLine, ptOnSegment);
        ok(ptOnSegment.distanceTo(one3) < 0.0001, "Passed!");
        ok(ptOnLine.distanceTo(one3) < 0.0001, "Passed!");
        ok(distSqr < 0.0001, "Passed!");
    });
    test("intersectBox", function () {
        var TOL = 0.0001;
        var box = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1));
        var a = new THREE.Ray(new THREE.Vector3(-2, 0, 0), new THREE.Vector3(1, 0, 0));
        //ray should intersect box at -1,0,0
        ok(a.isIntersectionBox(box) === true, "Passed!");
        ok(a.intersectBox(box).distanceTo(new THREE.Vector3(-1, 0, 0)) < TOL, "Passed!");
        var b = new THREE.Ray(new THREE.Vector3(-2, 0, 0), new THREE.Vector3(-1, 0, 0));
        //ray is point away from box, it should not intersect
        ok(b.isIntersectionBox(box) === false, "Passed!");
        ok(b.intersectBox(box) === null, "Passed!");
        var c = new THREE.Ray(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0));
        // ray is inside box, should return exit point
        ok(c.isIntersectionBox(box) === true, "Passed!");
        ok(c.intersectBox(box).distanceTo(new THREE.Vector3(1, 0, 0)) < TOL, "Passed!");
        var d = new THREE.Ray(new THREE.Vector3(0, 2, 1), new THREE.Vector3(0, -1, -1).normalize());
        //tilted ray should intersect box at 0,1,0
        ok(d.isIntersectionBox(box) === true, "Passed!");
        ok(d.intersectBox(box).distanceTo(new THREE.Vector3(0, 1, 0)) < TOL, "Passed!");
        var e = new THREE.Ray(new THREE.Vector3(1, -2, 1), new THREE.Vector3(0, 1, 0).normalize());
        //handle case where ray is coplanar with one of the boxes side - box in front of ray
        ok(e.isIntersectionBox(box) === true, "Passed!");
        ok(e.intersectBox(box).distanceTo(new THREE.Vector3(1, -1, 1)) < TOL, "Passed!");
        var f = new THREE.Ray(new THREE.Vector3(1, -2, 0), new THREE.Vector3(0, -1, 0).normalize());
        //handle case where ray is coplanar with one of the boxes side - box behind ray
        ok(f.isIntersectionBox(box) === false, "Passed!");
        ok(f.intersectBox(box) == null, "Passed!");
    });
    // -------------------------------------------- Sphere
    test("constructor", function () {
        var a = new THREE.Sphere();
        ok(a.center.equals(zero3), "Passed!");
        ok(a.radius == 0, "Passed!");
        a = new THREE.Sphere(one3.clone(), 1);
        ok(a.center.equals(one3), "Passed!");
        ok(a.radius == 1, "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Sphere(one3.clone(), 1);
        var b = new THREE.Sphere().copy(a);
        ok(b.center.equals(one3), "Passed!");
        ok(b.radius == 1, "Passed!");
        // ensure that it is a true copy
        a.center = zero3;
        a.radius = 0;
        ok(b.center.equals(one3), "Passed!");
        ok(b.radius == 1, "Passed!");
    });
    test("set", function () {
        var a = new THREE.Sphere();
        ok(a.center.equals(zero3), "Passed!");
        ok(a.radius == 0, "Passed!");
        a.set(one3, 1);
        ok(a.center.equals(one3), "Passed!");
        ok(a.radius == 1, "Passed!");
    });
    test("empty", function () {
        var a = new THREE.Sphere();
        ok(a.empty(), "Passed!");
        a.set(one3, 1);
        ok(!a.empty(), "Passed!");
    });
    test("containsPoint", function () {
        var a = new THREE.Sphere(one3.clone(), 1);
        ok(!a.containsPoint(zero3), "Passed!");
        ok(a.containsPoint(one3), "Passed!");
    });
    test("distanceToPoint", function () {
        var a = new THREE.Sphere(one3.clone(), 1);
        ok((a.distanceToPoint(zero3) - 0.7320) < 0.001, "Passed!");
        ok(a.distanceToPoint(one3) === -1, "Passed!");
    });
    test("intersectsSphere", function () {
        var a = new THREE.Sphere(one3.clone(), 1);
        var b = new THREE.Sphere(zero3.clone(), 1);
        var c = new THREE.Sphere(zero3.clone(), 0.25);
        ok(a.intersectsSphere(b), "Passed!");
        ok(!a.intersectsSphere(c), "Passed!");
    });
    test("clampPoint", function () {
        var a = new THREE.Sphere(one3.clone(), 1);
        ok(a.clampPoint(new THREE.Vector3(1, 1, 3)).equals(new THREE.Vector3(1, 1, 2)), "Passed!");
        ok(a.clampPoint(new THREE.Vector3(1, 1, -3)).equals(new THREE.Vector3(1, 1, 0)), "Passed!");
    });
    test("getBoundingBox", function () {
        var a = new THREE.Sphere(one3.clone(), 1);
        ok(a.getBoundingBox().equals(new THREE.Box3(zero3, two3)), "Passed!");
        a.set(zero3, 0);
        ok(a.getBoundingBox().equals(new THREE.Box3(zero3, zero3)), "Passed!");
    });
    test("applyMatrix4", function () {
        var a = new THREE.Sphere(one3.clone(), 1);
        var m = new THREE.Matrix4().makeTranslation(1, -2, 1);
        ok(a.clone().applyMatrix4(m).getBoundingBox().equals(a.getBoundingBox().applyMatrix4(m)), "Passed!");
    });
    test("translate", function () {
        var a = new THREE.Sphere(one3.clone(), 1);
        a.translate(one3.clone().negate());
        ok(a.center.equals(zero3), "Passed!");
    });
    // -------------------------------------------- Triangle
    test("constructor", function () {
        var a = new THREE.Triangle();
        ok(a.a.equals(zero3), "Passed!");
        ok(a.b.equals(zero3), "Passed!");
        ok(a.c.equals(zero3), "Passed!");
        a = new THREE.Triangle(one3.clone().negate(), one3.clone(), two3.clone());
        ok(a.a.equals(one3.clone().negate()), "Passed!");
        ok(a.b.equals(one3), "Passed!");
        ok(a.c.equals(two3), "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Triangle(one3.clone().negate(), one3.clone(), two3.clone());
        var b = new THREE.Triangle().copy(a);
        ok(b.a.equals(one3.clone().negate()), "Passed!");
        ok(b.b.equals(one3), "Passed!");
        ok(b.c.equals(two3), "Passed!");
        // ensure that it is a true copy
        a.a = one3;
        a.b = zero3;
        a.c = zero3;
        ok(b.a.equals(one3.clone().negate()), "Passed!");
        ok(b.b.equals(one3), "Passed!");
        ok(b.c.equals(two3), "Passed!");
    });
    test("setFromPointsAndIndices", function () {
        var a = new THREE.Triangle();
        var points = [one3, one3.clone().negate(), two3];
        a.setFromPointsAndIndices(points, 1, 0, 2);
        ok(a.a.equals(one3.clone().negate()), "Passed!");
        ok(a.b.equals(one3), "Passed!");
        ok(a.c.equals(two3), "Passed!");
    });
    test("set", function () {
        var a = new THREE.Triangle();
        a.set(one3.clone().negate(), one3, two3);
        ok(a.a.equals(one3.clone().negate()), "Passed!");
        ok(a.b.equals(one3), "Passed!");
        ok(a.c.equals(two3), "Passed!");
    });
    test("area", function () {
        var a = new THREE.Triangle();
        ok(a.area() == 0, "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));
        ok(a.area() == 0.5, "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2));
        ok(a.area() == 2, "Passed!");
        // colinear triangle.
        a = new THREE.Triangle(new THREE.Vector3(2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 0, 0));
        ok(a.area() == 0, "Passed!");
    });
    test("midpoint", function () {
        var a = new THREE.Triangle();
        ok(a.midpoint().equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));
        ok(a.midpoint().equals(new THREE.Vector3(1 / 3, 1 / 3, 0)), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2));
        ok(a.midpoint().equals(new THREE.Vector3(2 / 3, 0, 2 / 3)), "Passed!");
    });
    test("normal", function () {
        var a = new THREE.Triangle();
        ok(a.normal().equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));
        ok(a.normal().equals(new THREE.Vector3(0, 0, 1)), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2));
        ok(a.normal().equals(new THREE.Vector3(0, 1, 0)), "Passed!");
    });
    test("plane", function () {
        var a = new THREE.Triangle();
        // artificial normal is created in this case.
        ok(a.plane().distanceToPoint(a.a) == 0, "Passed!");
        ok(a.plane().distanceToPoint(a.b) == 0, "Passed!");
        ok(a.plane().distanceToPoint(a.c) == 0, "Passed!");
        ok(a.plane().normal.equals(a.normal()), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));
        ok(a.plane().distanceToPoint(a.a) == 0, "Passed!");
        ok(a.plane().distanceToPoint(a.b) == 0, "Passed!");
        ok(a.plane().distanceToPoint(a.c) == 0, "Passed!");
        ok(a.plane().normal.equals(a.normal()), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2));
        ok(a.plane().distanceToPoint(a.a) == 0, "Passed!");
        ok(a.plane().distanceToPoint(a.b) == 0, "Passed!");
        ok(a.plane().distanceToPoint(a.c) == 0, "Passed!");
        ok(a.plane().normal.clone().normalize().equals(a.normal()), "Passed!");
    });
    test("barycoordFromPoint", function () {
        var a = new THREE.Triangle();
        var bad = new THREE.Vector3(-2, -1, -1);
        ok(a.barycoordFromPoint(a.a).equals(bad), "Passed!");
        ok(a.barycoordFromPoint(a.b).equals(bad), "Passed!");
        ok(a.barycoordFromPoint(a.c).equals(bad), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));
        ok(a.barycoordFromPoint(a.a).equals(new THREE.Vector3(1, 0, 0)), "Passed!");
        ok(a.barycoordFromPoint(a.b).equals(new THREE.Vector3(0, 1, 0)), "Passed!");
        ok(a.barycoordFromPoint(a.c).equals(new THREE.Vector3(0, 0, 1)), "Passed!");
        ok(a.barycoordFromPoint(a.midpoint()).distanceTo(new THREE.Vector3(1 / 3, 1 / 3, 1 / 3)) < 0.0001, "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2));
        ok(a.barycoordFromPoint(a.a).equals(new THREE.Vector3(1, 0, 0)), "Passed!");
        ok(a.barycoordFromPoint(a.b).equals(new THREE.Vector3(0, 1, 0)), "Passed!");
        ok(a.barycoordFromPoint(a.c).equals(new THREE.Vector3(0, 0, 1)), "Passed!");
        ok(a.barycoordFromPoint(a.midpoint()).distanceTo(new THREE.Vector3(1 / 3, 1 / 3, 1 / 3)) < 0.0001, "Passed!");
    });
    test("containsPoint", function () {
        var a = new THREE.Triangle();
        ok(!a.containsPoint(a.a), "Passed!");
        ok(!a.containsPoint(a.b), "Passed!");
        ok(!a.containsPoint(a.c), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));
        ok(a.containsPoint(a.a), "Passed!");
        ok(a.containsPoint(a.b), "Passed!");
        ok(a.containsPoint(a.c), "Passed!");
        ok(a.containsPoint(a.midpoint()), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(-1, -1, -1)), "Passed!");
        a = new THREE.Triangle(new THREE.Vector3(2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2));
        ok(a.containsPoint(a.a), "Passed!");
        ok(a.containsPoint(a.b), "Passed!");
        ok(a.containsPoint(a.c), "Passed!");
        ok(a.containsPoint(a.midpoint()), "Passed!");
        ok(!a.containsPoint(new THREE.Vector3(-1, -1, -1)), "Passed!");
    });
    // -------------------------------------------- Vector2
    test("constructor", function () {
        var a = new THREE.Vector2();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        a = new THREE.Vector2(x, y);
        ok(a.x === x, "Passed!");
        ok(a.y === y, "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Vector2(x, y);
        var b = new THREE.Vector2().copy(a);
        ok(b.x == x, "Passed!");
        ok(b.y == y, "Passed!");
        // ensure that it is a true copy
        a.x = 0;
        a.y = -1;
        ok(b.x == x, "Passed!");
        ok(b.y == y, "Passed!");
    });
    test("set", function () {
        var a = new THREE.Vector2();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        a.set(x, y);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
    });
    test("setX,setY", function () {
        var a = new THREE.Vector2();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        a.setX(x);
        a.setY(y);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
    });
    test("setComponent,getComponent", function () {
        var a = new THREE.Vector2();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        a.setComponent(0, 1);
        a.setComponent(1, 2);
        ok(a.getComponent(0) == 1, "Passed!");
        ok(a.getComponent(1) == 2, "Passed!");
    });
    test("add", function () {
        var a = new THREE.Vector2(x, y);
        var b = new THREE.Vector2(-x, -y);
        a.add(b);
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        var c = new THREE.Vector2().addVectors(b, b);
        ok(c.x == -2 * x, "Passed!");
        ok(c.y == -2 * y, "Passed!");
    });
    test("sub", function () {
        var a = new THREE.Vector2(x, y);
        var b = new THREE.Vector2(-x, -y);
        a.sub(b);
        ok(a.x == 2 * x, "Passed!");
        ok(a.y == 2 * y, "Passed!");
        var c = new THREE.Vector2().subVectors(a, a);
        ok(c.x == 0, "Passed!");
        ok(c.y == 0, "Passed!");
    });
    test("multiply/divide", function () {
        var a = new THREE.Vector2(x, y);
        var b = new THREE.Vector2(-x, -y);
        a.multiplyScalar(-2);
        ok(a.x == x * -2, "Passed!");
        ok(a.y == y * -2, "Passed!");
        b.multiplyScalar(-2);
        ok(b.x == 2 * x, "Passed!");
        ok(b.y == 2 * y, "Passed!");
        a.divideScalar(-2);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
        b.divideScalar(-2);
        ok(b.x == -x, "Passed!");
        ok(b.y == -y, "Passed!");
    });
    test("min/max/clamp", function () {
        var a = new THREE.Vector2(x, y);
        var b = new THREE.Vector2(-x, -y);
        var c = new THREE.Vector2();
        c.copy(a).min(b);
        ok(c.x == -x, "Passed!");
        ok(c.y == -y, "Passed!");
        c.copy(a).max(b);
        ok(c.x == x, "Passed!");
        ok(c.y == y, "Passed!");
        c.set(-2 * x, 2 * y);
        c.clamp(b, a);
        ok(c.x == -x, "Passed!");
        ok(c.y == y, "Passed!");
        c.set(-2 * x, 2 * x);
        c.clampScalar(-x, x);
        equal(c.x, -x, "scalar clamp x");
        equal(c.y, x, "scalar clamp y");
    });
    test("rounding", function () {
        deepEqual(new THREE.Vector2(-0.1, 0.1).floor(), new THREE.Vector2(-1, 0), "floor .1");
        deepEqual(new THREE.Vector2(-0.5, 0.5).floor(), new THREE.Vector2(-1, 0), "floor .5");
        deepEqual(new THREE.Vector2(-0.9, 0.9).floor(), new THREE.Vector2(-1, 0), "floor .9");
        deepEqual(new THREE.Vector2(-0.1, 0.1).ceil(), new THREE.Vector2(0, 1), "ceil .1");
        deepEqual(new THREE.Vector2(-0.5, 0.5).ceil(), new THREE.Vector2(0, 1), "ceil .5");
        deepEqual(new THREE.Vector2(-0.9, 0.9).ceil(), new THREE.Vector2(0, 1), "ceil .9");
        deepEqual(new THREE.Vector2(-0.1, 0.1).round(), new THREE.Vector2(0, 0), "round .1");
        deepEqual(new THREE.Vector2(-0.5, 0.5).round(), new THREE.Vector2(0, 1), "round .5");
        deepEqual(new THREE.Vector2(-0.9, 0.9).round(), new THREE.Vector2(-1, 1), "round .9");
        deepEqual(new THREE.Vector2(-0.1, 0.1).roundToZero(), new THREE.Vector2(0, 0), "roundToZero .1");
        deepEqual(new THREE.Vector2(-0.5, 0.5).roundToZero(), new THREE.Vector2(0, 0), "roundToZero .5");
        deepEqual(new THREE.Vector2(-0.9, 0.9).roundToZero(), new THREE.Vector2(0, 0), "roundToZero .9");
        deepEqual(new THREE.Vector2(-1.1, 1.1).roundToZero(), new THREE.Vector2(-1, 1), "roundToZero 1.1");
        deepEqual(new THREE.Vector2(-1.5, 1.5).roundToZero(), new THREE.Vector2(-1, 1), "roundToZero 1.5");
        deepEqual(new THREE.Vector2(-1.9, 1.9).roundToZero(), new THREE.Vector2(-1, 1), "roundToZero 1.9");
    });
    test("negate", function () {
        var a = new THREE.Vector2(x, y);
        a.negate();
        ok(a.x == -x, "Passed!");
        ok(a.y == -y, "Passed!");
    });
    test("dot", function () {
        var a = new THREE.Vector2(x, y);
        var b = new THREE.Vector2(-x, -y);
        var c = new THREE.Vector2();
        var result = a.dot(b);
        ok(result == (-x * x - y * y), "Passed!");
        result = a.dot(c);
        ok(result == 0, "Passed!");
    });
    test("length/lengthSq", function () {
        var a = new THREE.Vector2(x, 0);
        var b = new THREE.Vector2(0, -y);
        var c = new THREE.Vector2();
        ok(a.length() == x, "Passed!");
        ok(a.lengthSq() == x * x, "Passed!");
        ok(b.length() == y, "Passed!");
        ok(b.lengthSq() == y * y, "Passed!");
        ok(c.length() == 0, "Passed!");
        ok(c.lengthSq() == 0, "Passed!");
        a.set(x, y);
        ok(a.length() == Math.sqrt(x * x + y * y), "Passed!");
        ok(a.lengthSq() == (x * x + y * y), "Passed!");
    });
    test("normalize", function () {
        var a = new THREE.Vector2(x, 0);
        var b = new THREE.Vector2(0, -y);
        var c = new THREE.Vector2();
        a.normalize();
        ok(a.length() == 1, "Passed!");
        ok(a.x == 1, "Passed!");
        b.normalize();
        ok(b.length() == 1, "Passed!");
        ok(b.y == -1, "Passed!");
    });
    test("distanceTo/distanceToSquared", function () {
        var a = new THREE.Vector2(x, 0);
        var b = new THREE.Vector2(0, -y);
        var c = new THREE.Vector2();
        ok(a.distanceTo(c) == x, "Passed!");
        ok(a.distanceToSquared(c) == x * x, "Passed!");
        ok(b.distanceTo(c) == y, "Passed!");
        ok(b.distanceToSquared(c) == y * y, "Passed!");
    });
    test("setLength", function () {
        var a = new THREE.Vector2(x, 0);
        ok(a.length() == x, "Passed!");
        a.setLength(y);
        ok(a.length() == y, "Passed!");
        a = new THREE.Vector2(0, 0);
        ok(a.length() == 0, "Passed!");
        a.setLength(y);
        ok(a.length() == 0, "Passed!");
    });
    test("lerp/clone", function () {
        var a = new THREE.Vector2(x, 0);
        var b = new THREE.Vector2(0, -y);
        ok(a.lerp(a, 0).equals(a.lerp(a, 0.5)), "Passed!");
        ok(a.lerp(a, 0).equals(a.lerp(a, 1)), "Passed!");
        ok(a.clone().lerp(b, 0).equals(a), "Passed!");
        ok(a.clone().lerp(b, 0.5).x == x * 0.5, "Passed!");
        ok(a.clone().lerp(b, 0.5).y == -y * 0.5, "Passed!");
        ok(a.clone().lerp(b, 1).equals(b), "Passed!");
    });
    test("equals", function () {
        var a = new THREE.Vector2(x, 0);
        var b = new THREE.Vector2(0, -y);
        ok(a.x != b.x, "Passed!");
        ok(a.y != b.y, "Passed!");
        ok(!a.equals(b), "Passed!");
        ok(!b.equals(a), "Passed!");
        a.copy(b);
        ok(a.x == b.x, "Passed!");
        ok(a.y == b.y, "Passed!");
        ok(a.equals(b), "Passed!");
        ok(b.equals(a), "Passed!");
    });
    // -------------------------------------------- Vector3
    test("constructor", function () {
        var a = new THREE.Vector3();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        a = new THREE.Vector3(x, y, z);
        ok(a.x === x, "Passed!");
        ok(a.y === y, "Passed!");
        ok(a.z === z, "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Vector3(x, y, z);
        var b = new THREE.Vector3().copy(a);
        ok(b.x == x, "Passed!");
        ok(b.y == y, "Passed!");
        ok(b.z == z, "Passed!");
        // ensure that it is a true copy
        a.x = 0;
        a.y = -1;
        a.z = -2;
        ok(b.x == x, "Passed!");
        ok(b.y == y, "Passed!");
        ok(b.z == z, "Passed!");
    });
    test("set", function () {
        var a = new THREE.Vector3();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        a.set(x, y, z);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
        ok(a.z == z, "Passed!");
    });
    test("setX,setY,setZ", function () {
        var a = new THREE.Vector3();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        a.setX(x);
        a.setY(y);
        a.setZ(z);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
        ok(a.z == z, "Passed!");
    });
    test("setComponent,getComponent", function () {
        var a = new THREE.Vector3();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        a.setComponent(0, 1);
        a.setComponent(1, 2);
        a.setComponent(2, 3);
        ok(a.getComponent(0) == 1, "Passed!");
        ok(a.getComponent(1) == 2, "Passed!");
        ok(a.getComponent(2) == 3, "Passed!");
    });
    test("add", function () {
        var a = new THREE.Vector3(x, y, z);
        var b = new THREE.Vector3(-x, -y, -z);
        a.add(b);
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        var c = new THREE.Vector3().addVectors(b, b);
        ok(c.x == -2 * x, "Passed!");
        ok(c.y == -2 * y, "Passed!");
        ok(c.z == -2 * z, "Passed!");
    });
    test("sub", function () {
        var a = new THREE.Vector3(x, y, z);
        var b = new THREE.Vector3(-x, -y, -z);
        a.sub(b);
        ok(a.x == 2 * x, "Passed!");
        ok(a.y == 2 * y, "Passed!");
        ok(a.z == 2 * z, "Passed!");
        var c = new THREE.Vector3().subVectors(a, a);
        ok(c.x == 0, "Passed!");
        ok(c.y == 0, "Passed!");
        ok(c.z == 0, "Passed!");
    });
    test("multiply/divide", function () {
        var a = new THREE.Vector3(x, y, z);
        var b = new THREE.Vector3(-x, -y, -z);
        a.multiplyScalar(-2);
        ok(a.x == x * -2, "Passed!");
        ok(a.y == y * -2, "Passed!");
        ok(a.z == z * -2, "Passed!");
        b.multiplyScalar(-2);
        ok(b.x == 2 * x, "Passed!");
        ok(b.y == 2 * y, "Passed!");
        ok(b.z == 2 * z, "Passed!");
        a.divideScalar(-2);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
        ok(a.z == z, "Passed!");
        b.divideScalar(-2);
        ok(b.x == -x, "Passed!");
        ok(b.y == -y, "Passed!");
        ok(b.z == -z, "Passed!");
    });
    test("min/max/clamp", function () {
        var a = new THREE.Vector3(x, y, z);
        var b = new THREE.Vector3(-x, -y, -z);
        var c = new THREE.Vector3();
        c.copy(a).min(b);
        ok(c.x == -x, "Passed!");
        ok(c.y == -y, "Passed!");
        ok(c.z == -z, "Passed!");
        c.copy(a).max(b);
        ok(c.x == x, "Passed!");
        ok(c.y == y, "Passed!");
        ok(c.z == z, "Passed!");
        c.set(-2 * x, 2 * y, -2 * z);
        c.clamp(b, a);
        ok(c.x == -x, "Passed!");
        ok(c.y == y, "Passed!");
        ok(c.z == -z, "Passed!");
    });
    test("negate", function () {
        var a = new THREE.Vector3(x, y, z);
        a.negate();
        ok(a.x == -x, "Passed!");
        ok(a.y == -y, "Passed!");
        ok(a.z == -z, "Passed!");
    });
    test("dot", function () {
        var a = new THREE.Vector3(x, y, z);
        var b = new THREE.Vector3(-x, -y, -z);
        var c = new THREE.Vector3();
        var result = a.dot(b);
        ok(result == (-x * x - y * y - z * z), "Passed!");
        result = a.dot(c);
        ok(result == 0, "Passed!");
    });
    test("length/lengthSq", function () {
        var a = new THREE.Vector3(x, 0, 0);
        var b = new THREE.Vector3(0, -y, 0);
        var c = new THREE.Vector3(0, 0, z);
        var d = new THREE.Vector3();
        ok(a.length() == x, "Passed!");
        ok(a.lengthSq() == x * x, "Passed!");
        ok(b.length() == y, "Passed!");
        ok(b.lengthSq() == y * y, "Passed!");
        ok(c.length() == z, "Passed!");
        ok(c.lengthSq() == z * z, "Passed!");
        ok(d.length() == 0, "Passed!");
        ok(d.lengthSq() == 0, "Passed!");
        a.set(x, y, z);
        ok(a.length() == Math.sqrt(x * x + y * y + z * z), "Passed!");
        ok(a.lengthSq() == (x * x + y * y + z * z), "Passed!");
    });
    test("normalize", function () {
        var a = new THREE.Vector3(x, 0, 0);
        var b = new THREE.Vector3(0, -y, 0);
        var c = new THREE.Vector3(0, 0, z);
        a.normalize();
        ok(a.length() == 1, "Passed!");
        ok(a.x == 1, "Passed!");
        b.normalize();
        ok(b.length() == 1, "Passed!");
        ok(b.y == -1, "Passed!");
        c.normalize();
        ok(c.length() == 1, "Passed!");
        ok(c.z == 1, "Passed!");
    });
    test("distanceTo/distanceToSquared", function () {
        var a = new THREE.Vector3(x, 0, 0);
        var b = new THREE.Vector3(0, -y, 0);
        var c = new THREE.Vector3(0, 0, z);
        var d = new THREE.Vector3();
        ok(a.distanceTo(d) == x, "Passed!");
        ok(a.distanceToSquared(d) == x * x, "Passed!");
        ok(b.distanceTo(d) == y, "Passed!");
        ok(b.distanceToSquared(d) == y * y, "Passed!");
        ok(c.distanceTo(d) == z, "Passed!");
        ok(c.distanceToSquared(d) == z * z, "Passed!");
    });
    test("setLength", function () {
        var a = new THREE.Vector3(x, 0, 0);
        ok(a.length() == x, "Passed!");
        a.setLength(y);
        ok(a.length() == y, "Passed!");
        a = new THREE.Vector3(0, 0, 0);
        ok(a.length() == 0, "Passed!");
        a.setLength(y);
        ok(a.length() == 0, "Passed!");
    });
    test("projectOnVector", function () {
        var a = new THREE.Vector3(1, 0, 0);
        var b = new THREE.Vector3();
        var normal = new THREE.Vector3(10, 0, 0);
        ok(b.copy(a).projectOnVector(normal).equals(new THREE.Vector3(1, 0, 0)), "Passed!");
        a.set(0, 1, 0);
        ok(b.copy(a).projectOnVector(normal).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        a.set(0, 0, -1);
        ok(b.copy(a).projectOnVector(normal).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        a.set(-1, 0, 0);
        ok(b.copy(a).projectOnVector(normal).equals(new THREE.Vector3(-1, 0, 0)), "Passed!");
    });
    test("projectOnPlane", function () {
        var a = new THREE.Vector3(1, 0, 0);
        var b = new THREE.Vector3();
        var normal = new THREE.Vector3(1, 0, 0);
        ok(b.copy(a).projectOnPlane(normal).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
        a.set(0, 1, 0);
        ok(b.copy(a).projectOnPlane(normal).equals(new THREE.Vector3(0, 1, 0)), "Passed!");
        a.set(0, 0, -1);
        ok(b.copy(a).projectOnPlane(normal).equals(new THREE.Vector3(0, 0, -1)), "Passed!");
        a.set(-1, 0, 0);
        ok(b.copy(a).projectOnPlane(normal).equals(new THREE.Vector3(0, 0, 0)), "Passed!");
    });
    test("reflect", function () {
        var a = new THREE.Vector3();
        var normal = new THREE.Vector3(0, 1, 0);
        var b = new THREE.Vector3();
        a.set(0, -1, 0);
        ok(b.copy(a).reflect(normal).equals(new THREE.Vector3(0, 1, 0)), "Passed!");
        a.set(1, -1, 0);
        ok(b.copy(a).reflect(normal).equals(new THREE.Vector3(1, 1, 0)), "Passed!");
        a.set(1, -1, 0);
        normal.set(0, -1, 0);
        ok(b.copy(a).reflect(normal).equals(new THREE.Vector3(1, 1, 0)), "Passed!");
    });
    test("angleTo", function () {
        var a = new THREE.Vector3(0, -0.18851655680720186, 0.9820700116639124);
        var b = new THREE.Vector3(0, 0.18851655680720186, -0.9820700116639124);
        equal(a.angleTo(a), 0);
        equal(a.angleTo(b), Math.PI);
        var x = new THREE.Vector3(1, 0, 0);
        var y = new THREE.Vector3(0, 1, 0);
        var z = new THREE.Vector3(0, 0, 1);
        equal(x.angleTo(y), Math.PI / 2);
        equal(x.angleTo(z), Math.PI / 2);
        equal(z.angleTo(x), Math.PI / 2);
        ok(Math.abs(x.angleTo(new THREE.Vector3(1, 1, 0)) - (Math.PI / 4)) < 0.0000001);
    });
    test("lerp/clone", function () {
        var a = new THREE.Vector3(x, 0, z);
        var b = new THREE.Vector3(0, -y, 0);
        ok(a.lerp(a, 0).equals(a.lerp(a, 0.5)), "Passed!");
        ok(a.lerp(a, 0).equals(a.lerp(a, 1)), "Passed!");
        ok(a.clone().lerp(b, 0).equals(a), "Passed!");
        ok(a.clone().lerp(b, 0.5).x == x * 0.5, "Passed!");
        ok(a.clone().lerp(b, 0.5).y == -y * 0.5, "Passed!");
        ok(a.clone().lerp(b, 0.5).z == z * 0.5, "Passed!");
        ok(a.clone().lerp(b, 1).equals(b), "Passed!");
    });
    test("equals", function () {
        var a = new THREE.Vector3(x, 0, z);
        var b = new THREE.Vector3(0, -y, 0);
        ok(a.x != b.x, "Passed!");
        ok(a.y != b.y, "Passed!");
        ok(a.z != b.z, "Passed!");
        ok(!a.equals(b), "Passed!");
        ok(!b.equals(a), "Passed!");
        a.copy(b);
        ok(a.x == b.x, "Passed!");
        ok(a.y == b.y, "Passed!");
        ok(a.z == b.z, "Passed!");
        ok(a.equals(b), "Passed!");
        ok(b.equals(a), "Passed!");
    });
    // -------------------------------------------- Vector4
    test("constructor", function () {
        var a = new THREE.Vector4();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        ok(a.w == 1, "Passed!");
        a = new THREE.Vector4(x, y, z, w);
        ok(a.x === x, "Passed!");
        ok(a.y === y, "Passed!");
        ok(a.z === z, "Passed!");
        ok(a.w === w, "Passed!");
    });
    test("copy", function () {
        var a = new THREE.Vector4(x, y, z, w);
        var b = new THREE.Vector4().copy(a);
        ok(b.x == x, "Passed!");
        ok(b.y == y, "Passed!");
        ok(b.z == z, "Passed!");
        ok(b.w == w, "Passed!");
        // ensure that it is a true copy
        a.x = 0;
        a.y = -1;
        a.z = -2;
        a.w = -3;
        ok(b.x == x, "Passed!");
        ok(b.y == y, "Passed!");
        ok(b.z == z, "Passed!");
        ok(b.w == w, "Passed!");
    });
    test("set", function () {
        var a = new THREE.Vector4();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        ok(a.w == 1, "Passed!");
        a.set(x, y, z, w);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
        ok(a.z == z, "Passed!");
        ok(a.w == w, "Passed!");
    });
    test("setX,setY,setZ,setW", function () {
        var a = new THREE.Vector4();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        ok(a.w == 1, "Passed!");
        a.setX(x);
        a.setY(y);
        a.setZ(z);
        a.setW(w);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
        ok(a.z == z, "Passed!");
        ok(a.w == w, "Passed!");
    });
    test("setComponent,getComponent", function () {
        var a = new THREE.Vector4();
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        ok(a.w == 1, "Passed!");
        a.setComponent(0, 1);
        a.setComponent(1, 2);
        a.setComponent(2, 3);
        a.setComponent(3, 4);
        ok(a.getComponent(0) == 1, "Passed!");
        ok(a.getComponent(1) == 2, "Passed!");
        ok(a.getComponent(2) == 3, "Passed!");
        ok(a.getComponent(3) == 4, "Passed!");
    });
    test("add", function () {
        var a = new THREE.Vector4(x, y, z, w);
        var b = new THREE.Vector4(-x, -y, -z, -w);
        a.add(b);
        ok(a.x == 0, "Passed!");
        ok(a.y == 0, "Passed!");
        ok(a.z == 0, "Passed!");
        ok(a.w == 0, "Passed!");
        var c = new THREE.Vector4().addVectors(b, b);
        ok(c.x == -2 * x, "Passed!");
        ok(c.y == -2 * y, "Passed!");
        ok(c.z == -2 * z, "Passed!");
        ok(c.w == -2 * w, "Passed!");
    });
    test("sub", function () {
        var a = new THREE.Vector4(x, y, z, w);
        var b = new THREE.Vector4(-x, -y, -z, -w);
        a.sub(b);
        ok(a.x == 2 * x, "Passed!");
        ok(a.y == 2 * y, "Passed!");
        ok(a.z == 2 * z, "Passed!");
        ok(a.w == 2 * w, "Passed!");
        var c = new THREE.Vector4().subVectors(a, a);
        ok(c.x == 0, "Passed!");
        ok(c.y == 0, "Passed!");
        ok(c.z == 0, "Passed!");
        ok(c.w == 0, "Passed!");
    });
    test("multiply/divide", function () {
        var a = new THREE.Vector4(x, y, z, w);
        var b = new THREE.Vector4(-x, -y, -z, -w);
        a.multiplyScalar(-2);
        ok(a.x == x * -2, "Passed!");
        ok(a.y == y * -2, "Passed!");
        ok(a.z == z * -2, "Passed!");
        ok(a.w == w * -2, "Passed!");
        b.multiplyScalar(-2);
        ok(b.x == 2 * x, "Passed!");
        ok(b.y == 2 * y, "Passed!");
        ok(b.z == 2 * z, "Passed!");
        ok(b.w == 2 * w, "Passed!");
        a.divideScalar(-2);
        ok(a.x == x, "Passed!");
        ok(a.y == y, "Passed!");
        ok(a.z == z, "Passed!");
        ok(a.w == w, "Passed!");
        b.divideScalar(-2);
        ok(b.x == -x, "Passed!");
        ok(b.y == -y, "Passed!");
        ok(b.z == -z, "Passed!");
        ok(b.w == -w, "Passed!");
    });
    test("min/max/clamp", function () {
        var a = new THREE.Vector4(x, y, z, w);
        var b = new THREE.Vector4(-x, -y, -z, -w);
        var c = new THREE.Vector4();
        c.copy(a).min(b);
        ok(c.x == -x, "Passed!");
        ok(c.y == -y, "Passed!");
        ok(c.z == -z, "Passed!");
        ok(c.w == -w, "Passed!");
        c.copy(a).max(b);
        ok(c.x == x, "Passed!");
        ok(c.y == y, "Passed!");
        ok(c.z == z, "Passed!");
        ok(c.w == w, "Passed!");
        c.set(-2 * x, 2 * y, -2 * z, 2 * w);
        c.clamp(b, a);
        ok(c.x == -x, "Passed!");
        ok(c.y == y, "Passed!");
        ok(c.z == -z, "Passed!");
        ok(c.w == w, "Passed!");
    });
    test("negate", function () {
        var a = new THREE.Vector4(x, y, z, w);
        a.negate();
        ok(a.x == -x, "Passed!");
        ok(a.y == -y, "Passed!");
        ok(a.z == -z, "Passed!");
        ok(a.w == -w, "Passed!");
    });
    test("dot", function () {
        var a = new THREE.Vector4(x, y, z, w);
        var b = new THREE.Vector4(-x, -y, -z, -w);
        var c = new THREE.Vector4(0, 0, 0, 0);
        var result = a.dot(b);
        ok(result == (-x * x - y * y - z * z - w * w), "Passed!");
        result = a.dot(c);
        ok(result == 0, "Passed!");
    });
    test("length/lengthSq", function () {
        var a = new THREE.Vector4(x, 0, 0, 0);
        var b = new THREE.Vector4(0, -y, 0, 0);
        var c = new THREE.Vector4(0, 0, z, 0);
        var d = new THREE.Vector4(0, 0, 0, w);
        var e = new THREE.Vector4(0, 0, 0, 0);
        ok(a.length() == x, "Passed!");
        ok(a.lengthSq() == x * x, "Passed!");
        ok(b.length() == y, "Passed!");
        ok(b.lengthSq() == y * y, "Passed!");
        ok(c.length() == z, "Passed!");
        ok(c.lengthSq() == z * z, "Passed!");
        ok(d.length() == w, "Passed!");
        ok(d.lengthSq() == w * w, "Passed!");
        ok(e.length() == 0, "Passed!");
        ok(e.lengthSq() == 0, "Passed!");
        a.set(x, y, z, w);
        ok(a.length() == Math.sqrt(x * x + y * y + z * z + w * w), "Passed!");
        ok(a.lengthSq() == (x * x + y * y + z * z + w * w), "Passed!");
    });
    test("normalize", function () {
        var a = new THREE.Vector4(x, 0, 0, 0);
        var b = new THREE.Vector4(0, -y, 0, 0);
        var c = new THREE.Vector4(0, 0, z, 0);
        var d = new THREE.Vector4(0, 0, 0, -w);
        a.normalize();
        ok(a.length() == 1, "Passed!");
        ok(a.x == 1, "Passed!");
        b.normalize();
        ok(b.length() == 1, "Passed!");
        ok(b.y == -1, "Passed!");
        c.normalize();
        ok(c.length() == 1, "Passed!");
        ok(c.z == 1, "Passed!");
        d.normalize();
        ok(d.length() == 1, "Passed!");
        ok(d.w == -1, "Passed!");
    });
    /*
     test( "distanceTo/distanceToSquared", function() {
     var a = new THREE.Vector4( x, 0, 0, 0 );
     var b = new THREE.Vector4( 0, -y, 0, 0 );
     var c = new THREE.Vector4( 0, 0, z, 0 );
     var d = new THREE.Vector4( 0, 0, 0, -w );
     var e = new THREE.Vector4();

     ok( a.distanceTo( e ) == x, "Passed!" );
     ok( a.distanceToSquared( e ) == x*x, "Passed!" );

     ok( b.distanceTo( e ) == y, "Passed!" );
     ok( b.distanceToSquared( e ) == y*y, "Passed!" );

     ok( c.distanceTo( e ) == z, "Passed!" );
     ok( c.distanceToSquared( e ) == z*z, "Passed!" );

     ok( d.distanceTo( e ) == w, "Passed!" );
     ok( d.distanceToSquared( e ) == w*w, "Passed!" );
     });
     */
    test("setLength", function () {
        var a = new THREE.Vector4(x, 0, 0, 0);
        ok(a.length() == x, "Passed!");
        a.setLength(y);
        ok(a.length() == y, "Passed!");
        a = new THREE.Vector4(0, 0, 0, 0);
        ok(a.length() == 0, "Passed!");
        a.setLength(y);
        ok(a.length() == 0, "Passed!");
    });
    test("lerp/clone", function () {
        var a = new THREE.Vector4(x, 0, z, 0);
        var b = new THREE.Vector4(0, -y, 0, -w);
        ok(a.lerp(a, 0).equals(a.lerp(a, 0.5)), "Passed!");
        ok(a.lerp(a, 0).equals(a.lerp(a, 1)), "Passed!");
        ok(a.clone().lerp(b, 0).equals(a), "Passed!");
        ok(a.clone().lerp(b, 0.5).x == x * 0.5, "Passed!");
        ok(a.clone().lerp(b, 0.5).y == -y * 0.5, "Passed!");
        ok(a.clone().lerp(b, 0.5).z == z * 0.5, "Passed!");
        ok(a.clone().lerp(b, 0.5).w == -w * 0.5, "Passed!");
        ok(a.clone().lerp(b, 1).equals(b), "Passed!");
    });
    test("equals", function () {
        var a = new THREE.Vector4(x, 0, z, 0);
        var b = new THREE.Vector4(0, -y, 0, -w);
        ok(a.x != b.x, "Passed!");
        ok(a.y != b.y, "Passed!");
        ok(a.z != b.z, "Passed!");
        ok(a.w != b.w, "Passed!");
        ok(!a.equals(b), "Passed!");
        ok(!b.equals(a), "Passed!");
        a.copy(b);
        ok(a.x == b.x, "Passed!");
        ok(a.y == b.y, "Passed!");
        ok(a.z == b.z, "Passed!");
        ok(a.w == b.w, "Passed!");
        ok(a.equals(b), "Passed!");
        ok(b.equals(a), "Passed!");
    });
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_cloth.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    var cloth;
    var clothFunction;
    var ballPosition;
    var ballSize;
    var windStrength;
    var windForce;
    var simulate;
    // -------
    /* testing cloth simulation */
    var pinsFormation = [];
    var pins = [6];
    pinsFormation.push(pins);
    pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    pinsFormation.push(pins);
    pins = [0];
    pinsFormation.push(pins);
    pins = []; // cut the rope ;)
    pinsFormation.push(pins);
    pins = [0, cloth.w]; // classic 2 pins
    pinsFormation.push(pins);
    pins = pinsFormation[1];
    function togglePins() {
        pins = pinsFormation[~~(Math.random() * pinsFormation.length)];
    }
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer;
    var clothGeometry;
    var sphere;
    var object, arrow;
    var rotate = true;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        // scene
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
        // camera
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.y = 50;
        camera.position.z = 1500;
        scene.add(camera);
        // lights
        var light, materials;
        scene.add(new THREE.AmbientLight(0x666666));
        light = new THREE.DirectionalLight(0xdfebff, 1.75);
        light.position.set(50, 200, 100);
        light.position.multiplyScalar(1.3);
        light.castShadow = true;
        //light.shadowCameraVisible = true;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;
        var d = 300;
        light.shadowCameraLeft = -d;
        light.shadowCameraRight = d;
        light.shadowCameraTop = d;
        light.shadowCameraBottom = -d;
        light.shadowCameraFar = 1000;
        light.shadowDarkness = 0.5;
        scene.add(light);
        // cloth material
        var clothTexture = THREE.ImageUtils.loadTexture('textures/patterns/circuit_pattern.png');
        clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
        clothTexture.anisotropy = 16;
        var clothMaterial = new THREE.MeshPhongMaterial({ alphaTest: 0.5, ambient: 0xffffff, color: 0xffffff, specular: 0x030303, emissive: 0x111111, shiness: 10, map: clothTexture, side: THREE.DoubleSide });
        // cloth geometry
        clothGeometry = new THREE.ParametricGeometry(clothFunction, cloth.w, cloth.h);
        clothGeometry.dynamic = true;
        clothGeometry.computeFaceNormals();
        var uniforms = { texture: { type: "t", value: clothTexture } };
        var vertexShader = document.getElementById('vertexShaderDepth').textContent;
        var fragmentShader = document.getElementById('fragmentShaderDepth').textContent;
        // cloth mesh
        object = new THREE.Mesh(clothGeometry, clothMaterial);
        object.position.set(0, 0, 0);
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add(object);
        object.customDepthMaterial = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader });
        // sphere
        var ballGeo = new THREE.SphereGeometry(ballSize, 20, 20);
        var ballMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        sphere = new THREE.Mesh(ballGeo, ballMaterial);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        scene.add(sphere);
        // arrow
        arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50, 0xff0000);
        arrow.position.set(-200, 0, -200);
        // scene.add( arrow );
        // ground
        var groundTexture = THREE.ImageUtils.loadTexture("textures/terrain/grasslight-big.jpg");
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(25, 25);
        groundTexture.anisotropy = 16;
        var groundMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, map: groundTexture });
        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(20000, 20000), groundMaterial);
        mesh.position.y = -250;
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add(mesh);
        // poles
        var poleGeo = new THREE.BoxGeometry(5, 375, 5);
        var poleMat = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x111111, shiness: 100 });
        var mesh = new THREE.Mesh(poleGeo, poleMat);
        mesh.position.x = -125;
        mesh.position.y = -62;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
        var mesh = new THREE.Mesh(poleGeo, poleMat);
        mesh.position.x = 125;
        mesh.position.y = -62;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
        var mesh = new THREE.Mesh(new THREE.BoxGeometry(255, 5, 5), poleMat);
        mesh.position.y = -250 + 750 / 2;
        mesh.position.x = 0;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
        var gg = new THREE.BoxGeometry(10, 10, 10);
        var mesh = new THREE.Mesh(gg, poleMat);
        mesh.position.y = -250;
        mesh.position.x = 125;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
        var mesh = new THREE.Mesh(gg, poleMat);
        mesh.position.y = -250;
        mesh.position.x = -125;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);
        //
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(scene.fog.color);
        container.appendChild(renderer.domElement);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMapEnabled = true;
        //
        stats = new Stats();
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
        sphere.visible = !true;
    }
    //
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        var time = Date.now();
        windStrength = Math.cos(time / 7000) * 20 + 40;
        windForce.set(Math.sin(time / 2000), Math.cos(time / 3000), Math.sin(time / 1000)).normalize().multiplyScalar(windStrength);
        arrow.setLength(windStrength);
        arrow.setDirection(windForce);
        simulate(time);
        render();
        stats.update();
    }
    function render() {
        var timer = Date.now() * 0.0002;
        var p = cloth.particles;
        for (var i = 0, il = p.length; i < il; i++) {
            clothGeometry.vertices[i].copy(p[i].position);
        }
        clothGeometry.computeFaceNormals();
        clothGeometry.computeVertexNormals();
        clothGeometry.normalsNeedUpdate = true;
        clothGeometry.verticesNeedUpdate = true;
        sphere.position.copy(ballPosition);
        if (rotate) {
            camera.position.x = Math.cos(timer) * 1500;
            camera.position.z = Math.sin(timer) * 1500;
        }
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_sprites.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    // -------
    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var FLOOR = -250;
    var container, stats;
    var camera, scene;
    var renderer;
    var mesh, helper;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var clock = new THREE.Clock();
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    init();
    animate();
    function init() {
        container = document.getElementById('container');
        camera = new THREE.PerspectiveCamera(30, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        camera.position.z = 2200;
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 2000, 10000);
        scene.add(camera);
        // GROUND
        var geometry = new THREE.PlaneBufferGeometry(16000, 16000);
        var material = new THREE.MeshPhongMaterial({ emissive: 0xbbbbbb });
        var ground = new THREE.Mesh(geometry, material);
        ground.position.set(0, FLOOR, 0);
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);
        ground.receiveShadow = true;
        // LIGHTS
        var ambient = new THREE.AmbientLight(0x222222);
        scene.add(ambient);
        var light = new THREE.DirectionalLight(0xebf3ff, 1.6);
        light.position.set(0, 140, 500).multiplyScalar(1.1);
        scene.add(light);
        light.castShadow = true;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 2048;
        var d = 390;
        light.shadowCameraLeft = -d;
        light.shadowCameraRight = d;
        light.shadowCameraTop = d * 1.5;
        light.shadowCameraBottom = -d;
        light.shadowCameraFar = 3500;
        //light.shadowCameraVisible = true;
        //
        var light = new THREE.DirectionalLight(0x497f13, 1);
        light.position.set(0, -1, 0);
        scene.add(light);
        // RENDERER
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.domElement.style.position = "relative";
        container.appendChild(renderer.domElement);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMapEnabled = true;
        // STATS
        stats = new Stats();
        container.appendChild(stats.domElement);
        //
        var loader = new THREE.JSONLoader();
        loader.load("models/skinned/knight.js", function (geometry, materials) {
            createScene(geometry, materials, 0, FLOOR, -300, 60);
        });
        // GUI
        initGUI();
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function ensureLoop(animation) {
        for (var i = 0; i < animation.hierarchy.length; i++) {
            var bone = animation.hierarchy[i];
            var first = bone.keys[0];
            var last = bone.keys[bone.keys.length - 1];
            last.pos = first.pos;
            last.rot = first.rot;
            last.scl = first.scl;
        }
    }
    function createScene(geometry, materials, x, y, z, s) {
        ensureLoop(geometry.animation);
        geometry.computeBoundingBox();
        var bb = geometry.boundingBox;
        var path = "textures/cube/Park2/";
        var format = '.jpg';
        var urls = [
            path + 'posx' + format, path + 'negx' + format,
            path + 'posy' + format, path + 'negy' + format,
            path + 'posz' + format, path + 'negz' + format
        ];
        //var envMap = THREE.ImageUtils.loadTextureCube( urls );
        //var map = THREE.ImageUtils.loadTexture( "textures/UV_Grid_Sm.jpg" );
        //var bumpMap = THREE.ImageUtils.generateDataTexture( 1, 1, new THREE.Color() );
        //var bumpMap = THREE.ImageUtils.loadTexture( "textures/water.jpg" );
        for (var i = 0; i < materials.length; i++) {
            var m = materials[i];
            m.skinning = true;
            m.morphTargets = true;
            m.specular.setHSL(0, 0, 0.1);
            m.color.setHSL(0.6, 0, 0.6);
            m.ambient.copy(m.color);
            //m.map = map;
            //m.envMap = envMap;
            //m.bumpMap = bumpMap;
            //m.bumpScale = 2;
            //m.combine = THREE.MixOperation;
            //m.reflectivity = 0.75;
            m.wrapAround = true;
        }
        mesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.position.set(x, y - bb.min.y * s, z);
        mesh.scale.set(s, s, s);
        scene.add(mesh);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        helper = new THREE.SkeletonHelper(mesh);
        helper.material.linewidth = 3;
        helper.visible = false;
        scene.add(helper);
        var animation = new THREE.Animation(mesh, geometry.animation);
        animation.play();
    }
    function initGUI() {
        var API = {
            'show model': true,
            'show skeleton': false
        };
        var gui = new dat.GUI();
        gui.add(API, 'show model').onChange(function () { mesh.visible = API['show model']; });
        gui.add(API, 'show skeleton').onChange(function () { helper.visible = API['show skeleton']; });
    }
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var delta = 0.75 * clock.getDelta();
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y = THREE.Math.clamp(camera.position.y + (-mouseY - camera.position.y) * .05, 0, 1000);
        camera.lookAt(scene.position);
        // update skinning
        THREE.AnimationHandler.update(delta);
        if (helper !== undefined)
            helper.update();
        // update morphs
        if (mesh) {
            var time = Date.now() * 0.001;
            // mouth
            mesh.morphTargetInfluences[1] = (1 + Math.sin(4 * time)) / 2;
            // frown ?
            mesh.morphTargetInfluences[2] = (1 + Math.sin(2 * time)) / 2;
            // eyes
            mesh.morphTargetInfluences[3] = (1 + Math.cos(4 * time)) / 2;
        }
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    // -------
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer;
    var mesh;
    init();
    animate();
    function init() {
        container = document.getElementById('container');
        //
        camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 1, 3500);
        camera.position.z = 2750;
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x050505, 2000, 3500);
        //
        scene.add(new THREE.AmbientLight(0x444444));
        var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
        light1.position.set(1, 1, 1);
        scene.add(light1);
        var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
        light2.position.set(0, -1, 0);
        scene.add(light2);
        //
        var triangles = 160000;
        var geometry = new THREE.BufferGeometry();
        // break geometry into
        // chunks of 21,845 triangles (3 unique vertices per triangle)
        // for indices to fit into 16 bit integer number
        // floor(2^16 / 3) = 21845
        var chunkSize = 21845;
        var indices = new Uint16Array(triangles * 3);
        for (var i = 0; i < indices.length; i++) {
            indices[i] = i % (3 * chunkSize);
        }
        var positions = new Float32Array(triangles * 3 * 3);
        var normals = new Float32Array(triangles * 3 * 3);
        var colors = new Float32Array(triangles * 3 * 3);
        var color = new THREE.Color();
        var n = 800, n2 = n / 2; // triangles spread in the cube
        var d = 12, d2 = d / 2; // individual triangle size
        var pA = new THREE.Vector3();
        var pB = new THREE.Vector3();
        var pC = new THREE.Vector3();
        var cb = new THREE.Vector3();
        var ab = new THREE.Vector3();
        for (var i = 0; i < positions.length; i += 9) {
            // positions
            var x = Math.random() * n - n2;
            var y = Math.random() * n - n2;
            var z = Math.random() * n - n2;
            var ax = x + Math.random() * d - d2;
            var ay = y + Math.random() * d - d2;
            var az = z + Math.random() * d - d2;
            var bx = x + Math.random() * d - d2;
            var by = y + Math.random() * d - d2;
            var bz = z + Math.random() * d - d2;
            var cx = x + Math.random() * d - d2;
            var cy = y + Math.random() * d - d2;
            var cz = z + Math.random() * d - d2;
            positions[i] = ax;
            positions[i + 1] = ay;
            positions[i + 2] = az;
            positions[i + 3] = bx;
            positions[i + 4] = by;
            positions[i + 5] = bz;
            positions[i + 6] = cx;
            positions[i + 7] = cy;
            positions[i + 8] = cz;
            // flat face normals
            pA.set(ax, ay, az);
            pB.set(bx, by, bz);
            pC.set(cx, cy, cz);
            cb.subVectors(pC, pB);
            ab.subVectors(pA, pB);
            cb.cross(ab);
            cb.normalize();
            var nx = cb.x;
            var ny = cb.y;
            var nz = cb.z;
            normals[i] = nx;
            normals[i + 1] = ny;
            normals[i + 2] = nz;
            normals[i + 3] = nx;
            normals[i + 4] = ny;
            normals[i + 5] = nz;
            normals[i + 6] = nx;
            normals[i + 7] = ny;
            normals[i + 8] = nz;
            // colors
            var vx = (x / n) + 0.5;
            var vy = (y / n) + 0.5;
            var vz = (z / n) + 0.5;
            color.setRGB(vx, vy, vz);
            colors[i] = color.r;
            colors[i + 1] = color.g;
            colors[i + 2] = color.b;
            colors[i + 3] = color.r;
            colors[i + 4] = color.g;
            colors[i + 5] = color.b;
            colors[i + 6] = color.r;
            colors[i + 7] = color.g;
            colors[i + 8] = color.b;
        }
        geometry.addAttribute('index', new THREE.BufferAttribute(indices, 1));
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        var offsets = triangles / chunkSize;
        for (var i = 0; i < offsets; i++) {
            var offset = {
                start: i * chunkSize * 3,
                index: i * chunkSize * 3,
                count: Math.min(triangles - (i * chunkSize), chunkSize) * 3
            };
            geometry.offsets.push(offset);
        }
        geometry.computeBoundingSphere();
        var material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa, ambient: 0xaaaaaa, specular: 0xffffff, shininess: 250,
            side: THREE.DoubleSide, vertexColors: THREE.VertexColors
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        //
        renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        container.appendChild(renderer.domElement);
        //
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var time = Date.now() * 0.001;
        mesh.rotation.x = time * 0.25;
        mesh.rotation.y = time * 0.5;
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera.html
(function () {
    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;
    var container, stats;
    var camera, scene, renderer, mesh;
    var cameraRig, activeCamera, activeHelper;
    var cameraPerspective, cameraOrtho;
    var cameraPerspectiveHelper, cameraOrthoHelper;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        scene = new THREE.Scene();
        //
        camera = new THREE.PerspectiveCamera(50, 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        camera.position.z = 2500;
        cameraPerspective = new THREE.PerspectiveCamera(50, 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT, 150, 1000);
        cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective);
        scene.add(cameraPerspectiveHelper);
        //
        cameraOrtho = new THREE.OrthographicCamera(0.5 * SCREEN_WIDTH / -2, 0.5 * SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / -2, 150, 1000);
        cameraOrthoHelper = new THREE.CameraHelper(cameraOrtho);
        scene.add(cameraOrthoHelper);
        //
        activeCamera = cameraPerspective;
        activeHelper = cameraPerspectiveHelper;
        // counteract different front orientation of cameras vs rig
        cameraOrtho.rotation.y = Math.PI;
        cameraPerspective.rotation.y = Math.PI;
        cameraRig = new THREE.Object3D();
        cameraRig.add(cameraPerspective);
        cameraRig.add(cameraOrtho);
        scene.add(cameraRig);
        //
        mesh = new THREE.Mesh(new THREE.SphereGeometry(100, 16, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }));
        scene.add(mesh);
        var mesh2 = new THREE.Mesh(new THREE.SphereGeometry(50, 16, 8), new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }));
        mesh2.position.y = 150;
        mesh.add(mesh2);
        var mesh3 = new THREE.Mesh(new THREE.SphereGeometry(5, 16, 8), new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true }));
        mesh3.position.z = 150;
        cameraRig.add(mesh3);
        //
        var geometry = new THREE.Geometry();
        for (var i = 0; i < 10000; i++) {
            var vertex = new THREE.Vector3();
            vertex.x = THREE.Math.randFloatSpread(2000);
            vertex.y = THREE.Math.randFloatSpread(2000);
            vertex.z = THREE.Math.randFloatSpread(2000);
            geometry.vertices.push(vertex);
        }
        var particles = new THREE.PointCloud(geometry, new THREE.PointCloudMaterial({ color: 0x888888 }));
        scene.add(particles);
        //
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.domElement.style.position = "relative";
        container.appendChild(renderer.domElement);
        renderer.autoClear = false;
        //
        stats = new Stats();
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('keydown', onKeyDown, false);
    }
    //
    function onKeyDown(event) {
        switch (event.keyCode) {
            case 79:
                activeCamera = cameraOrtho;
                activeHelper = cameraOrthoHelper;
                break;
            case 80:
                activeCamera = cameraPerspective;
                activeHelper = cameraPerspectiveHelper;
                break;
        }
    }
    ;
    //
    function onWindowResize(event) {
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        camera.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        cameraPerspective.aspect = 0.5 * SCREEN_WIDTH / SCREEN_HEIGHT;
        cameraPerspective.updateProjectionMatrix();
        cameraOrtho.left = -0.5 * SCREEN_WIDTH / 2;
        cameraOrtho.right = 0.5 * SCREEN_WIDTH / 2;
        cameraOrtho.top = SCREEN_HEIGHT / 2;
        cameraOrtho.bottom = -SCREEN_HEIGHT / 2;
        cameraOrtho.updateProjectionMatrix();
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var r = Date.now() * 0.0005;
        mesh.position.x = 700 * Math.cos(r);
        mesh.position.z = 700 * Math.sin(r);
        mesh.position.y = 700 * Math.sin(r);
        mesh.children[0].position.x = 70 * Math.cos(2 * r);
        mesh.children[0].position.z = 70 * Math.sin(r);
        if (activeCamera === cameraPerspective) {
            cameraPerspective.fov = 35 + 30 * Math.sin(0.5 * r);
            cameraPerspective.far = mesh.position.length();
            cameraPerspective.updateProjectionMatrix();
            cameraPerspectiveHelper.update();
            cameraPerspectiveHelper.visible = true;
            cameraOrthoHelper.visible = false;
        }
        else {
            cameraOrtho.far = mesh.position.length();
            cameraOrtho.updateProjectionMatrix();
            cameraOrthoHelper.update();
            cameraOrthoHelper.visible = true;
            cameraPerspectiveHelper.visible = false;
        }
        cameraRig.lookAt(mesh.position);
        renderer.clear();
        activeHelper.visible = false;
        renderer.setViewport(0, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
        renderer.render(scene, activeCamera);
        activeHelper.visible = true;
        renderer.setViewport(SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2, SCREEN_HEIGHT);
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_custom_attributes.html
(function () {
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var renderer, scene, camera, stats;
    var sphere, uniforms, attributes;
    var noise = [];
    var WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
    init();
    animate();
    function init() {
        camera = new THREE.PerspectiveCamera(30, WIDTH / HEIGHT, 1, 10000);
        camera.position.z = 300;
        scene = new THREE.Scene();
        attributes = {
            displacement: { type: 'f', value: [] }
        };
        uniforms = {
            amplitude: { type: "f", value: 1.0 },
            color: { type: "c", value: new THREE.Color(0xff2200) },
            texture: { type: "t", value: THREE.ImageUtils.loadTexture("textures/water.jpg") },
        };
        uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;
        var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            attributes: attributes,
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent
        });
        var radius = 50, segments = 128, rings = 64;
        var geometry = new THREE.SphereGeometry(radius, segments, rings);
        geometry.dynamic = true;
        sphere = new THREE.Mesh(geometry, shaderMaterial);
        var vertices = sphere.geometry.vertices;
        var values = attributes.displacement.value;
        for (var v = 0; v < vertices.length; v++) {
            values[v] = 0;
            noise[v] = Math.random() * 5;
        }
        scene.add(sphere);
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x050505);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(WIDTH, HEIGHT);
        var container = document.getElementById('container');
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var time = Date.now() * 0.01;
        sphere.rotation.y = sphere.rotation.z = 0.01 * time;
        uniforms.amplitude.value = 2.5 * Math.sin(sphere.rotation.y * 0.125);
        uniforms.color.value.offsetHSL(0.0005, 0, 0);
        for (var i = 0; i < attributes.displacement.value.length; i++) {
            attributes.displacement.value[i] = Math.sin(0.1 * i + time);
            noise[i] += 0.5 * (0.5 - Math.random());
            noise[i] = THREE.Math.clamp(noise[i], -5, 5);
            attributes.displacement.value[i] += noise[i];
        }
        attributes.displacement.needsUpdate = true;
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometries.html
(function () {
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.y = 400;
        scene = new THREE.Scene();
        var light, object;
        scene.add(new THREE.AmbientLight(0x404040));
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 1, 0);
        scene.add(light);
        var map = THREE.ImageUtils.loadTexture('textures/UV_Grid_Sm.jpg');
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        var material = new THREE.MeshLambertMaterial({ ambient: 0xbbbbbb, map: map, side: THREE.DoubleSide });
        //
        object = new THREE.Mesh(new THREE.SphereGeometry(75, 20, 10), material);
        object.position.set(-400, 0, 200);
        scene.add(object);
        object = new THREE.Mesh(new THREE.IcosahedronGeometry(75, 1), material);
        object.position.set(-200, 0, 200);
        scene.add(object);
        object = new THREE.Mesh(new THREE.OctahedronGeometry(75, 2), material);
        object.position.set(0, 0, 200);
        scene.add(object);
        object = new THREE.Mesh(new THREE.TetrahedronGeometry(75, 0), material);
        object.position.set(200, 0, 200);
        scene.add(object);
        //
        object = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 4, 4), material);
        object.position.set(-400, 0, 0);
        scene.add(object);
        object = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100, 4, 4, 4), material);
        object.position.set(-200, 0, 0);
        scene.add(object);
        object = new THREE.Mesh(new THREE.CircleGeometry(50, 20, 0, Math.PI * 2), material);
        object.position.set(0, 0, 0);
        scene.add(object);
        object = new THREE.Mesh(new THREE.RingGeometry(10, 50, 20, 5, 0, Math.PI * 2), material);
        object.position.set(200, 0, 0);
        scene.add(object);
        object = new THREE.Mesh(new THREE.CylinderGeometry(25, 75, 100, 40, 5), material);
        object.position.set(400, 0, 0);
        scene.add(object);
        //
        var points = [];
        for (var i = 0; i < 50; i++) {
            points.push(new THREE.Vector3(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, 0, (i - 5) * 2));
        }
        object = new THREE.Mesh(new THREE.LatheGeometry(points, 20), material);
        object.position.set(-400, 0, -200);
        scene.add(object);
        object = new THREE.Mesh(new THREE.TorusGeometry(50, 20, 20, 20), material);
        object.position.set(-200, 0, -200);
        scene.add(object);
        object = new THREE.Mesh(new THREE.TorusKnotGeometry(50, 10, 50, 20), material);
        object.position.set(0, 0, -200);
        scene.add(object);
        object = new THREE.AxisHelper(50);
        object.position.set(200, 0, -200);
        scene.add(object);
        object = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50);
        object.position.set(400, 0, -200);
        scene.add(object);
        //
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var timer = Date.now() * 0.0001;
        camera.position.x = Math.cos(timer) * 800;
        camera.position.z = Math.sin(timer) * 800;
        camera.lookAt(scene.position);
        for (var i = 0, l = scene.children.length; i < l; i++) {
            var object = scene.children[i];
            object.rotation.x = timer * 5;
            object.rotation.y = timer * 2.5;
        }
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_helpers.html
(function () {
    var scene, renderer;
    var camera, light;
    init();
    animate();
    function init() {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        //
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;
        scene = new THREE.Scene();
        light = new THREE.PointLight();
        light.position.set(200, 100, 150);
        scene.add(light);
        scene.add(new THREE.PointLightHelper(light, 5));
        var helper = new THREE.GridHelper(200, 10);
        helper.setColors(0x0000ff, 0x808080);
        helper.position.y = -150;
        scene.add(helper);
        var loader = new THREE.JSONLoader();
        loader.load('obj/leeperrysmith/LeePerrySmith.js', function (geometry, materials) {
            var material = new THREE.MeshLambertMaterial();
            var mesh = new THREE.Mesh(geometry, material);
            mesh.scale.multiplyScalar(50);
            scene.add(mesh);
            scene.add(new THREE.FaceNormalsHelper(mesh, 10));
            scene.add(new THREE.VertexNormalsHelper(mesh, 10));
            var helper = new THREE.WireframeHelper(mesh);
            helper.material.depthTest = false;
            helper.material.opacity = 0.25;
            helper.material.transparent = true;
            scene.add(helper);
            scene.add(new THREE.BoxHelper(mesh));
        });
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
        requestAnimationFrame(animate);
        var time = -performance.now() * 0.0003;
        camera.position.x = 400 * Math.cos(time);
        camera.position.z = 400 * Math.sin(time);
        camera.lookAt(scene.position);
        light.position.x = Math.sin(time * 1.7) * 300;
        light.position.y = Math.cos(time * 1.5) * 400;
        light.position.z = Math.cos(time * 1.3) * 300;
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
(function () {
    var container, stats;
    var camera, scene, raycaster, renderer;
    var mouse = new THREE.Vector2(), INTERSECTED;
    var radius = 100, theta = 0;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        var info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> webgl - interactive cubes';
        container.appendChild(info);
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
        scene = new THREE.Scene();
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);
        var geometry = new THREE.BoxGeometry(20, 20, 20);
        for (var i = 0; i < 2000; i++) {
            var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            scene.add(object);
        }
        raycaster = new THREE.Raycaster();
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.sortObjects = false;
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onDocumentMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        theta += 0.1;
        camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
        camera.lookAt(scene.position);
        camera.updateMatrixWorld();
        // find intersections
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
                if (INTERSECTED)
                    INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                INTERSECTED = intersects[0].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex(0xff0000);
            }
        }
        else {
            if (INTERSECTED)
                INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = null;
        }
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_sprites.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    var material;
    var container;
    var pcBuffer;
    var v;
    // -------
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var renderer, scene, camera, stats;
    var pointclouds;
    var raycaster, intersects;
    var mouse = new THREE.Vector2();
    var intersection = null;
    var spheres = [];
    var spheresIndex = 0;
    var clock;
    var threshold = 0.1;
    var pointSize = 0.05;
    var width = 150;
    var length = 150;
    var rotateY = new THREE.Matrix4().makeRotationY(0.005);
    init();
    animate();
    function generatePointCloudGeometry(color, width, length) {
        var geometry = new THREE.BufferGeometry();
        var numPoints = width * length;
        var positions = new Float32Array(numPoints * 3);
        var colors = new Float32Array(numPoints * 3);
        var k = 0;
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < length; j++) {
                var u = i / width;
                var v = j / length;
                var x = u - 0.5;
                var y = (Math.cos(u * Math.PI * 8) + Math.sin(v * Math.PI * 8)) / 20;
                var z = v - 0.5;
                positions[3 * k] = x;
                positions[3 * k + 1] = y;
                positions[3 * k + 2] = z;
                var intensity = (y + 0.1) * 5;
                colors[3 * k] = color.r * intensity;
                colors[3 * k + 1] = color.g * intensity;
                colors[3 * k + 2] = color.b * intensity;
                k++;
            }
        }
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.computeBoundingBox();
        return geometry;
    }
    function generatePointcloud(color, width, length) {
        var geometry = generatePointCloudGeometry(color, width, length);
        var material = new THREE.PointCloudMaterial({ size: pointSize, vertexColors: THREE.VertexColors });
        var pointcloud = new THREE.PointCloud(geometry, material);
        return pointcloud;
    }
    function generateIndexedPointcloud(color, width, length) {
        var geometry = generatePointCloudGeometry(color, width, length);
        var numPoints = width * length;
        var indices = new Uint16Array(numPoints);
        var k = 0;
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < length; j++) {
                indices[k] = k;
                k++;
            }
        }
        geometry.addAttribute('index', new THREE.BufferAttribute(indices, 1));
        var material = new THREE.PointCloudMaterial({ size: pointSize, vertexColors: THREE.VertexColors });
        var pointcloud = new THREE.PointCloud(geometry, material);
        return pointcloud;
    }
    function generateIndexedWithOffsetPointcloud(color, width, length) {
        var geometry = generatePointCloudGeometry(color, width, length);
        var numPoints = width * length;
        var indices = new Uint16Array(numPoints);
        var k = 0;
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < length; j++) {
                indices[k] = k;
                k++;
            }
        }
        geometry.addAttribute('index', new THREE.BufferAttribute(indices, 1));
        var offset = { start: 0, count: indices.length, index: 0 };
        geometry.offsets.push(offset);
        var material = new THREE.PointCloudMaterial({ size: pointSize, vertexColors: THREE.VertexColors });
        var pointcloud = new THREE.PointCloud(geometry, material);
        return pointcloud;
    }
    function generateRegularPointcloud(color, width, length) {
        var geometry = new THREE.Geometry();
        var numPoints = width * length;
        var colors = [];
        var k = 0;
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < length; j++) {
                var u = i / width;
                var v = j / length;
                var x = u - 0.5;
                var y = (Math.cos(u * Math.PI * 8) + Math.sin(v * Math.PI * 8)) / 20;
                var z = v - 0.5;
                var vec = new THREE.Vector3(x, y, z);
                var intensity = (y + 0.1) * 7;
                colors[3 * k] = color.r * intensity;
                colors[3 * k + 1] = color.g * intensity;
                colors[3 * k + 2] = color.b * intensity;
                geometry.vertices.push(vec);
                colors[k] = (color.clone().multiplyScalar(intensity));
                k++;
            }
        }
        geometry.colors = colors;
        geometry.computeBoundingBox();
        var material = new THREE.PointCloudMaterial({ size: pointSize, vertexColors: THREE.VertexColors });
        var pointcloud = new THREE.PointCloud(geometry, material);
        return pointcloud;
    }
    function init() {
        container = document.getElementById('container');
        scene = new THREE.Scene();
        clock = new THREE.Clock();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        camera.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 20));
        camera.applyMatrix(new THREE.Matrix4().makeRotationX(-0.5));
        //
        pcBuffer = generatePointcloud(new THREE.Color(1, 0, 0), width, length);
        pcBuffer.scale.set(10, 10, 10);
        pcBuffer.position.set(-5, 0, 5);
        scene.add(pcBuffer);
        var pcIndexed = generateIndexedPointcloud(new THREE.Color(0, 1, 0), width, length);
        pcIndexed.scale.set(10, 10, 10);
        pcIndexed.position.set(5, 0, 5);
        scene.add(pcIndexed);
        var pcIndexedOffset = generateIndexedWithOffsetPointcloud(new THREE.Color(0, 1, 1), width, length);
        pcIndexedOffset.scale.set(10, 10, 10);
        pcIndexedOffset.position.set(5, 0, -5);
        scene.add(pcIndexedOffset);
        var pcRegular = generateRegularPointcloud(new THREE.Color(1, 0, 1), width, length);
        pcRegular.scale.set(10, 10, 10);
        pcRegular.position.set(-5, 0, -5);
        scene.add(pcRegular);
        pointclouds = [pcBuffer, pcIndexed, pcIndexedOffset, pcRegular];
        //
        var sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, shading: THREE.FlatShading });
        for (var i = 0; i < 40; i++) {
            var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            scene.add(sphere);
            spheres.push(sphere);
        }
        //
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        //
        raycaster = new THREE.Raycaster();
        raycaster.params.PointCloud.threshold = threshold;
        //
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
    }
    function onDocumentMouseMove(event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    var toggle = 0;
    function render() {
        camera.applyMatrix(rotateY);
        camera.updateMatrixWorld();
        raycaster.setFromCamera(mouse, camera);
        var intersections = raycaster.intersectObjects(pointclouds);
        intersection = (intersections.length) > 0 ? intersections[0] : null;
        if (toggle > 0.02 && intersection !== null) {
            spheres[spheresIndex].position.copy(intersection.point);
            spheres[spheresIndex].scale.set(1, 1, 1);
            spheresIndex = (spheresIndex + 1) % spheres.length;
            toggle = 0;
        }
        for (var i = 0; i < spheres.length; i++) {
            var sphere = spheres[i];
            sphere.scale.multiplyScalar(0.98);
            sphere.scale.clampScalar(0.01, 1);
        }
        toggle += clock.getDelta();
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_lensflares.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    var controls;
    // -------
    var container, stats;
    var camera, scene, renderer;
    var clock = new THREE.Clock();
    var composer;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        // camera
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000);
        camera.position.z = 250;
        controls = new THREE.FlyControls(camera);
        controls.movementSpeed = 2500;
        controls.domElement = container;
        controls.rollSpeed = Math.PI / 6;
        controls.autoForward = false;
        controls.dragToLook = false;
        // scene
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 3500, 15000);
        scene.fog.color.setHSL(0.51, 0.4, 0.01);
        // world
        var s = 250;
        var cube = new THREE.BoxGeometry(s, s, s);
        var material = new THREE.MeshPhongMaterial({ ambient: 0x333333, color: 0xffffff, specular: 0xffffff, shininess: 50 });
        for (var i = 0; i < 3000; i++) {
            var mesh = new THREE.Mesh(cube, material);
            mesh.position.x = 8000 * (2.0 * Math.random() - 1.0);
            mesh.position.y = 8000 * (2.0 * Math.random() - 1.0);
            mesh.position.z = 8000 * (2.0 * Math.random() - 1.0);
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            mesh.rotation.z = Math.random() * Math.PI;
            mesh.matrixAutoUpdate = false;
            mesh.updateMatrix();
            scene.add(mesh);
        }
        // lights
        var ambient = new THREE.AmbientLight(0xffffff);
        ambient.color.setHSL(0.1, 0.3, 0.2);
        scene.add(ambient);
        var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
        dirLight.position.set(0, -1, 0).normalize();
        scene.add(dirLight);
        dirLight.color.setHSL(0.1, 0.7, 0.5);
        // lens flares
        var textureFlare0 = THREE.ImageUtils.loadTexture("textures/lensflare/lensflare0.png");
        var textureFlare2 = THREE.ImageUtils.loadTexture("textures/lensflare/lensflare2.png");
        var textureFlare3 = THREE.ImageUtils.loadTexture("textures/lensflare/lensflare3.png");
        addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
        addLight(0.08, 0.8, 0.5, 0, 0, -1000);
        addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);
        function addLight(h, s, l, x, y, z) {
            var light = new THREE.PointLight(0xffffff, 1.5, 4500);
            light.color.setHSL(h, s, l);
            light.position.set(x, y, z);
            scene.add(light);
            var flareColor = new THREE.Color(0xffffff);
            flareColor.setHSL(h, s, l + 0.5);
            var lensFlare = new THREE.LensFlare(textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor);
            lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
            lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
            lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
            lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
            lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
            lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
            lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);
            lensFlare.customUpdateCallback = lensFlareUpdateCallback;
            lensFlare.position.copy(light.position);
            scene.add(lensFlare);
        }
        // renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        //
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        // stats
        stats = new Stats();
        container.appendChild(stats.domElement);
        // events
        window.addEventListener('resize', onWindowResize, false);
    }
    //
    function lensFlareUpdateCallback(object) {
        var f, fl = object.lensFlares.length;
        var flare;
        var vecX = -object.positionScreen.x * 2;
        var vecY = -object.positionScreen.y * 2;
        for (f = 0; f < fl; f++) {
            flare = object.lensFlares[f];
            flare.x = object.positionScreen.x + vecX * flare.distance;
            flare.y = object.positionScreen.y + vecY * flare.distance;
            flare.rotation = 0;
        }
        object.lensFlares[2].y += 0.025;
        object.lensFlares[3].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad(45);
    }
    //
    function onWindowResize(event) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var delta = clock.getDelta();
        controls.update(delta);
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_lights_hemisphere.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    var morph;
    // -------
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var camera, scene, renderer, dirLight, hemiLight;
    var morphs = [];
    var stats;
    var clock = new THREE.Clock();
    init();
    animate();
    function init() {
        var container = document.getElementById('container');
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
        camera.position.set(0, 0, 250);
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 1, 5000);
        scene.fog.color.setHSL(0.6, 0, 1);
        /*
        controls = new THREE.TrackballControls( camera );

        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;

        controls.noZoom = false;
        controls.noPan = false;

        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.15;
        */
        // LIGHTS
        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 500, 0);
        scene.add(hemiLight);
        //
        dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(50);
        scene.add(dirLight);
        dirLight.castShadow = true;
        dirLight.shadowMapWidth = 2048;
        dirLight.shadowMapHeight = 2048;
        var d = 50;
        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;
        dirLight.shadowCameraFar = 3500;
        dirLight.shadowBias = -0.0001;
        dirLight.shadowDarkness = 0.35;
        //dirLight.shadowCameraVisible = true;
        // GROUND
        var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
        var groundMat = new THREE.MeshPhongMaterial({ ambient: 0xffffff, color: 0xffffff, specular: 0x050505 });
        groundMat.color.setHSL(0.095, 1, 0.75);
        var ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -33;
        scene.add(ground);
        ground.receiveShadow = true;
        // SKYDOME
        var vertexShader = document.getElementById('vertexShader').textContent;
        var fragmentShader = document.getElementById('fragmentShader').textContent;
        var uniforms = {
            topColor: { type: "c", value: new THREE.Color(0x0077ff) },
            bottomColor: { type: "c", value: new THREE.Color(0xffffff) },
            offset: { type: "f", value: 33 },
            exponent: { type: "f", value: 0.6 }
        };
        uniforms.topColor.value.copy(hemiLight.color);
        scene.fog.color.copy(uniforms.bottomColor.value);
        var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
        var skyMat = new THREE.ShaderMaterial({ vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide });
        var sky = new THREE.Mesh(skyGeo, skyMat);
        scene.add(sky);
        // MODEL
        var loader = new THREE.JSONLoader();
        loader.load("models/animated/flamingo.js", function (geometry) {
            morphColorsToFaceColors(geometry);
            geometry.computeMorphNormals();
            var material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 20, morphTargets: true, morphNormals: true, vertexColors: THREE.FaceColors, shading: THREE.FlatShading });
            var meshAnim = new THREE.MorphAnimMesh(geometry, material);
            meshAnim.duration = 1000;
            var s = 0.35;
            meshAnim.scale.set(s, s, s);
            meshAnim.position.y = 15;
            meshAnim.rotation.y = -1;
            meshAnim.castShadow = true;
            meshAnim.receiveShadow = true;
            scene.add(meshAnim);
            morphs.push(meshAnim);
        });
        // RENDERER
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMapEnabled = true;
        renderer.shadowMapCullFace = THREE.CullFaceBack;
        // STATS
        stats = new Stats();
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('keydown', onKeyDown, false);
    }
    function morphColorsToFaceColors(geometry) {
        if (geometry.morphColors && geometry.morphColors.length) {
            var colorMap = geometry.morphColors[0];
            for (var i = 0; i < colorMap.colors.length; i++) {
                geometry.faces[i].color = colorMap.colors[i];
            }
        }
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onKeyDown(event) {
        switch (event.keyCode) {
            case 72:
                hemiLight.visible = !hemiLight.visible;
                break;
            case 68:
                dirLight.visible = !dirLight.visible;
                break;
        }
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var delta = clock.getDelta();
        //controls.update();
        for (var i = 0; i < morphs.length; i++) {
            morph = morphs[i];
            morph.updateAnimation(1000 * delta);
        }
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_lines_colors.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    var hilbert3D;
    var stats;
    // -------
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var effectFXAA;
    var mouseX = 0, mouseY = 0, windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2, camera, scene, renderer, material, composer;
    init();
    animate();
    function init() {
        var i, container;
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(33, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 700;
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer({ antialias: false });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        container.appendChild(renderer.domElement);
        var geometry = new THREE.Geometry(), geometry2 = new THREE.Geometry(), geometry3 = new THREE.Geometry(), points = hilbert3D(new THREE.Vector3(0, 0, 0), 200.0, 2, 0, 1, 2, 3, 4, 5, 6, 7), colors = [], colors2 = [], colors3 = [];
        for (i = 0; i < points.length; i++) {
            geometry.vertices.push(points[i]);
            colors[i] = new THREE.Color(0xffffff);
            colors[i].setHSL(0.6, 1.0, Math.max(0, (200 - points[i].x) / 400) * 0.5 + 0.5);
            colors2[i] = new THREE.Color(0xffffff);
            colors2[i].setHSL(0.3, 1.0, Math.max(0, (200 + points[i].x) / 400) * 0.5);
            colors3[i] = new THREE.Color(0xffffff);
            colors3[i].setHSL(i / points.length, 1.0, 0.5);
        }
        geometry2.vertices = geometry3.vertices = geometry.vertices;
        geometry.colors = colors;
        geometry2.colors = colors2;
        geometry3.colors = colors3;
        // lines
        material = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 1, linewidth: 3, vertexColors: THREE.VertexColors });
        var line, p, scale = 0.3, d = 225;
        var parameters = [
            [material, scale * 1.5, [-d, 0, 0], geometry],
            [material, scale * 1.5, [0, 0, 0], geometry2],
            [material, scale * 1.5, [d, 0, 0], geometry3]
        ];
        for (i = 0; i < parameters.length; ++i) {
            p = parameters[i];
            line = new THREE.Line(p[3], p[0]);
            line.scale.x = line.scale.y = line.scale.z = p[1];
            line.position.x = p[2][0];
            line.position.y = p[2][1];
            line.position.z = p[2][2];
            scene.add(line);
        }
        //
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        //container.appendChild( stats.domElement );
        //
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        //
        var renderModel = new THREE.RenderPass(scene, camera);
        var effectBloom = new THREE.BloomPass(1.3);
        var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
        effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        var width = window.innerWidth || 2;
        var height = window.innerHeight || 2;
        effectFXAA.uniforms['resolution'].value.set(1 / width, 1 / height);
        effectCopy.renderToScreen = true;
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderModel);
        composer.addPass(effectFXAA);
        composer.addPass(effectBloom);
        composer.addPass(effectCopy);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
        composer.reset();
    }
    //
    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }
    function onDocumentTouchStart(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (-mouseY + 200 - camera.position.y) * .05;
        camera.lookAt(scene.position);
        var time = Date.now() * 0.0005;
        for (var i = 0; i < scene.children.length; i++) {
            var object = scene.children[i];
            if (object instanceof THREE.Line)
                object.rotation.y = time * (i % 2 ? 1 : -1);
        }
        renderer.clear();
        composer.render();
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_awd.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    // -------
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer, objects, controls;
    var particleLight, pointLight;
    var trunk;
    var loader = new THREE.AWDLoader();
    loader.materialFactory = createMaterial;
    loader.load('./models/awd/simple/simple.awd', function (_trunk) {
        trunk = _trunk;
        init();
        render();
    });
    function createMaterial(name) {
        // console.log( name );
        // var mat = new THREE.MeshPhongMaterial({
        // 	color: 0xaaaaaa,
        // 	shininess: 20
        // });
        // return mat;
        return null;
    }
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.set(70, 50, -100);
        controls = new THREE.OrbitControls(camera);
        scene = new THREE.Scene();
        // Add the AWD SCENE
        scene.add(trunk);
        // Lights
        scene.add(new THREE.AmbientLight(0x606060));
        var directionalLight = new THREE.DirectionalLight(0xeeeeee);
        directionalLight.position.set(.2, -1, .2);
        directionalLight.position.normalize();
        scene.add(directionalLight);
        pointLight = new THREE.PointLight(0xffffff, .6);
        scene.add(pointLight);
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function render() {
        requestAnimationFrame(render);
        var timer = Date.now() * 0.0005;
        pointLight.position.x = Math.sin(timer * 4) * 3000;
        pointLight.position.y = 600;
        pointLight.position.z = Math.cos(timer * 4) * 3000;
        renderer.render(scene, camera);
        stats.update();
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    // -------
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer, objects;
    var particleLight;
    var materials = [];
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.set(0, 200, 800);
        scene = new THREE.Scene();
        // Grid
        var line_material = new THREE.LineBasicMaterial({ color: 0x303030 }), geometry = new THREE.Geometry(), floor = -75, step = 25;
        for (var i = 0; i <= 40; i++) {
            geometry.vertices.push(new THREE.Vector3(-500, floor, i * step - 500));
            geometry.vertices.push(new THREE.Vector3(500, floor, i * step - 500));
            geometry.vertices.push(new THREE.Vector3(i * step - 500, floor, -500));
            geometry.vertices.push(new THREE.Vector3(i * step - 500, floor, 500));
        }
        var line = new THREE.Line(geometry, line_material, THREE.LinePieces);
        scene.add(line);
        // Materials
        var texture = new THREE.Texture(generateTexture());
        texture.needsUpdate = true;
        materials.push(new THREE.MeshLambertMaterial({ map: texture, transparent: true }));
        materials.push(new THREE.MeshLambertMaterial({ color: 0xdddddd, shading: THREE.FlatShading }));
        materials.push(new THREE.MeshPhongMaterial({ ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading }));
        materials.push(new THREE.MeshNormalMaterial());
        materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, blending: THREE.AdditiveBlending }));
        //materials.push( new THREE.MeshBasicMaterial( { color: 0xff0000, blending: THREE.SubtractiveBlending } ) );
        materials.push(new THREE.MeshLambertMaterial({ color: 0xdddddd, shading: THREE.SmoothShading }));
        materials.push(new THREE.MeshPhongMaterial({ ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, map: texture, transparent: true }));
        materials.push(new THREE.MeshNormalMaterial({ shading: THREE.SmoothShading }));
        materials.push(new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true }));
        materials.push(new THREE.MeshDepthMaterial());
        materials.push(new THREE.MeshLambertMaterial({ color: 0x666666, emissive: 0xff0000, ambient: 0x000000, shading: THREE.SmoothShading }));
        materials.push(new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0x666666, emissive: 0xff0000, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true }));
        materials.push(new THREE.MeshBasicMaterial({ map: texture, transparent: true }));
        // Spheres geometry
        var geometry_smooth = new THREE.SphereGeometry(70, 32, 16);
        var geometry_flat = new THREE.SphereGeometry(70, 32, 16);
        var geometry_pieces = new THREE.SphereGeometry(70, 32, 16); // Extra geometry to be broken down for MeshFaceMaterial
        for (var i = 0, l = geometry_pieces.faces.length; i < l; i++) {
            var face = geometry_pieces.faces[i];
            face.materialIndex = Math.floor(Math.random() * materials.length);
        }
        // isn't used.
        // geometry_pieces.materials = materials;
        materials.push(new THREE.MeshFaceMaterial(materials));
        objects = [];
        var sphere, geometry, material;
        for (var i = 0, l = materials.length; i < l; i++) {
            material = materials[i];
            geometry = material instanceof THREE.MeshFaceMaterial ? geometry_pieces :
                (material.shading == THREE.FlatShading ? geometry_flat : geometry_smooth);
            sphere = new THREE.Mesh(geometry, material);
            sphere.position.x = (i % 4) * 200 - 400;
            sphere.position.z = Math.floor(i / 4) * 200 - 200;
            sphere.rotation.x = Math.random() * 200 - 100;
            sphere.rotation.y = Math.random() * 200 - 100;
            sphere.rotation.z = Math.random() * 200 - 100;
            objects.push(sphere);
            scene.add(sphere);
        }
        particleLight = new THREE.Mesh(new THREE.SphereGeometry(4, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        scene.add(particleLight);
        // Lights
        scene.add(new THREE.AmbientLight(0x111111));
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.125);
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        scene.add(directionalLight);
        var pointLight = new THREE.PointLight(0xffffff, 1);
        particleLight.add(pointLight);
        //
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        //
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function generateTexture() {
        var canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        var context = canvas.getContext('2d');
        var image = context.getImageData(0, 0, 256, 256);
        var x = 0, y = 0;
        for (var i = 0, j = 0, l = image.data.length; i < l; i += 4, j++) {
            x = j % 256;
            y = x == 0 ? y + 1 : y;
            image.data[i] = 255;
            image.data[i + 1] = 255;
            image.data[i + 2] = 255;
            image.data[i + 3] = Math.floor(x ^ y);
        }
        context.putImageData(image, 0, 0);
        return canvas;
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var timer = 0.0001 * Date.now();
        camera.position.x = Math.cos(timer) * 1000;
        camera.position.z = Math.sin(timer) * 1000;
        camera.lookAt(scene.position);
        for (var i = 0, l = objects.length; i < l; i++) {
            var object = objects[i];
            object.rotation.x += 0.01;
            object.rotation.y += 0.005;
        }
        materials[materials.length - 3].emissive.setHSL(0.54, 1, 0.35 * (0.5 + 0.5 * Math.sin(35 * timer)));
        materials[materials.length - 4].emissive.setHSL(0.04, 1, 0.35 * (0.5 + 0.5 * Math.cos(35 * timer)));
        particleLight.position.x = Math.sin(timer * 7) * 300;
        particleLight.position.y = Math.cos(timer * 5) * 400;
        particleLight.position.z = Math.cos(timer * 3) * 300;
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html
(function () {
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer;
    var geometry, objects;
    var mouseX = 0, mouseY = 0;
    var mesh;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 15000);
        camera.position.z = 500;
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1, 15000);
        var light = new THREE.PointLight(0xff2200);
        light.position.set(100, 100, 100);
        scene.add(light);
        var amblight = new THREE.AmbientLight(0x111111);
        scene.add(amblight);
        var geometry = new THREE.BoxGeometry(100, 100, 100);
        var material = new THREE.MeshLambertMaterial({ color: 0xffffff, morphTargets: true });
        // construct 8 blend shapes
        for (var i = 0; i < geometry.vertices.length; i++) {
            var vertices = [];
            for (var v = 0; v < geometry.vertices.length; v++) {
                vertices.push(geometry.vertices[v].clone());
                if (v === i) {
                    vertices[vertices.length - 1].x *= 2;
                    vertices[vertices.length - 1].y *= 2;
                    vertices[vertices.length - 1].z *= 2;
                }
            }
            geometry.morphTargets.push({ name: "target" + i, vertices: vertices });
        }
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        //
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x222222);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.sortObjects = false;
        container.appendChild(renderer.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY) * 2;
    }
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        mesh.rotation.y += 0.01;
        //mesh.morphTargetInfluences[ 0 ] = Math.sin( mesh.rotation.y ) * 0.5 + 0.5;
        //camera.position.x += ( mouseX - camera.position.x ) * .005;
        camera.position.y += (-mouseY - camera.position.y) * .01;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_particles_billboards.html
(function () {
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer, particles, geometry, material, i, h, color, sprite, size;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.001);
        geometry = new THREE.Geometry();
        sprite = THREE.ImageUtils.loadTexture("textures/sprites/disc.png");
        for (i = 0; i < 10000; i++) {
            var vertex = new THREE.Vector3();
            vertex.x = 2000 * Math.random() - 1000;
            vertex.y = 2000 * Math.random() - 1000;
            vertex.z = 2000 * Math.random() - 1000;
            geometry.vertices.push(vertex);
        }
        material = new THREE.PointCloudMaterial({ size: 35, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true });
        material.color.setHSL(1.0, 0.3, 0.7);
        particles = new THREE.PointCloud(geometry, material);
        scene.add(particles);
        //
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        //
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }
    function onDocumentTouchStart(event) {
        if (event.touches.length == 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var time = Date.now() * 0.00005;
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        h = (360 * (1.0 + time) % 360) / 360;
        material.color.setHSL(h, 0.5, 0.5);
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing.html
(function () {
    var camera, scene, renderer, composer;
    var object, light;
    init();
    animate();
    function init() {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        //
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1, 1000);
        object = new THREE.Object3D();
        scene.add(object);
        var geometry = new THREE.SphereGeometry(1, 4, 4);
        var material = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading });
        for (var i = 0; i < 100; i++) {
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(Math.random() * 400);
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
            object.add(mesh);
        }
        scene.add(new THREE.AmbientLight(0x222222));
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        scene.add(light);
        // postprocessing
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(new THREE.RenderPass(scene, camera));
        var effect = new THREE.ShaderPass(THREE.DotScreenShader);
        effect.uniforms['scale'].value = 4;
        composer.addPass(effect);
        var effect = new THREE.ShaderPass(THREE.RGBShiftShader);
        effect.uniforms['amount'].value = 0.0015;
        effect.renderToScreen = true;
        composer.addPass(effect);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
        requestAnimationFrame(animate);
        object.rotation.x += 0.005;
        object.rotation.y += 0.01;
        composer.render();
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_shader.html
(function () {
    if (!Detector.webgl)
        Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer;
    var uniforms;
    init();
    animate();
    function init() {
        container = document.getElementById('container');
        camera = new THREE.Camera();
        camera.position.z = 1;
        scene = new THREE.Scene();
        var geometry = new THREE.PlaneBufferGeometry(2, 2);
        uniforms = {
            time: { type: "f", value: 1.0 },
            resolution: { type: "v2", value: new THREE.Vector2() }
        };
        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
        });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        onWindowResize();
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.resolution.value.x = renderer.domElement.width;
        uniforms.resolution.value.y = renderer.domElement.height;
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        uniforms.time.value += 0.05;
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_sprites.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    var material;
    // -------
    var camera, scene, renderer;
    var cameraOrtho, sceneOrtho;
    var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;
    var mapC;
    var group;
    init();
    animate();
    function init() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        camera = new THREE.PerspectiveCamera(60, width / height, 1, 2100);
        camera.position.z = 1500;
        cameraOrtho = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 1, 10);
        cameraOrtho.position.z = 10;
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1500, 2100);
        sceneOrtho = new THREE.Scene();
        // create sprites
        var amount = 200;
        var radius = 500;
        var mapA = THREE.ImageUtils.loadTexture("textures/sprite0.png", undefined, createHUDSprites);
        var mapB = THREE.ImageUtils.loadTexture("textures/sprite1.png");
        mapC = THREE.ImageUtils.loadTexture("textures/sprite2.png");
        group = new THREE.Group();
        var materialC = new THREE.SpriteMaterial({ map: mapC, color: 0xffffff, fog: true });
        var materialB = new THREE.SpriteMaterial({ map: mapB, color: 0xffffff, fog: true });
        for (var a = 0; a < amount; a++) {
            var x = Math.random() - 0.5;
            var y = Math.random() - 0.5;
            var z = Math.random() - 0.5;
            if (z < 0) {
                material = materialB.clone();
            }
            else {
                material = materialC.clone();
                material.color.setHSL(0.5 * Math.random(), 0.75, 0.5);
                material.map.offset.set(-0.5, -0.5);
                material.map.repeat.set(2, 2);
            }
            var sprite = new THREE.Sprite(material);
            sprite.position.set(x, y, z);
            sprite.position.normalize();
            sprite.position.multiplyScalar(radius);
            group.add(sprite);
        }
        scene.add(group);
        // renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false; // To allow render overlay on top of sprited sphere
        document.body.appendChild(renderer.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function createHUDSprites(texture) {
        var material = new THREE.SpriteMaterial({ map: texture });
        var width = material.map.image.width;
        var height = material.map.image.height;
        spriteTL = new THREE.Sprite(material);
        spriteTL.scale.set(width, height, 1);
        sceneOrtho.add(spriteTL);
        spriteTR = new THREE.Sprite(material);
        spriteTR.scale.set(width, height, 1);
        sceneOrtho.add(spriteTR);
        spriteBL = new THREE.Sprite(material);
        spriteBL.scale.set(width, height, 1);
        sceneOrtho.add(spriteBL);
        spriteBR = new THREE.Sprite(material);
        spriteBR.scale.set(width, height, 1);
        sceneOrtho.add(spriteBR);
        spriteC = new THREE.Sprite(material);
        spriteC.scale.set(width, height, 1);
        sceneOrtho.add(spriteC);
        updateHUDSprites();
    }
    ;
    function updateHUDSprites() {
        var width = window.innerWidth / 2;
        var height = window.innerHeight / 2;
        var material = spriteTL.material;
        var imageWidth = material.map.image.width / 2;
        var imageHeight = material.map.image.height / 2;
        spriteTL.position.set(-width + imageWidth, height - imageHeight, 1); // top left
        spriteTR.position.set(width - imageWidth, height - imageHeight, 1); // top right
        spriteBL.position.set(-width + imageWidth, -height + imageHeight, 1); // bottom left
        spriteBR.position.set(width - imageWidth, -height + imageHeight, 1); // bottom right
        spriteC.position.set(0, 0, 1); // center
    }
    ;
    function onWindowResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        cameraOrtho.left = -width / 2;
        cameraOrtho.right = width / 2;
        cameraOrtho.top = height / 2;
        cameraOrtho.bottom = -height / 2;
        cameraOrtho.updateProjectionMatrix();
        updateHUDSprites();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        var time = Date.now() / 1000;
        for (var i = 0, l = group.children.length; i < l; i++) {
            var sprite = group.children[i];
            var material = sprite.material;
            var scale = Math.sin(time + sprite.position.x * 0.01) * 0.3 + 1.0;
            var imageWidth = 1;
            var imageHeight = 1;
            if (material.map && material.map.image && material.map.image.width) {
                imageWidth = material.map.image.width;
                imageHeight = material.map.image.height;
            }
            sprite.material.rotation += 0.1 * (i / l);
            sprite.scale.set(scale * imageWidth, scale * imageHeight, 1.0);
            if (material.map !== mapC) {
                material.opacity = Math.sin(time + sprite.position.x * 0.01) * 0.4 + 0.6;
            }
        }
        group.rotation.x = time * 0.5;
        group.rotation.y = time * 0.75;
        group.rotation.z = time * 1.0;
        renderer.clear();
        renderer.render(scene, camera);
        renderer.clearDepth();
        renderer.render(sceneOrtho, cameraOrtho);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../../../tween.js/tween.js.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/css3d_periodictable.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    // -------
    var table = [
        "H", "Hydrogen", "1.00794", 1, 1,
        "He", "Helium", "4.002602", 18, 1,
        "Li", "Lithium", "6.941", 1, 2,
        "Be", "Beryllium", "9.012182", 2, 2,
        "B", "Boron", "10.811", 13, 2,
        "C", "Carbon", "12.0107", 14, 2,
        "N", "Nitrogen", "14.0067", 15, 2,
        "O", "Oxygen", "15.9994", 16, 2,
        "F", "Fluorine", "18.9984032", 17, 2,
        "Ne", "Neon", "20.1797", 18, 2,
        "Na", "Sodium", "22.98976...", 1, 3,
        "Mg", "Magnesium", "24.305", 2, 3,
        "Al", "Aluminium", "26.9815386", 13, 3,
        "Si", "Silicon", "28.0855", 14, 3,
        "P", "Phosphorus", "30.973762", 15, 3,
        "S", "Sulfur", "32.065", 16, 3,
        "Cl", "Chlorine", "35.453", 17, 3,
        "Ar", "Argon", "39.948", 18, 3,
        "K", "Potassium", "39.948", 1, 4,
        "Ca", "Calcium", "40.078", 2, 4,
        "Sc", "Scandium", "44.955912", 3, 4,
        "Ti", "Titanium", "47.867", 4, 4,
        "V", "Vanadium", "50.9415", 5, 4,
        "Cr", "Chromium", "51.9961", 6, 4,
        "Mn", "Manganese", "54.938045", 7, 4,
        "Fe", "Iron", "55.845", 8, 4,
        "Co", "Cobalt", "58.933195", 9, 4,
        "Ni", "Nickel", "58.6934", 10, 4,
        "Cu", "Copper", "63.546", 11, 4,
        "Zn", "Zinc", "65.38", 12, 4,
        "Ga", "Gallium", "69.723", 13, 4,
        "Ge", "Germanium", "72.63", 14, 4,
        "As", "Arsenic", "74.9216", 15, 4,
        "Se", "Selenium", "78.96", 16, 4,
        "Br", "Bromine", "79.904", 17, 4,
        "Kr", "Krypton", "83.798", 18, 4,
        "Rb", "Rubidium", "85.4678", 1, 5,
        "Sr", "Strontium", "87.62", 2, 5,
        "Y", "Yttrium", "88.90585", 3, 5,
        "Zr", "Zirconium", "91.224", 4, 5,
        "Nb", "Niobium", "92.90628", 5, 5,
        "Mo", "Molybdenum", "95.96", 6, 5,
        "Tc", "Technetium", "(98)", 7, 5,
        "Ru", "Ruthenium", "101.07", 8, 5,
        "Rh", "Rhodium", "102.9055", 9, 5,
        "Pd", "Palladium", "106.42", 10, 5,
        "Ag", "Silver", "107.8682", 11, 5,
        "Cd", "Cadmium", "112.411", 12, 5,
        "In", "Indium", "114.818", 13, 5,
        "Sn", "Tin", "118.71", 14, 5,
        "Sb", "Antimony", "121.76", 15, 5,
        "Te", "Tellurium", "127.6", 16, 5,
        "I", "Iodine", "126.90447", 17, 5,
        "Xe", "Xenon", "131.293", 18, 5,
        "Cs", "Caesium", "132.9054", 1, 6,
        "Ba", "Barium", "132.9054", 2, 6,
        "La", "Lanthanum", "138.90547", 4, 9,
        "Ce", "Cerium", "140.116", 5, 9,
        "Pr", "Praseodymium", "140.90765", 6, 9,
        "Nd", "Neodymium", "144.242", 7, 9,
        "Pm", "Promethium", "(145)", 8, 9,
        "Sm", "Samarium", "150.36", 9, 9,
        "Eu", "Europium", "151.964", 10, 9,
        "Gd", "Gadolinium", "157.25", 11, 9,
        "Tb", "Terbium", "158.92535", 12, 9,
        "Dy", "Dysprosium", "162.5", 13, 9,
        "Ho", "Holmium", "164.93032", 14, 9,
        "Er", "Erbium", "167.259", 15, 9,
        "Tm", "Thulium", "168.93421", 16, 9,
        "Yb", "Ytterbium", "173.054", 17, 9,
        "Lu", "Lutetium", "174.9668", 18, 9,
        "Hf", "Hafnium", "178.49", 4, 6,
        "Ta", "Tantalum", "180.94788", 5, 6,
        "W", "Tungsten", "183.84", 6, 6,
        "Re", "Rhenium", "186.207", 7, 6,
        "Os", "Osmium", "190.23", 8, 6,
        "Ir", "Iridium", "192.217", 9, 6,
        "Pt", "Platinum", "195.084", 10, 6,
        "Au", "Gold", "196.966569", 11, 6,
        "Hg", "Mercury", "200.59", 12, 6,
        "Tl", "Thallium", "204.3833", 13, 6,
        "Pb", "Lead", "207.2", 14, 6,
        "Bi", "Bismuth", "208.9804", 15, 6,
        "Po", "Polonium", "(209)", 16, 6,
        "At", "Astatine", "(210)", 17, 6,
        "Rn", "Radon", "(222)", 18, 6,
        "Fr", "Francium", "(223)", 1, 7,
        "Ra", "Radium", "(226)", 2, 7,
        "Ac", "Actinium", "(227)", 4, 10,
        "Th", "Thorium", "232.03806", 5, 10,
        "Pa", "Protactinium", "231.0588", 6, 10,
        "U", "Uranium", "238.02891", 7, 10,
        "Np", "Neptunium", "(237)", 8, 10,
        "Pu", "Plutonium", "(244)", 9, 10,
        "Am", "Americium", "(243)", 10, 10,
        "Cm", "Curium", "(247)", 11, 10,
        "Bk", "Berkelium", "(247)", 12, 10,
        "Cf", "Californium", "(251)", 13, 10,
        "Es", "Einstenium", "(252)", 14, 10,
        "Fm", "Fermium", "(257)", 15, 10,
        "Md", "Mendelevium", "(258)", 16, 10,
        "No", "Nobelium", "(259)", 17, 10,
        "Lr", "Lawrencium", "(262)", 18, 10,
        "Rf", "Rutherfordium", "(267)", 4, 7,
        "Db", "Dubnium", "(268)", 5, 7,
        "Sg", "Seaborgium", "(271)", 6, 7,
        "Bh", "Bohrium", "(272)", 7, 7,
        "Hs", "Hassium", "(270)", 8, 7,
        "Mt", "Meitnerium", "(276)", 9, 7,
        "Ds", "Darmstadium", "(281)", 10, 7,
        "Rg", "Roentgenium", "(280)", 11, 7,
        "Cn", "Copernicium", "(285)", 12, 7,
        "Uut", "Unutrium", "(284)", 13, 7,
        "Fl", "Flerovium", "(289)", 14, 7,
        "Uup", "Ununpentium", "(288)", 15, 7,
        "Lv", "Livermorium", "(293)", 16, 7,
        "Uus", "Ununseptium", "(294)", 17, 7,
        "Uuo", "Ununoctium", "(294)", 18, 7
    ];
    var camera, scene, renderer;
    var controls;
    var objects = [];
    var targets = { table: [], sphere: [], helix: [], grid: [] };
    init();
    animate();
    function init() {
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 3000;
        scene = new THREE.Scene();
        // table
        for (var i = 0; i < table.length; i += 5) {
            var element = document.createElement('div');
            element.className = 'element';
            element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
            var number = document.createElement('div');
            number.className = 'number';
            number.textContent = ((i / 5) + 1).toString();
            element.appendChild(number);
            var symbol = document.createElement('div');
            symbol.className = 'symbol';
            symbol.textContent = table[i].toString();
            element.appendChild(symbol);
            var details = document.createElement('div');
            details.className = 'details';
            details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
            element.appendChild(details);
            var cssobject = new THREE.CSS3DObject(element);
            cssobject.position.x = Math.random() * 4000 - 2000;
            cssobject.position.y = Math.random() * 4000 - 2000;
            cssobject.position.z = Math.random() * 4000 - 2000;
            scene.add(cssobject);
            objects.push(cssobject);
            //
            var object = new THREE.Object3D();
            object.position.x = (table[i + 3] * 140) - 1330;
            object.position.y = -(table[i + 4] * 180) + 990;
            targets.table.push(object);
        }
        // sphere
        var vector = new THREE.Vector3();
        for (var i = 0, l = objects.length; i < l; i++) {
            var phi = Math.acos(-1 + (2 * i) / l);
            var theta = Math.sqrt(l * Math.PI) * phi;
            var object = new THREE.Object3D();
            object.position.x = 800 * Math.cos(theta) * Math.sin(phi);
            object.position.y = 800 * Math.sin(theta) * Math.sin(phi);
            object.position.z = 800 * Math.cos(phi);
            vector.copy(object.position).multiplyScalar(2);
            object.lookAt(vector);
            targets.sphere.push(object);
        }
        // helix
        var vector = new THREE.Vector3();
        for (var i = 0, l = objects.length; i < l; i++) {
            var phi = i * 0.175 + Math.PI;
            var object = new THREE.Object3D();
            object.position.x = 900 * Math.sin(phi);
            object.position.y = -(i * 8) + 450;
            object.position.z = 900 * Math.cos(phi);
            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            vector.z = object.position.z * 2;
            object.lookAt(vector);
            targets.helix.push(object);
        }
        // grid
        for (var i = 0; i < objects.length; i++) {
            var object = new THREE.Object3D();
            object.position.x = ((i % 5) * 400) - 800;
            object.position.y = (-(Math.floor(i / 5) % 5) * 400) + 800;
            object.position.z = (Math.floor(i / 25)) * 1000 - 2000;
            targets.grid.push(object);
        }
        //
        renderer = new THREE.CSS3DRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        document.getElementById('container').appendChild(renderer.domElement);
        //
        controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 0.5;
        controls.minDistance = 500;
        controls.maxDistance = 6000;
        controls.addEventListener('change', render);
        var button = document.getElementById('table');
        button.addEventListener('click', function (event) {
            transform(targets.table, 2000);
        }, false);
        var button = document.getElementById('sphere');
        button.addEventListener('click', function (event) {
            transform(targets.sphere, 2000);
        }, false);
        var button = document.getElementById('helix');
        button.addEventListener('click', function (event) {
            transform(targets.helix, 2000);
        }, false);
        var button = document.getElementById('grid');
        button.addEventListener('click', function (event) {
            transform(targets.grid, 2000);
        }, false);
        transform(targets.table, 2000);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function transform(targets, duration) {
        TWEEN.removeAll();
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            var target = targets[i];
            new TWEEN.Tween(object.position)
                .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            new TWEEN.Tween(object.rotation)
                .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
        }
        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(render)
            .start();
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }
    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        controls.update();
    }
    function render() {
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
/// <reference path="../../../tween.js/tween.js.d.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/css3d_sprites.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    // -------
    var camera, scene, renderer;
    var controls;
    var particlesTotal = 512;
    var positions = [];
    var objects = [];
    var current = 0;
    init();
    animate();
    function init() {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
        camera.position.set(600, 400, 1500);
        camera.lookAt(new THREE.Vector3());
        scene = new THREE.Scene();
        var image = document.createElement('img');
        image.addEventListener('load', function (event) {
            for (var i = 0; i < particlesTotal; i++) {
                var object = new THREE.CSS3DSprite(image.cloneNode());
                object.position.x = Math.random() * 4000 - 2000,
                    object.position.y = Math.random() * 4000 - 2000,
                    object.position.z = Math.random() * 4000 - 2000;
                scene.add(object);
                objects.push(object);
            }
            transition();
        }, false);
        image.src = 'textures/sprite.png';
        // Plane
        var amountX = 16;
        var amountZ = 32;
        var separation = 150;
        var offsetX = ((amountX - 1) * separation) / 2;
        var offsetZ = ((amountZ - 1) * separation) / 2;
        for (var i = 0; i < particlesTotal; i++) {
            var x = (i % amountX) * separation;
            var z = Math.floor(i / amountX) * separation;
            var y = (Math.sin(x * 0.5) + Math.sin(z * 0.5)) * 200;
            positions.push(x - offsetX, y, z - offsetZ);
        }
        // Cube
        var amount = 8;
        var separation = 150;
        var offset = ((amount - 1) * separation) / 2;
        for (var i = 0; i < particlesTotal; i++) {
            var x = (i % amount) * separation;
            var y = Math.floor((i / amount) % amount) * separation;
            var z = Math.floor(i / (amount * amount)) * separation;
            positions.push(x - offset, y - offset, z - offset);
        }
        // Random
        for (var i = 0; i < particlesTotal; i++) {
            positions.push(Math.random() * 4000 - 2000, Math.random() * 4000 - 2000, Math.random() * 4000 - 2000);
        }
        // Sphere
        var radius = 750;
        for (var i = 0; i < particlesTotal; i++) {
            var phi = Math.acos(-1 + (2 * i) / particlesTotal);
            var theta = Math.sqrt(particlesTotal * Math.PI) * phi;
            positions.push(radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi));
        }
        //
        renderer = new THREE.CSS3DRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        document.getElementById('container').appendChild(renderer.domElement);
        //
        controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 0.5;
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function transition() {
        var offset = current * particlesTotal * 3;
        var duration = 2000;
        for (var i = 0, j = offset; i < particlesTotal; i++, j += 3) {
            var object = objects[i];
            new TWEEN.Tween(object.position)
                .to({
                x: positions[j],
                y: positions[j + 1],
                z: positions[j + 2]
            }, Math.random() * duration + duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
        }
        new TWEEN.Tween(this)
            .to({}, duration * 3)
            .onComplete(transition)
            .start();
        current = (current + 1) % 4;
    }
    function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
        controls.update();
        var time = performance.now();
        for (var i = 0, l = objects.length; i < l; i++) {
            var object = objects[i];
            var scale = Math.sin((Math.floor(object.position.x) + time) * 0.002) * 0.3 + 1;
            object.scale.set(scale, scale, scale);
        }
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/canvas_camera_orthographic.html
(function () {
    var container, stats;
    var camera, scene, renderer;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        var info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> - orthographic view';
        container.appendChild(info);
        camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -500, 1000);
        camera.position.x = 200;
        camera.position.y = 100;
        camera.position.z = 200;
        scene = new THREE.Scene();
        // Grid
        var size = 500, step = 50;
        var geometry = new THREE.Geometry();
        for (var i = -size; i <= size; i += step) {
            geometry.vertices.push(new THREE.Vector3(-size, 0, i));
            geometry.vertices.push(new THREE.Vector3(size, 0, i));
            geometry.vertices.push(new THREE.Vector3(i, 0, -size));
            geometry.vertices.push(new THREE.Vector3(i, 0, size));
        }
        var material = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.2 });
        var line = new THREE.Line(geometry, material, THREE.LinePieces);
        scene.add(line);
        // Cubes
        var geometry2 = new THREE.BoxGeometry(50, 50, 50);
        var material2 = new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, overdraw: 0.5 });
        for (var i = 0; i < 100; i++) {
            var cube = new THREE.Mesh(geometry2, material2);
            cube.scale.y = Math.floor(Math.random() * 2 + 1);
            cube.position.x = Math.floor((Math.random() * 1000 - 500) / 50) * 50 + 25;
            cube.position.y = (cube.scale.y * 50) / 2;
            cube.position.z = Math.floor((Math.random() * 1000 - 500) / 50) * 50 + 25;
            scene.add(cube);
        }
        // Lights
        var ambientLight = new THREE.AmbientLight(Math.random() * 0x10);
        scene.add(ambientLight);
        var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        scene.add(directionalLight);
        var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        scene.add(directionalLight);
        renderer = new THREE.CanvasRenderer();
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.left = window.innerWidth / -2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = window.innerHeight / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var timer = Date.now() * 0.0001;
        camera.position.x = Math.cos(timer) * 200;
        camera.position.z = Math.sin(timer) * 200;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_cube.html
(function () {
    var container, stats;
    var camera, scene, renderer;
    var cube, plane;
    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;
    var mouseX = 0;
    var mouseXOnMouseDown = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        var info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = 'Drag to spin the cube';
        container.appendChild(info);
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.y = 150;
        camera.position.z = 500;
        scene = new THREE.Scene();
        // Cube
        var geometry = new THREE.BoxGeometry(200, 200, 200);
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[i].color.setHex(hex);
            geometry.faces[i + 1].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 150;
        scene.add(cube);
        // Plane
        var geometry2 = new THREE.PlaneBufferGeometry(200, 200);
        geometry2.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        var material = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, overdraw: 0.5 });
        plane = new THREE.Mesh(geometry2, material);
        scene.add(plane);
        renderer = new THREE.CanvasRenderer();
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //
    function onDocumentMouseDown(event) {
        event.preventDefault();
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('mouseout', onDocumentMouseOut, false);
        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
    }
    function onDocumentMouseUp(event) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
        document.removeEventListener('mouseout', onDocumentMouseOut, false);
    }
    function onDocumentMouseOut(event) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
        document.removeEventListener('mouseout', onDocumentMouseOut, false);
    }
    function onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
            targetRotationOnMouseDown = targetRotation;
        }
    }
    function onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
        }
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        plane.rotation.y = cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
/// <reference path="../../../tween.js/tween.js.d.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/canvas_interactive_cubes_tween.html
(function () {
    var container, stats;
    var camera, scene, renderer;
    var raycaster;
    var mouse;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        var info = document.createElement('div');
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.width = '100%';
        info.style.textAlign = 'center';
        info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> - clickable objects';
        container.appendChild(info);
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.y = 300;
        camera.position.z = 500;
        scene = new THREE.Scene();
        var geometry = new THREE.BoxGeometry(100, 100, 100);
        for (var i = 0; i < 20; i++) {
            var object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, opacity: 0.5 }));
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            object.scale.x = Math.random() * 2 + 1;
            object.scale.y = Math.random() * 2 + 1;
            object.scale.z = Math.random() * 2 + 1;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            scene.add(object);
        }
        //
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        renderer = new THREE.CanvasRenderer();
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onDocumentTouchStart(event) {
        event.preventDefault();
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
        onDocumentMouseDown(event);
    }
    function onDocumentMouseDown(event) {
        event.preventDefault();
        mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            new TWEEN.Tween(intersects[0].object.position).to({
                x: Math.random() * 800 - 400,
                y: Math.random() * 800 - 400,
                z: Math.random() * 800 - 400
            }, 2000)
                .easing(TWEEN.Easing.Elastic.Out).start();
            new TWEEN.Tween(intersects[0].object.rotation).to({
                x: Math.random() * 2 * Math.PI,
                y: Math.random() * 2 * Math.PI,
                z: Math.random() * 2 * Math.PI
            }, 2000)
                .easing(TWEEN.Easing.Elastic.Out).start();
        }
        /*
        // Parse all the faces
        for ( var i in intersects ) {

            intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

        }
        */
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    var radius = 600;
    var theta = 0;
    function render() {
        TWEEN.update();
        theta += 0.1;
        camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
        camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/canvas_lights_pointlights.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    // -------
    var camera, scene, renderer, light1, light2, light3, loader, mesh;
    init();
    animate();
    function init() {
        var container = document.getElementById('container');
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, -6, 100);
        scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0x00020));
        light1 = new THREE.PointLight(0xff0040, 1, 50);
        scene.add(light1);
        light2 = new THREE.PointLight(0x0040ff, 1, 50);
        scene.add(light2);
        light3 = new THREE.PointLight(0x80ff80, 1, 50);
        scene.add(light3);
        var PI2 = Math.PI * 2;
        var program = function (context) {
            context.beginPath();
            context.arc(0, 0, 0.5, 0, PI2, true);
            context.fill();
        };
        var sprite = new THREE.Sprite(new THREE.SpriteCanvasMaterial({ color: 0xff0040, program: program }));
        light1.add(sprite);
        var sprite = new THREE.Sprite(new THREE.SpriteCanvasMaterial({ color: 0x0040ff, program: program }));
        light2.add(sprite);
        var sprite = new THREE.Sprite(new THREE.SpriteCanvasMaterial({ color: 0x80ff80, program: program }));
        light3.add(sprite);
        loader = new THREE.JSONLoader();
        loader.load('obj/WaltHeadLo.js', function (geometry) {
            mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, overdraw: 0.5 }));
            scene.add(mesh);
        });
        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        var time = Date.now() * 0.0005;
        if (mesh)
            mesh.rotation.y -= 0.01;
        light1.position.x = Math.sin(time * 0.7) * 30;
        light1.position.y = Math.cos(time * 0.5) * 40;
        light1.position.z = Math.cos(time * 0.3) * 30;
        light2.position.x = Math.cos(time * 0.3) * 30;
        light2.position.y = Math.sin(time * 0.5) * 40;
        light2.position.z = Math.sin(time * 0.7) * 30;
        light3.position.x = Math.sin(time * 0.7) * 30;
        light3.position.y = Math.cos(time * 0.3) * 40;
        light3.position.z = Math.sin(time * 0.5) * 30;
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/canvas_materials.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    var container, stats;
    var camera, scene, renderer, objects;
    var pointLight;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.set(0, 200, 800);
        scene = new THREE.Scene();
        // Grid
        var size = 500, step = 100;
        var geometry = new THREE.Geometry();
        for (var i = -size; i <= size; i += step) {
            geometry.vertices.push(new THREE.Vector3(-size, -120, i));
            geometry.vertices.push(new THREE.Vector3(size, -120, i));
            geometry.vertices.push(new THREE.Vector3(i, -120, -size));
            geometry.vertices.push(new THREE.Vector3(i, -120, size));
        }
        var material = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.2 });
        var line = new THREE.Line(geometry, material, THREE.LinePieces);
        scene.add(line);
        // Spheres
        var geometry2 = new THREE.SphereGeometry(100, 14, 7);
        var materials = [
            new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0xff0000, blending: THREE.AdditiveBlending }),
            new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, overdraw: 0.5 }),
            new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.SmoothShading, overdraw: 0.5 }),
            new THREE.MeshDepthMaterial({ overdraw: 0.5 }),
            new THREE.MeshNormalMaterial({ overdraw: 0.5 }),
            new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/land_ocean_ice_cloud_2048.jpg') }),
            new THREE.MeshBasicMaterial({ envMap: THREE.ImageUtils.loadTexture('textures/envmap.png', THREE.SphericalReflectionMapping), overdraw: 0.5 })
        ];
        for (var i = 0, l = geometry2.faces.length; i < l; i++) {
            var face = geometry2.faces[i];
            if (Math.random() > 0.5)
                face.materialIndex = Math.floor(Math.random() * materials.length);
        }
        materials.push(new THREE.MeshFaceMaterial(materials));
        objects = [];
        for (var i = 0, l = materials.length; i < l; i++) {
            var sphere = new THREE.Mesh(geometry, materials[i]);
            sphere.position.x = (i % 5) * 200 - 400;
            sphere.position.z = Math.floor(i / 5) * 200 - 200;
            sphere.rotation.x = Math.random() * 200 - 100;
            sphere.rotation.y = Math.random() * 200 - 100;
            sphere.rotation.z = Math.random() * 200 - 100;
            objects.push(sphere);
            scene.add(sphere);
        }
        var PI2 = Math.PI * 2;
        var program = function (context) {
            context.beginPath();
            context.arc(0, 0, 0.5, 0, PI2, true);
            context.fill();
        };
        // Lights
        scene.add(new THREE.AmbientLight(Math.random() * 0x202020));
        var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        scene.add(directionalLight);
        pointLight = new THREE.PointLight(0xffffff, 1);
        scene.add(pointLight);
        var sprite = new THREE.Sprite(new THREE.SpriteCanvasMaterial({ color: 0xffffff, program: program }));
        sprite.scale.set(8, 8, 8);
        pointLight.add(sprite);
        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        var debugCanvas = document.createElement('canvas');
        debugCanvas.width = 512;
        debugCanvas.height = 512;
        debugCanvas.style.position = 'absolute';
        debugCanvas.style.top = '0px';
        debugCanvas.style.left = '0px';
        container.appendChild(debugCanvas);
        var debugContext = debugCanvas.getContext('2d');
        debugContext.setTransform(1, 0, 0, 1, 256, 256);
        debugContext.strokeStyle = '#000000';
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function loadImage(path) {
        var image = document.createElement('img');
        var texture = new THREE.Texture(image, THREE.UVMapping);
        image.onload = function () { texture.needsUpdate = true; };
        image.src = path;
        return texture;
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        var timer = Date.now() * 0.0001;
        camera.position.x = Math.cos(timer) * 1000;
        camera.position.z = Math.sin(timer) * 1000;
        camera.lookAt(scene.position);
        for (var i = 0, l = objects.length; i < l; i++) {
            var object = objects[i];
            object.rotation.x += 0.01;
            object.rotation.y += 0.005;
        }
        pointLight.position.x = Math.sin(timer * 7) * 300;
        pointLight.position.y = Math.cos(timer * 5) * 400;
        pointLight.position.z = Math.cos(timer * 3) * 300;
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
// https://github.com/mrdoob/three.js/blob/master/examples/canvas_particles_floor.html
(function () {
    // ------- variable definitions that does not exist in the original code. These are for typescript.
    // -------
    var SEPARATION = 100;
    var AMOUNTX = 50;
    var AMOUNTY = 50;
    var container, stats;
    var camera, scene, renderer, particle;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    init();
    animate();
    function init() {
        container = document.createElement('div');
        document.body.appendChild(container);
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        var material = new THREE.SpriteMaterial();
        for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
                particle = new THREE.Sprite(material);
                particle.scale.y = 20;
                particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                scene.add(particle);
            }
        }
        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild(stats.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    //
    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }
    function onDocumentTouchStart(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    //
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (-mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
});
/// <reference path="../../three.d.ts" />
/// <reference path="../three-tests-setup.ts" />
(function () {
    if (!Detector.canvas || !Detector.webgl || !Detector.workers || !Detector.fileapi) {
        var errorElement = Detector.getWebGLErrorMessage();
        Detector.addGetWebGLMessage();
    }
});
/*
The MIT License

Copyright (c) 2010-2013 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/// <reference path="./tests/math/test_unit_math.ts" />
// webGL renderer test.
/// <reference path="./tests/webgl/webgl_animation_cloth.ts" />
/// <reference path="./tests/webgl/webgl_animation_skinning_morph.ts" />
/// <reference path="./tests/webgl/webgl_buffergeometry.ts" />
/// <reference path="./tests/webgl/webgl_camera.ts" />
/// <reference path="./tests/webgl/webgl_custom_attributes.ts" />
/// <reference path="./tests/webgl/webgl_geometries.ts" />
/// <reference path="./tests/webgl/webgl_helpers.ts" />
/// <reference path="./tests/webgl/webgl_interactive_cubes.ts" />
/// <reference path="./tests/webgl/webgl_interactive_raycasting_pointcloud.ts" />
/// <reference path="./tests/webgl/webgl_lensflares.ts" />
/// <reference path="./tests/webgl/webgl_lights_heimsphere.ts" />
/// <reference path="./tests/webgl/webgl_lines_colors.ts" />
/// <reference path="./tests/webgl/webgl_loader_awd.ts" />
/// <reference path="./tests/webgl/webgl_materials.ts" />
/// <reference path="./tests/webgl/webgl_morphtargets.ts" />
/// <reference path="./tests/webgl/webgl_particles_billboards.ts" />
/// <reference path="./tests/webgl/webgl_postprocessing.ts" />
/// <reference path="./tests/webgl/webgl_shader.ts" />
/// <reference path="./tests/webgl/webgl_sprites.ts" />
// css3d renderer test.
/// <reference path="./tests/css3d/css3d_periodictable.ts" />
/// <reference path="./tests/css3d/css3d_sprites.ts" />
// canvas renderer test.
/// <reference path="./tests/canvas/canvas_camera_orthographic.ts" />
/// <reference path="./tests/canvas/canvas_geometry_cube.ts" />
/// <reference path="./tests/canvas/canvas_interactive_cubes_tween.ts" />
/// <reference path="./tests/canvas/canvas_lights_pointlights.ts" />
/// <reference path="./tests/canvas/canvas_materials.ts" />
/// <reference path="./tests/canvas/canvas_particles_floor.ts" />
// examples test.
/// <reference path="./tests/examples/detector.ts" />
// http://www.w3.org/TR/2012/WD-webaudio-20121213/
/// <reference path="waa.d.ts" />
(function () {
    var context = new AudioContext();
    function playSound() {
        var source = context.createBufferSource();
        source.buffer = dogBarkingBuffer;
        source.connect(context.destination);
        source.start(0);
    }
});
(function () {
    var context = new AudioContext();
    // Create the effects nodes.
    var lowpassFilter = context.createBiquadFilter();
    var waveShaper = context.createWaveShaper();
    var panner = context.createPanner();
    var compressor = context.createDynamicsCompressor();
    var reverb = context.createConvolver();
    // Create master wet and dry.
    var masterDry = context.createGain();
    var masterWet = context.createGain();
    // Connect final compressor to final destination.
    compressor.connect(context.destination);
    // Connect master dry and wet to compressor.
    masterDry.connect(compressor);
    masterWet.connect(compressor);
    // Connect reverb to master wet.
    reverb.connect(masterWet);
    // Create a few sources.
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    var source3 = context.createOscillator();
    source1.buffer = manTalkingBuffer;
    source2.buffer = footstepsBuffer;
    source3.frequency.value = 440;
    // Connect source1
    var dry1 = context.createGain();
    var wet1 = context.createGain();
    source1.connect(lowpassFilter);
    lowpassFilter.connect(dry1);
    lowpassFilter.connect(wet1);
    dry1.connect(masterDry);
    wet1.connect(reverb);
    source1.loop = true;
    source1.loopStart = 0;
    source1.loopEnd = 300;
    // Connect source2
    var dry2 = context.createGain();
    var wet2 = context.createGain();
    source2.connect(waveShaper);
    waveShaper.connect(dry2);
    waveShaper.connect(wet2);
    dry2.connect(masterDry);
    wet2.connect(reverb);
    // Connect source3
    var dry3 = context.createGain();
    var wet3 = context.createGain();
    source3.connect(panner);
    panner.connect(dry3);
    panner.connect(wet3);
    dry3.connect(masterDry);
    wet3.connect(reverb);
    // Start the sources now.
    source1.start(0);
    // MEMO: should be when parameter is 0
    // http://www.w3.org/TR/webaudio/#AudioBufferSourceNode
    source2.start();
    source3.start(0);
    // Stop the sources are 2 seconds later.
    source1.stop(2);
    // MEMO: should be when parameter is 0
    // http://www.w3.org/TR/webaudio/#AudioBufferSourceNode
    source2.stop();
    source3.stop(2);
});
(function () {
    var context;
    var compressor;
    var gainNode1;
    var streamingAudioSource;
    // Initial setup of the "long-lived" part of the routing graph  
    function setupAudioContext() {
        context = new AudioContext();
        compressor = context.createDynamicsCompressor();
        gainNode1 = context.createGain();
        // Create a streaming audio source.
        var audioElement = document.getElementById('audioTagID');
        streamingAudioSource = context.createMediaElementSource(audioElement);
        streamingAudioSource.connect(gainNode1);
        gainNode1.connect(compressor);
        compressor.connect(context.destination);
    }
    // Later in response to some user action (typically mouse or key event) 
    // a one-shot sound can be played. 
    function playSound() {
        var oneShotSound = context.createBufferSource();
        oneShotSound.buffer = dogBarkingBuffer;
        // Create a filter, panner, and gain node. 
        var lowpass = context.createBiquadFilter();
        var panner = context.createPanner();
        var gainNode2 = context.createGain();
        // Make connections 
        oneShotSound.connect(lowpass);
        lowpass.connect(panner);
        panner.connect(gainNode2);
        gainNode2.connect(compressor);
        // Play 0.75 seconds from now (to play immediately pass in 0)
        oneShotSound.start(context.currentTime + 0.75);
    }
});
(function () {
    var param;
    var t0 = 0;
    var t1 = 0.1;
    var t2 = 0.2;
    var t3 = 0.3;
    var t4 = 0.4;
    var t5 = 0.6;
    var t6 = 0.7;
    var t7 = 1.0;
    var curveLength = 44100;
    var curve = new Float32Array(curveLength);
    for (var i = 0; i < curveLength; ++i)
        curve[i] = Math.sin(Math.PI * i / curveLength);
    param.setValueAtTime(0.2, t0);
    param.setValueAtTime(0.3, t1);
    param.setValueAtTime(0.4, t2);
    param.linearRampToValueAtTime(1, t3);
    param.linearRampToValueAtTime(0.15, t4);
    param.exponentialRampToValueAtTime(0.75, t5);
    param.exponentialRampToValueAtTime(0.05, t6);
    param.setValueCurveAtTime(curve, t6, t7 - t6);
});
(function () {
    var param;
    var t0 = 0;
    var t1 = 0.1;
    var t2 = 0.2;
    var t3 = 0.3;
    var t4 = 0.4;
    var t5 = 0.6;
    var t6 = 0.7;
    var t7 = 1.0;
    var curveLength = 44100;
    var curve = new Float32Array(curveLength);
    for (var i = 0; i < curveLength; ++i)
        curve[i] = Math.sin(Math.PI * i / curveLength);
    param.setValueAtTime(0.2, t0);
    param.setValueAtTime(0.3, t1);
    param.setValueAtTime(0.4, t2);
    param.linearRampToValueAtTime(1, t3);
    param.linearRampToValueAtTime(0.15, t4);
    param.exponentialRampToValueAtTime(0.75, t5);
    param.exponentialRampToValueAtTime(0.05, t6);
    param.setValueCurveAtTime(curve, t6, t7 - t6);
});
(function () {
    var context;
    var filterNode;
    var mediaElement = document.getElementById('mediaElementID');
    var sourceNode = context.createMediaElementSource(mediaElement);
    sourceNode.connect(filterNode);
});
(function () {
    // Setup routing graph 
    function setupRoutingGraph() {
        var context = new AudioContext();
        var compressor = context.createDynamicsCompressor();
        // Send1 effect 
        var reverb = context.createConvolver();
        // Convolver impulse response may be set here or later 
        // Send2 effect 
        var delay = context.createDelay();
        // Connect final compressor to final destination 
        compressor.connect(context.destination);
        // Connect sends 1 & 2 through effects to main mixer 
        var s1 = context.createGain();
        reverb.connect(s1);
        s1.connect(compressor);
        var s2 = context.createGain();
        delay.connect(s2);
        s2.connect(compressor);
        // Create a couple of sources 
        var source1 = context.createBufferSource();
        var source2 = context.createBufferSource();
        source1.buffer = manTalkingBuffer;
        source2.buffer = footstepsBuffer;
        // Connect source1 
        var g1_1 = context.createGain();
        var g2_1 = context.createGain();
        var g3_1 = context.createGain();
        source1.connect(g1_1);
        source1.connect(g2_1);
        source1.connect(g3_1);
        g1_1.connect(compressor);
        g2_1.connect(reverb);
        g3_1.connect(delay);
        // Connect source2 
        var g1_2 = context.createGain();
        var g2_2 = context.createGain();
        var g3_2 = context.createGain();
        source2.connect(g1_2);
        source2.connect(g2_2);
        source2.connect(g3_2);
        g1_2.connect(compressor);
        g2_2.connect(reverb);
        g3_2.connect(delay);
        // We now have explicit control over all the volumes g1_1, g2_1, ..., s1, s2 
        g2_1.gain.value = 0.2; // For example, set source1 reverb gain 
        // Because g2_1.gain is an "AudioParam", 
        // an automation curve could also be attached to it. 
        // A "mixing board" UI could be created in canvas or WebGL controlling these gains. 
    }
});
(function () {
    var context;
    var compressor;
    var gainNode1;
    var streamingAudioSource;
    // Initial setup of the "long-lived" part of the routing graph  
    function setupAudioContext() {
        context = new AudioContext();
        compressor = context.createDynamicsCompressor();
        gainNode1 = context.createGain();
        // Create a streaming audio source.
        var audioElement = document.getElementById('audioTagID');
        streamingAudioSource = context.createMediaElementSource(audioElement);
        streamingAudioSource.connect(gainNode1);
        gainNode1.connect(compressor);
        compressor.connect(context.destination);
    }
    // Later in response to some user action (typically mouse or key event) 
    // a one-shot sound can be played. 
    function playSound() {
        var oneShotSound = context.createBufferSource();
        oneShotSound.buffer = dogBarkingBuffer;
        // Create a filter, panner, and gain node. 
        var lowpass = context.createBiquadFilter();
        var panner = context.createPanner();
        var gainNode2 = context.createGain();
        // Make connections 
        oneShotSound.connect(lowpass);
        lowpass.connect(panner);
        panner.connect(gainNode2);
        gainNode2.connect(compressor);
        // Play 0.75 seconds from now (to play immediately pass in 0)
        oneShotSound.start(context.currentTime + 0.75);
    }
});
(function () {
    var context = new webkitOfflineAudioContext(1, 2, 44100.5);
    context.oncomplete = function (e) {
        context.createBufferSource().buffer;
    };
    context.startRendering();
});
// Test automatic type inference of the audio processing event handler
(function () {
    var context = new AudioContext();
    var recorder = context.createScriptProcessor(2048, 1, 1);
    recorder.onaudioprocess = function (e) {
        e.inputBuffer;
    };
});
///<reference path="MediaStream.d.ts" />
var mediaStreamConstraints = { audio: true, video: true };
var mediaTrackConstraintSet = {};
var mediaTrackConstraintArray = [];
var mediaTrackConstraints = { mandatory: mediaTrackConstraintSet, optional: mediaTrackConstraintArray };
navigator.getUserMedia(mediaStreamConstraints, function (stream) {
    console.log('label:' + stream.label);
    console.log('ended:' + stream.ended);
    stream.onended = function (event) { return console.log('Stream ended'); };
    var objectUrl = URL.createObjectURL(stream);
    var wkObjectUrl = webkitURL.createObjectURL(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
navigator.webkitGetUserMedia(mediaStreamConstraints, function (stream) {
    console.log('label:' + stream.label);
    console.log('ended:' + stream.ended);
    stream.onended = function (event) { return console.log('Stream ended'); };
    var objectUrl = URL.createObjectURL(stream);
    var wkObjectUrl = webkitURL.createObjectURL(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
navigator.mozGetUserMedia(mediaStreamConstraints, function (stream) {
    console.log('label:' + stream.label);
    console.log('ended:' + stream.ended);
    stream.onended = function (event) { return console.log('Stream ended'); };
    var objectUrl = URL.createObjectURL(stream);
    var wkObjectUrl = webkitURL.createObjectURL(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
/// <reference path="MediaStream.d.ts" />
/// <reference path="RTCPeerConnection.d.ts" />
var config = { iceServers: [{ url: "stun.l.google.com:19302" }] };
var constraints = { mandatory: { offerToReceiveAudio: true, offerToReceiveVideo: true } };
var peerConnection = new RTCPeerConnection(config, constraints);
navigator.getUserMedia({ audio: true, video: true }, function (stream) {
    peerConnection.addStream(stream);
}, function (error) {
    console.log('Error message: ' + error.message);
    console.log('Error name: ' + error.name);
});
peerConnection.onaddstream = function (ev) { return console.log(ev.type); };
peerConnection.ondatachannel = function (ev) { return console.log(ev.type); };
peerConnection.oniceconnectionstatechange = function (ev) { return console.log(ev.type); };
peerConnection.onnegotiationneeded = function (ev) { return console.log(ev.type); };
peerConnection.onopen = function (ev) { return console.log(ev.type); };
peerConnection.onicecandidate = function (ev) { return console.log(ev.type); };
peerConnection.onremovestream = function (ev) { return console.log(ev.type); };
peerConnection.onstatechange = function (ev) { return console.log(ev.type); };
peerConnection.createOffer(function (offer) {
    peerConnection.setLocalDescription(offer, function () { return console.log("set local description"); }, function (error) { return console.log("Error setting local description: " + error); });
}, function (error) { return console.log("Error creating offer: " + error); });
var type = RTCSdpType[RTCSdpType.offer];
var offer = { type: type, sdp: "some sdp" };
var sessionDescription = new RTCSessionDescription(offer);
peerConnection.setRemoteDescription(sessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error +
            "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error +
    "; offer.sdp=" + offer.sdp); });
var webkitSessionDescription = new webkitRTCSessionDescription(offer);
peerConnection.setRemoteDescription(webkitSessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error +
            "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error +
    "; offer.sdp=" + offer.sdp); });
var mozSessionDescription = new mozRTCSessionDescription(offer);
peerConnection.setRemoteDescription(mozSessionDescription, function () {
    peerConnection.createAnswer(function (answer) {
        peerConnection.setLocalDescription(answer, function () { return console.log('Set local description'); }, function (error) { return console.log("Error setting local description from created answer: " + error +
            "; answer.sdp=" + answer.sdp); });
    }, function (error) { return console.log("Error creating answer: " + error); });
}, function (error) { return console.log('Error setting remote description: ' + error +
    "; offer.sdp=" + offer.sdp); });
var wkPeerConnection = new webkitRTCPeerConnection(config, constraints);
//# sourceMappingURL=ldraw-visualizer.js.map