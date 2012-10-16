/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		meta: {
			version: '0.1.0'
			, banner: '/*! kiva.js - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* http://kiva.org/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'kiva.org; Licensed MIT */'
		}
		, lint: {
			files: ['src/*.js', 'test/spec/*.js']
		}
		, concat: {
			dist: {
				src: ['<banner:meta.banner>', 'src/*.js']
				, dest: 'kiva.js'
			}
		}
		, min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>']
				, dest: 'kiva.min.js'
			}
		}
		//   watch: {
		//      files: '<config:lint.files>',
		//      tasks: 'lint qunit'
		//    }
		, dox: {
			files: {
				src: ['kiva.js']
				, dest: 'docs'
			}
		}
		, jshint: {
			options: {
				"browser": true
				, "bitwise": true
				, "curly": true
				, "eqeqeq": false
				, "immed": true
				, "latedef": true
				, "newcap": true
				, "node": true
				, "noarg": true
				, "noempty": true
				, "nonew": true
				, "smarttabs": true
				, "strict": true
				, "trailing": true
				, "undef": true
				, "laxbreak": true
				, "laxcomma": true
				, "proto": true
				, "validthis": true
				, "jquery": true
				, predef: ['kiva']
			}
			, globals: {
				jQuery: true
			}
		}
		, uglify: {}
		, jasmine : {
			src: [
				'src/kiva.js'
				, 'src/Object.js'
				, 'src/RequestObject.js'
				, 'src/*.js'
			]
			, specs: [
				'test/spec/kiva.js'
				, 'test/spec/Object.js'
				, 'test/spec/RequestObject.js'
				, 'test/spec/*.js'
			]
			, timeout: 1000
			, template: 'test/specRunner.tmpl'
			, junit: {
				output: 'test/junit/'
			}
			, phantomjs: {
				'ignore-ssl-errors': true
			}
		}
		, 'jasmine-server' : {
			browser : false
		}
	});


	// Add dox https://github.com/punkave/grunt-dox
	grunt.loadNpmTasks('grunt-dox');


	// Add jasmine https://github.com/jasmine-contrib/grunt-jasmine-runner
	grunt.loadNpmTasks('grunt-jasmine-runner');


	// Default task.
	grunt.registerTask('default', 'lint jasmine concat min dox');

};
