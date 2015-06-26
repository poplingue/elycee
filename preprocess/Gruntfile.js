module.exports = function(grunt) {

    // TODO mettre des variables avec les chemin de fichiers (pour modifier qu'à un seul endroit) http://putaindecode.fr/posts/js/premiers-pas-avec-grunt/
    // TODO faire une version sans require ? avec juste concat

    var config  = grunt.file.readJSON('config.json');

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: config,

        // JSHINT
        jshint: {
            all: ['Gruntfile.js', '<%= config.js_path %>/**/*.js'],
            options: {
                force: true,
                reporter: require('jshint-stylish')
            }
        },

        // UGLIFY - MINIFY - CONCAT JS ( https://github.com/gruntjs/grunt-contrib-uglify )
        uglify: {
            options: {
            },
            dev: {
                options: {
                    mangle: false,
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    compress: false,
                    beautify: true,
                    preserveComments: true
                },
                files: {
                    '<%= config.public_path %>/<%= config.js_dir %>/app.js': [
                        '<%= config.precompiled_path %>/**/*.js',
                        '<%= config.js_path %>/**/*.js',
                        '!<%= config.js_path %>/**/_*.js' // IGNORED
                    ],
                    '<%= config.public_path %>/<%= config.js_dir %>/vendor.js': [
                        '<%= config.bower_path %>/bower.js',
                        '<%= config.vendor_path %>/**/*.js',
                        '<%= config.bower_path %>/requirejs/require.js',
                        '!<%= config.vendor_path %>/**/_*.js' // IGNORED
                    ]
                }

            },
            prod: {
                options: {
                    mangle: true, //replace variable/function name
                    sourceMap: false,
                    preserveComments: 'some',
                    compress: { //http://lisperator.net/uglifyjs/compress
                        drop_console: true, //remove console.log
                        warnings: false
                    }
                },
                files: {
                    '<%= config.public_path %>/<%= config.js_dir %>/app.js': [
                        '<%= config.precompiled_path %>/**/*.js',
                        '<%= config.js_path %>/**/*.js',
                        '!<%= config.js_path %>/**/_*.js' // IGNORED
                    ],
                    '<%= config.public_path %>/<%= config.js_dir %>/vendor.js': [
                        '<%= config.bower_path %>/bower.js',
                        '<%= config.vendor_path %>/**/*.js',
                        '<%= config.bower_path %>/almond/almond.js',
                        '!<%= config.vendor_path %>/**/_*.js' // IGNORED
                    ]
                }
            }
        },

        // SASS
        sass: {
            dev: {
                options: {
                    style: 'nested',
                    lineNumbers: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.sass_path %>',
                    src: ['**/*.scss'],
                    dest: '<%= config.public_path %>/<%= config.css_dir %>/',
                    ext: '.css'
                }]
            },
            prod: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.sass_path %>',
                    src: ['**/*.scss'],
                    dest: '<%= config.public_path %>/<%= config.css_dir %>/',
                    ext: '.css'
                }]
            }
        },

        // SPRITES
        sprite:{
           "@1x": {
                src: '<%= config.img_path %>/sprite/@1x/*.{png,jpg,gif}',
                dest: '<%= config.public_path %>/img/sprite/@1x.png',
                destCss: '<%= config.sass_path %>/sprite/built/_@1x.scss',
                cssFormat: 'scss',
                imgPath: '../../img/sprite/@1x.png'
            },
            "@2x": {
                src: '<%= config.img_path %>/sprite/@2x/*.{png,jpg,gif}',
                dest: '<%= config.public_path %>/img/sprite/@2x.png',
                destCss: '<%= config.sass_path %>/sprite/built/_@2x.scss',
                cssFormat: 'scss',
                imgPath: '../../img/sprite/@2x.png',
                cssVarMap: function (sprite) {
                    sprite.name = 'at2x-' + sprite.name;
                }
            }
        },

        // WATCHER
        watch: {
            options: {
                forever: true, //prevent error from exiting the watch process
                event:['changed', 'added', 'deleted']
            },
            config: {
                files: ['Gruntfile.js', "config.json"],
                options: {
                    reload: true
                }
            },
            scripts: {
                files: ['<%= config.js_path %>/**/*.js'],
                tasks: ['jshint', 'uglify:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            sass: {
                files: ['<%= config.sass_path %>/**/*.scss'],
                tasks: ['sass:dev']
            },
            css: {
                files: ['<%= config.public_path %>/**/*.css'],
                options: {
                    livereload: true
                }
            },
            sprite: {
                files: ['<%= config.img_path %>/sprite/**/*.{png,jpg,gif}'],
                tasks: ['sprite']
            },
            bower: {
                files: ['<%= config.bower_path %>/**/*.js'],
                tasks: ['bower_concat']
            }
        },

        //CONCAT BOWER LIBRAIRIES
        bower_concat: {
            dev: {
                dest: '<%= config.bower_path %>/bower.js',
                cssDest: '<%= config.public_path%>/<%= config.css_dir %>/bower.css',
                dependencies: config.bower_dependencies,
                mainFiles: config.bower_main_files,
                exclude: [
                    'almond',
                    'requirejs'
                ],
            },
            prod: {
                dest: '<%= config.bower_path %>/bower.js',
                cssDest: '<%= config.public_path%>/<%= config.css_dir %>/bower.css',
                dependencies: config.bower_dependencies,
                mainFiles: config.bower_main_files,
                exclude: [
                    'almond',
                    'requirejs'
                ]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadTasks('./tasks');

    // Tasks
    grunt.registerTask('prod_compile', ["jshint", "bower_concat:prod", "uglify:prod", "sprite", "sass:prod"]);
    grunt.registerTask('dev_compile', ["jshint", "bower_concat:dev", "uglify:dev", "sprite", "sass:dev"]);
    grunt.registerTask('watching', ["dev_compile", "watch"]);
    grunt.registerTask('test', ["jshint", "bower_concat:dev", "uglify:dev", "mocha", "watch"]);
    grunt.registerTask('docs', ["doxx"]);
    grunt.registerTask('default', ["watching"]);
};
