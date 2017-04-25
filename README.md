# AngularJS Environment Plugin

<p align="left">
  <a href="https://www.npmjs.com/package/angular-environment"><img src="https://img.shields.io/npm/v/angular-environment.svg?style=flat-square"></a>
  <a href="http://bower.io/search/?q=angular-environment"><img src="https://img.shields.io/bower/v/angular-environment.svg?style=flat-square"></a>
  <a href="https://github.com/juanpablob/angular-environment/stargazers"><img src="http://img.shields.io/npm/dm/angular-environment.svg?style=flat-square"></a>
</p>

An useful plugin that allows you to set up different variables such as API Url, Sockets, Paths, etc, based on the context of script execution, which means you can set up (for example) different API endpoints depending if you are working on development, stage or production.

## Installation

You can install this package either with `npm` or with `bower`.

### bower
```shell
bower install angular-environment
```

### npm
```shell
npm install angular-environment
```

Then add `environment` as a dependency for your app:

```javascript
angular.module('yourApp', ['environment']);
```

## Documentation

Sometimes, during the development of our applications, we need to use different variables depending on what context our application is running.

Let's say you're working on an application that handles an API, and you have a version of your API running locally on your computer or laptop for testing purposes. Besides, you have the final or in-production API running on a server. Certainly, the API endpoints are not the same in both environments, so, this plugin allows you to work with same variable for the same purpose but using different values depending on what context your application is running: development, stage or production.

Even better, you can execute code depending on the running context. In some cases you probably could need run pieces of code only for development environment and not in for production, or vice versa.

Said that, let's go to configure the plugin and learn how to use it.

### Configuration

* Once installed, inject the `envServiceProvider` into your Angular App config area.
* Organize the environments as you wish under `domains` and `vars` objects.
* You can use wildcards (`*`) to describe your domains, i.e.: `*.domain.com`.
* As optional, you can set defaults variables under `defaults` object within `vars`, to catch not-defined variables in the environments.
* Finally, in the same config area, you will need to check in which context your application is running, by adding `envServiceProvider.check()` which will automatically set the appropriate environment based on given domains.

Here's a full example:

```javascript
angular.module('yourApp', ['environment']).
	config(function(envServiceProvider) {
		// set the domains and variables for each environment
		envServiceProvider.config({
			domains: {
				development: ['localhost', 'acme.dev.local'],
				production: ['acme.com', '*.acme.com', 'acme.dev.prod'],
				test: ['test.acme.com', 'acme.dev.test', 'acme.*.com'],
				// anotherStage: ['domain1', 'domain2']
			},
			vars: {
				development: {
					apiUrl: '//api.acme.dev.local/v1',
					staticUrl: '//static.acme.dev.local',
					// antoherCustomVar: 'lorem',
					// antoherCustomVar: 'ipsum'
				},
				test: {
					apiUrl: '//api.acme.dev.test/v1',
					staticUrl: '//static.acme.dev.test',
					// antoherCustomVar: 'lorem',
					// antoherCustomVar: 'ipsum'
				},
				production: {
					apiUrl: '//api.acme.com/v1',
					staticUrl: '//static.acme.com',
					// antoherCustomVar: 'lorem',
					// antoherCustomVar: 'ipsum'
				},
				// anotherStage: {
				// 	customVar: 'lorem',
				// 	customVar: 'ipsum'
				// },
				defaults: {
					apiUrl: '//api.default.com/v1',
					staticUrl: '//static.default.com'
				}
			}
		});

		// run the environment check, so the comprobation is made
		// before controllers and services are built
		envServiceProvider.check();
	});
```

### Usage

In order to read the configured environment variables alongside your Angular App, you need to inject `envService` into your controllers or services:

```javascript
controller('SomeController', ['$scope', 'envService', function($scope, envService) {
	// ...
}]);
```
#### get()
Returns a string with the current environment

```javascript
var environment = envService.get(); // gets 'development'
```

#### set(*string[environment]*)
Sets desired environment. This will overwrite the settled environment during the automatically check in Angular config process (*see Configuration* topic).

```javascript
envService.set('production'); // will set 'production' as current environment
```

#### is(*string[environment]*)
Returns `true` or `false` if the given environment matches with the current environment.

```javascript
if (envService.is('production')) {
	// actually, the current environment is production
	// so, let's make some logic only for production environment
}
else {
	// we're not in production environment
}
```

#### read(*string[var]*)
Returns the desired environment variable. If no argument is passed, this method will return all variables associated to the current environment.

```javascript
var apiUrl = envService.read('apiUrl'); // gets '//localhost/api'

var allVars = envService.read(); // gets all variables configured under the current environment
```

If the desired variable passed as argument doesn't exists in the current environment, the plugin will check into `defaults` object.

## To-Do

* ~~Support for adding domains with wildcards or regex~~.
* Unit testing.
* Support for protocols.

## Support

To report bugs or request features, please visit the [Issue Tracker](http://github.com/juanpablob/angular-environment/issues).

## Contributing to this plugin

Please feel free to contribute to the plugin with new issues, requests, unit tests, code fixes or new features. If you want to contribute with some code, create a feature branch and send your pull request.

## License

Copyright 2015-2017, [Juan Pablo Barrientos Lagos (juanpablob)](http://twitter.com/juanpablob)

Licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php)<br/>
Redistributions of files must retain the above copyright notice.
