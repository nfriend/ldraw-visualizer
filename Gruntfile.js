module.exports = function (grunt) {

	grunt.initConfig({
		less: {
			development: {
				options: {
					compress: true,
					optimization: 2,
					sourceMap: true,
					sourceMapFilename: "./styles/ldraw-visualizer-0.0.1.css.map",
					sourceMapBasepath: "./styles/"
				},
				files: {
					'./styles/ldraw-visualizer-0.0.1.css': './styles/ldraw-visualizer-0.0.1.less'
				}
			}
		},
		connect: {
			server: {
				options: {
					useAvailablePort: true,
					base: '.',
					open: true,
					appName: 'open'
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			js: {
				files: ['./scripts/**/*.js', './styles/**/*.less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less', 'connect', 'watch']);
};