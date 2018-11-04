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
          backend: 'https://backend-dev/',
          another_var: 'remain as is'
        },
        production: {
          backend: 'https://backend/',
          another_var: 'another_var_prod'
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

    it('extends previously set values', function () {
      envService.config({
        vars: {
          development: {
            backend: 'http://localhost',
            new_env: 'new env'
          }
        }
      });

      envService.set('development')
      expect(envService.read('backend')).toBe('http://localhost')
      expect(envService.read('another_var')).toBe('remain as is')
      expect(envService.read('new_env')).toBe('new env')

    });

    it('tests new added stage', function () {
      envService.config({
        vars: {
          new_stage: {
            backend: 'http://staging'
          }
        }
      });

      envService.set('new_stage')
      expect(envService.read('backend')).toBe('http://staging')

    });

  });
});

