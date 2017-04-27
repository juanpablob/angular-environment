/**
 * angular-environment Plugin
 *
 * An useful plugin that allows you to set up different information
 * such as api endpoints, urls, variables, etc, based on the context of scripts execution:
 * development, stage, production or any other custom environment you want to create.
 *
 * For more information, issues, etc, check out:
 * http://github.com/juanpablob/angular-environment
 */

angular.module('environment', []).
	provider('envService', function() {

		'use strict';

		var local = {};

		local.pregQuote = function(string, delimiter) {
			return (string + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
		};

		local.stringToRegex = function(string) {
			return new RegExp(local.pregQuote(string).replace(/\\\*/g, '.*').replace(/\\\?/g, '.'), 'g');
		};

		this.environment = 'development'; // default
		this.data = {}; // user defined environments data

		/**
		 * config() allow pass as object the
		 * desired environments with their domains
		 * and variables
		 *
		 * @param {Object} config
		 * @return {Void}
		 */
		this.config = function(config) {
			this.data = config;
		};

		/**
		 * set() set the desired environment
		 * based on the passed string
		 *
		 * @param {String} environment
		 * @return {Void}
		 */
		this.set = function(environment) {
			this.environment = environment;
		};

		/**
		 * get() returns the current environment
		 *
		 * @return {Void}
		 */
		this.get = function() {
			return this.environment;
		};

		/**
		 * read() returns the desired variable based
		 * on passed argument
		 *
		 * @param {String} variable
		 * @return {Void}
		 */
		this.read = function(variable) {
			if (typeof variable === 'undefined' || variable === '' || variable === 'all') {
				return this.data.vars[this.get()];
			}
			else if (typeof this.data.vars[this.get()][variable] === 'undefined') {
				return this.data.vars.defaults[variable];
			}

			return this.data.vars[this.get()][variable];
		};

		/**
		 * is() checks if the passed environment
		 * matches with the current environment
		 *
		 * @param {String} environment
		 * @return {Boolean}
		 */
		this.is = function(environment) {
			return (environment === this.environment);
		};

		/**
		 * check() looks for a match between
		 * the actual domain (where the script is running)
		 * and any of the domains under env constant in
		 * order to set the running environment
		 *
		 * @return {Void}
		 */
		this.check = function() {
			var	self = this,
					location = window.location.host,
					matches = [],
					keepGoing = true;

			angular.forEach(this.data.domains, function(v, k) {
				angular.forEach(v, function(v) {
					if (location.match(local.stringToRegex(v))) {
						matches.push({
							environment: k,
							domain: v
						});
					}
				});
			});

			angular.forEach(matches, function(v, k) {
				if (keepGoing) {
					if (location === v.domain) {
						keepGoing = false;
					}

					self.environment = v.environment;
				}
			});
		};

		this.$get = function() {
			return this;
		};
	});
