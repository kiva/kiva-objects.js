/*global module:false*/
module.exports = function(grunt) {
	'use strict';


	// Project configuration.
	grunt.initConfig({
		meta: {
			version: '0.1.0'
			, banner: '/**\n * kiva.js - v<%= meta.version %> - <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
				' * http://kiva.org/\n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> kiva.org\n */'
		}
		, sourceFiles: [
			'src/kiva.js'
			, 'src/Object.js'
			, 'src/RequestObject.js'
			, 'src/JournalEntry.js'
			, 'src/Lender.js'
			, 'src/Loan.js'
			, 'src/Partner.js'
			, 'src/Team.js'
		]
		, min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>']
				, dest: 'dist/kiva.min.js'
			}
		}
		, watch: {
			files: '<config:sourceFiles>'
			, tasks: 'concat lint jasmine'
		}
		, lint: {
			all: ['kiva.js', 'grunt.js', 'test/spec/*.js']
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
		, uglify: {
            my_target: {
                files: {
                    'kiva.min.js': ['kiva.js']
                }
            }
        }
		, jasmine : {
			src: ['kiva.js']
			, specs: [
				'test/spec/kiva.js'
				, 'test/spec/Object.js'
				, 'test/spec/RequestObject.js'
				, 'test/spec/Loan.js'
				, 'test/spec/Lender.js'
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
			browser : true
		}
		, dox: {
			files: {
				src: 'kiva.js'
				, dest: 'docs'
			}
		}

        , rig: {
            compile: {
                'dist/kiva.js': 'src/kiva.js'
            }
        }

        , copy: {
            publish: {

            }
        }
	});

    grunt.loadNpmTasks('grunt-rigger');
    grunt.loadNpmTasks('grunt-contrib-uglify');

	// @todo add "dox" back in, however, for now it seems to be causing task listed after it to not run
	grunt.registerTask('build', 'concat lint min');

};
