// inject environment module into your module
angular.module('acme', ['environment']).
	// inject environmentServiceProvider into your config
	config(function(envServiceProvider) {
		// set the domains and variables for each environment
		envServiceProvider.config({
			domains: {
				development: ['localhost', 'local.dev'],
				production: ['acme.com', '*.dev.prod'],
				test: ['acme.test', 'acme.net', 'acme.*.test']
			},
			vars: {
				development: {
					apiUrl: '//api.acme.dev.local/v1',
					staticUrl: '//static.acme.dev.local'
					// antoherCustomVar: ''
				},
				production: {
					apiUrl: '//api.acme.dev.prod/v1',
					staticUrl: '//static.acme.dev.prod'
					// antoherCustomVar: ''
				},
				test: {
					// apiUrl: '//api.acme.dev.test/v1',
					staticUrl: '//static.acme.dev.test'
					// antoherCustomVar: ''
				},
				defaults: {
					apiUrl: '//api.default.com/v1',
					staticUrl: '//static.default.com/'
				}
			}
		});

		// run the environment check, so the comprobation is made
		// before controllers and services are built
		envServiceProvider.check();
	}).
	controller('Pages', ['$scope', 'envService', function($scope, envService) {
		$scope.environment = envService.get(); // store the current environment
		$scope.vars = envService.read();
	}]);
