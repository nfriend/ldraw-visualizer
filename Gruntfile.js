module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dom_munger: {
			main: {
				options: {
					read: [
						{ selector: 'link:not(.dom_munger-ignore)', attribute: 'href', writeto: 'cssRefs', isPath: true },
						{ selector: 'script:not(.dom_munger-ignore)', attribute: 'src', writeto: 'jsRefs', isPath: true }
					],
					remove: ['link:not(.dom_munger-ignore)', 'script:not(.dom_munger-ignore)', 'script.dom_munger-remove'],
					append: [
						{ selector: 'head', html: '<link href="ldraw-visualizer-<%= pkg.version %>.min.css" rel="stylesheet">' },
						{ selector: 'body', html: '<script src="ldraw-visualizer-<%= pkg.version %>.min.js"></script>' }
					]
				},
				src: './index.html',
				dest: './dist/index.html'
			},
		},
		clean: ['./dist'],
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'./dist/ldraw-visualizer-<%= pkg.version %>.min.css': './styles/ldraw-visualizer.css'
				}
			}
		},
		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			files: {
				'./dist/index.html': './dist/index.html'
			}
		},
		uglify: {
			options: {
				mangle: true
			},
			main: {
				src: '<%= dom_munger.data.jsRefs %>',
				dest: './dist/ldraw-visualizer-<%= pkg.version %>.min.js'
			}
		},
		less: {
			development: {
				options: {
					compress: true,
					optimization: 2,
					sourceMap: true,
					sourceMapFilename: "./styles/ldraw-visualizer.css.map",
					sourceMapBasepath: "./styles/"
				},
				files: {
					'./styles/ldraw-visualizer.css': './styles/ldraw-visualizer.less'
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						src: ['./favicon.ico'],
						dest: './dist',
						filter: 'isFile'
					},
					{
						expand: true,
						src: ['./models/**'],
						dest: './dist'
					},
					{
						expand: true,
						src: ['./parts-server/**'],
						cwd: './compiled',
						dest: './dist/server/'
					}
				]
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
				files: ['./scripts/**/*.js', './styles/**/*.less', './**/*.html']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-dom-munger');

	grunt.registerTask('dist', ['clean', 'dom_munger', 'less', 'cssmin', 'htmlmin', 'uglify', 'copy']);

	grunt.registerTask('default', ['less', 'connect', 'watch']);
};