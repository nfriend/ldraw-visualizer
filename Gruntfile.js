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
		},
		watch: {
			all: {
				options: {
					livereload: true
				},
				files: ['./scripts/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['connect']);
};