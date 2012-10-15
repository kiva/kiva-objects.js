/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },
    lint: {
      files: ['src/*.js', 'test/spec/*.js']
    },
//    qunit: {
//      files: ['test/**/*.html']
//    },
//    concat: {
//      dist: {
//        src: ['<banner:meta.banner>', '<file_strip_banner:lib/FILE_NAME.js>'],
//        dest: 'dist/FILE_NAME.js'
//      }
//    },
//    min: {
//      dist: {
//        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
//        dest: 'dist/FILE_NAME.min.js'
//      }
//    },
//    watch: {
//      files: '<config:lint.files>',
//      tasks: 'lint qunit'
//    },
    jshint: {
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
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint');

};
