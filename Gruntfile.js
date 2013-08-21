'use strict';

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                regexp: true,
                undef: true,
                unused: true,
                indent: 4,
                quotmark: 'single',
                loopfunc: true,
                browser: true,
                node: true,
                globals: {
                }
            },
            test: ['Gruntfile.js', 'index.js']
        },
        copy: {
            demo: {
                expand: true,
                src: ['index.js', 'browsers/**'],
                dest: 'node_modules/karma-detect-browsers'
            }
        },
        karma: {
            demo: {
                configFile: 'demo/karma.conf.js'
            },
            disabled: {
                configFile: 'demo/karma.conf.js',
                detectBrowsers: {
                    enabled: false
                }
            },
            phantomjs_disabled: {
                configFile: 'demo/karma.conf.js',
                detectBrowsers: {
                    usePhantomJS: false
                }
            }
        }
    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');

    // Register tasks.
    grunt.registerTask('test', ['jshint:test']);
    grunt.registerTask('demo', ['copy:demo', 'karma']);

    // Default task.
    grunt.registerTask('default', ['test']);
};