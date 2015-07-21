// inject environment module into your module
angular.module('acme', ['environment']).
	// inject environmentServiceProvider into your config
	config(function(environmentServiceProvider) {
		// set the domains and variables for each environment
		environmentServiceProvider.config({
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
		environmentServiceProvider.check();
	}).
	controller('Pages', ['$scope', 'environmentService', function($scope, environmentService) {
		$scope.environment = environmentService.get(); // store the current environment
		$scope.vars = environmentService.read('all');
	}]);
