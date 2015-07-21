// inject environment module into your module
angular.module('acme', ['environment']).
	// inject environmentServiceProvider into your config
	config(function(envServiceProvider) {
		// set the domains and variables for each environment
		envServiceProvider.config({
			domains: {
				development: ['localhost', 'dev.local'],
				production: ['acme.com', 'acme.net', 'acme.org']
				// anotherStage: []
			},
			vars: {
				development: {
					apiUrl: '//localhost/api',
					staticUrl: '//localhost/static'
					// antoherCustomVar: ''
				},
				production: {
					apiUrl: '//api.acme.com/v2',
					staticUrl: '//static.acme.com'
					// antoherCustomVar: ''
				}
			}
		});

		// run the environment check, so the comprobation is made
		// before controllers and services are built
		envServiceProvider.check();
	}).
	controller('Pages', ['$scope', 'envService', function($scope, envService) {
		$scope.environment = envService.get(); // store the current environment
		$scope.vars = envService.read('all');
	}]);
