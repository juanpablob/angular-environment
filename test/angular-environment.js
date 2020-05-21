'use strict';

describe('Test environment provider', function () {

	var theEnvServiceProvider;
	var envService;

	beforeEach(function () {
		// Initialise the provider by injecting it into a fake module's
		// config block.
		var fakeModule = angular.module('test.app.environment', []);
		fakeModule.config(function (envServiceProvider) {
			theEnvServiceProvider = envServiceProvider;
		});
		// Initialise the test.app injector.
		module('environment', 'test.app.environment');
		inject(function () {});
		envService = theEnvServiceProvider.$get();

		envService.config({
			domains: {
				development: ['localhost'],
				production: ['app.*.com', 'app.web.co.uk']
			},
			vars: {
				development: {
					backend: 'https://backend-dev/',
					authServiceUrl: 'https://auth-server-dev/'
				},
				production: {
					backend: 'https://backend/'
				},
				defaults: {
					authServiceUrl: 'https://auth-server/'
				}
			}
		});
	});

	describe('with envService provider', function () {
		it('tests the envService provider can be created', function () {
			expect(theEnvServiceProvider).toBeDefined();
		});

		it('tests the default environment for envService is development', function () {
			expect(envService.environment).toBe('development');
			expect(envService.get()).toBe('development');
		});

		it('tests the environment for envService can be set', function () {
			envService.set('production');
			expect(envService.get()).toBe('production');
		});

		it('tests the config var for development environment is selected', function () {
			expect(envService.read('backend')).toBe('https://backend-dev/');
		});

		it('tests the config var for production environment is selected', function () {
			envService.set('production');
			expect(envService.read('backend')).toBe('https://backend/');
		});

		it('tests the correct environment is identified by name using is method', function () {
			expect(envService.is('development')).toBe(true);
			expect(envService.is('production')).toBe(false);
			envService.set('production');
			expect(envService.is('development')).toBe(false);
			expect(envService.is('production')).toBe(true);
		});

		(function () {
			var i = 0, args = [undefined, '', 'all'];

			for (i = 0; i < args.length; i++) {
				it('tests all config is returned if read(' + args[i] + ') is called', function () {
					var config = envService.read(args[i]);
					expect(Object.keys(config).length).toBe(2);
					expect(config.authServiceUrl).toBe('https://auth-server-dev/');
					expect(config.backend).toBe('https://backend-dev/');
				});
			}
		})();

		it('tests default value should be chosen from config if value is undefined for the environment',
			function () {
				expect(envService.read('authServiceUrl')).toBe('https://auth-server-dev/');
				envService.set('production');
				expect(envService.read('authServiceUrl')).toBe('https://auth-server/');
			});
	});
});
