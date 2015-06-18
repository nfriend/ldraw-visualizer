/// <reference path="./file-service/file-service.ts" />

module LdrawVisualizer {
	
	FileService.GetPart('fake', (part: FileService.PartFile) => {
		console.log(part);
	});
	
	if (!Detector.webgl) Detector.addGetWebGLMessage();

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
}