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
			vars: {
				development: {
					backend: 'https://backend-dev/'
				},
				production: {
					backend: 'https://backend/'
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
	});
});
