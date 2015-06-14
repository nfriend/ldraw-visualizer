module LdrawVisualizer {
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
		camera.position.z = 500;

		controls = new THREE.OrbitControls(camera);
		controls.damping = 0.2;
		controls.addEventListener('change', render);

		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

		var geometry = new THREE.BoxGeometry(100, 100, 100);
		var material = new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading });
		var cube = new THREE.Mesh(geometry, material);
		cube.position.x = 0;
		cube.position.y = 0;
		cube.position.z = 0;
		cube.updateMatrix();
		cube.matrixAutoUpdate = false;
		scene.add(cube);
		
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
		directionalLight.position.set(1, .6, .2);
		scene.add(directionalLight);

		directionalLight = new THREE.DirectionalLight(0x002288);
		directionalLight.position.set(-1, -1, -1);
		scene.add(directionalLight);

		var ambientLight = new THREE.AmbientLight(0x222222);
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