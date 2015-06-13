var path = require('path');

exports.config = {
	// See docs at https://github.com/brunch/brunch/blob/master/docs/config.md
	modules: {
		definition: false,
		wrapper: false
	},

	paths: {
		'public': 'public',
		'watched': ['app', 'vendor']
	},

	files: {
		javascripts: {
			joinTo: {
				'.htaccess': '/app/assets/.htaccess',
				'js/app.js': /^app/,
				'js/modernizr.js': 'bower_components/modernizr/modernizr.js',
				'js/vendor.js': [
					/^vendor/,

					// external libs
					'bower_components/jquery/dist/jquery.js',
					'bower_components/lodash/dist/lodash.js',
					'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',

					// json-ld
					'bower_components/es6-promise/promise.js',
					'bower_components/jsonld/js/jsonld.js',
					
					// angular
					'bower_components/angular/angular.js',
					'bower_components/angular-resource/angular-resource.js',
					'bower_components/angular-sanitize/angular-sanitize.js',
					'bower_components/angular-ui-router/release/angular-ui-router.js',
					'bower_components/ocModal/dist/ocModal.min.js',
					
					// angular for mock backend
					'bower_components/angular-mocks/angular-mocks.js'
				],
				'test/scenarios.js': /^test(\/|\\)e2e/
			},
			order: {
				before: [
					// jquery
					'bower_components/jquery/jquery.js',

					// jsonld
					'bower_components/es6-promise/promise.js',
					'bower_components/jsonld/js/jsonld.js',
					
					// angular
					'bower_components/angular/angular.js',
					'bower_components/angular-mocks/angular-mocks.js',
					
					// bootstrap
					'bower_components/bootstrap/dist/js/bootstrap.js'
				]
			}
		},
		stylesheets: {
			joinTo: {
				'css/app.css': /^app/,
				'css/vendor.css': [
					'bower_components/animate.css/animate.css'
				]
			}
		}
	},

	plugins: {
		ng_annotate: {
			pattern: /^app/
		},
		traceur: {
			paths: /^app/,
			options: {
				experimental: true
			}
		},
		autoprefixer: {
			browsers: [
				'last 2 version',
				'> 1%', // browsers with > 1% usage
				'ie >= 9'
			],
			cascade: false
		},
		browserSync: {
			notify: false
		}
	},

	server: {
		port: 3333
	},

	conventions: {
		assets: /app(\\|\/)assets(\\|\/)/
	},

	sourceMaps: true
};
