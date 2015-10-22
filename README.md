# AngularJS Environment Plugin

Version 1.0.3

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

Once installed, you need to inject the `envServiceProvider` into your Angular App config area and then, add your environments under `domains` and `vars` objects, adding also the array of domains which belongs to each environment and also for vars.

Finally, in the same config area, you need to check in what context your application is running, by adding `envServiceProvider.check()` which will automatically set the appropriate environment based on given domains.

Here's a full example:

```javascript
angular.module('yourApp', ['environment']).
	config(function(envServiceProvider) {
		// set the domains and variables for each environment
		envServiceProvider.config({
			domains: {
				development: ['localhost', 'dev.local'],
				production: ['acme.com', 'acme.net', 'acme.org']
				// anotherStage: ['domain1', 'domain2'],
				// anotherStage: ['domain1', 'domain2']
			},
			vars: {
				development: {
					apiUrl: '//localhost/api',
					staticUrl: '//localhost/static'
					// antoherCustomVar: 'lorem',
					// antoherCustomVar: 'ipsum'
				},
				production: {
					apiUrl: '//api.acme.com/v2',
					staticUrl: '//static.acme.com'
					// antoherCustomVar: 'lorem',
					// antoherCustomVar: 'ipsum'
				}
				// anotherStage: {
				// 	customVar: 'lorem',
				// 	customVar: 'ipsum'
				// }
			}
		});

		// run the environment check, so the comprobation is made
		// before controllers and services are built
		envServiceProvider.check();
	});
```

**For now, it's very important** to not use wildcards (`*`) or regex in your environment domains. If you want to match any subdomain (i.e `sub.domain.acme.com`), you should add the main TLD: `acme.com` or `sub.domain.acme.com` in case you want to match the exact domain.

*In the next release of this plugin you'll be able to add domains using wildcards and regex*

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
Returns the desired environment variable. If the argument is `all`, this method will return all variables associated to the current environment.

```javascript
var apiUrl = envService.read('apiUrl'); // gets '//localhost/api'

var allVars = envService.read('all'); // gets all variables configured under the current environment
```

## To-Do

* Support for adding domains with wildcards or regex
* Comprobe Add logic to `check()`
* Testing

## Support

To report bugs or request features, please visit the [Issue Tracker](http://github.com/juanpablob/angular-environment/issues).

## Contributing to this plugin

Please feel free to contribute to the plugin with new issues, requests, unit tests, code fixes or new features. If you want to contribute with some code, create a feature branch and send your pull request.

## License

Copyright 2015, [Juan Pablo Barrientos Lagos (juanpablob)](http://twitter.com/juanpablob)

Licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php)<br/>
Redistributions of files must retain the above copyright notice.
