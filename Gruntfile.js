module.exports = function (grunt) {

	grunt.initConfig({
		connect: {
			server: {
				options: {
					useAvailablePort: true,
					base: '.',
					open: true,
					appName: 'open',
					keepalive: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['connect']);
};