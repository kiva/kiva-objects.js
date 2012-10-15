module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
	    beforeconcat: ['src/*.js']
    }
  });

  // Load tasks from "grunt-sample" grunt plugin installed via Npm.
//  grunt.loadNpmTasks('grunt-sample');

  // Default task.
  grunt.registerTask('default', 'lint sample');

};