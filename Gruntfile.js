module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-uglify-es");
    grunt.initConfig({
        //tasks and configuration are passed to initConfig function.
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                banner: '/*!<%=pkg.name %> <%= grunt.template.today("yyyy-mm-dd")%>*/\n'
            },
            deploy:{
               files:[{
                   expand: true,
                   src: "src/node/*.js",
                   dest: "build"
               }]
            }
        }

    })

    grunt.registerTask('compress', ['uglify'])

    grunt.registerTask('test', 'just test to define a grunt task', function() {
        grunt.log.write("define a grunt task successfull").ok();
    })


}