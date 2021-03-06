'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _writers = require('../writers');

var _parsers = {};

var DecoratedModule = (function () {
    function DecoratedModule(name) {
        var modules = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        _classCallCheck(this, DecoratedModule);

        this.name = name;
        if (modules) {
            this.moduleList(modules);
            this._module = angular.module(name, this._dependencies);
        } else {
            this._module = angular.module(name);
        }
    }

    _createClass(DecoratedModule, [{
        key: 'add',
        value: function add() {
            var _this = this;

            for (var _len = arguments.length, providers = Array(_len), _key = 0; _key < _len; _key++) {
                providers[_key] = arguments[_key];
            }

            // We used a rest parameter so that you can add multiple providers at once.
            // So we must iterate over our array of providers.
            var providersInferred = providers.filter(function (p) {
                return !p.isProvider;
            });
            var providersProper = providers.filter(function (p) {
                return p.isProvider;
            });
            var handleProvider = function handleProvider(provider) {
                if (!_writers.providerStore.has('type', provider)) {
                    throw new Error('Cannot read provider metadata. Are you adding a class that hasn\'t been decorated yet?');
                }
                var type = _writers.providerStore.get('type', provider);
                var name = _writers.providerStore.get('name', provider);
                var inject = _writers.bundleStore.get('$inject', provider) || [];
                if (_parsers[type]) {
                    _parsers[type](provider, name, inject, _this._module);
                } else {
                    throw new Error('No parser registered for type \'' + type + '\'');
                }
            };
            providersInferred.forEach(handleProvider);
            providersProper.forEach(handleProvider);
            return this;
        }
    }, {
        key: 'publish',
        value: function publish() {
            return this._module;
        }
    }, {
        key: 'moduleList',
        value: function moduleList(modules) {
            this._dependencies = [];
            if (modules && modules.length !== 0) {
                for (var i = 0; i < modules.length; i++) {
                    if (typeof modules[i] === 'string') {
                        this._dependencies.push(modules[i]);
                    } else if (modules[i] && modules[i].name) {
                        this._dependencies.push(modules[i].name);
                    } else {
                        throw new Error('Cannot read module: Unknown module in ' + this.name);
                    }
                }
            }
        }
    }, {
        key: 'config',
        value: function config(configFunc) {
            this._module.config(configFunc);
            return this;
        }
    }, {
        key: 'run',
        value: function run(runFunc) {
            this._module.run(runFunc);
            return this;
        }
    }, {
        key: 'value',
        value: function value(name, _value) {
            this._module.value(name, _value);
            return this;
        }
    }, {
        key: 'constant',
        value: function constant(name, value) {
            this._module.constant(name, value);
            return this;
        }
    }]);

    return DecoratedModule;
})();

exports.DecoratedModule = DecoratedModule;

var Module = function Module(name, modules) {
    return new DecoratedModule(name, modules);
};
Module.addProvider = function (providerType, parser) {
    _parsers[providerType] = parser;
};
Module.getParser = function (providerType) {
    return _parsers[providerType];
};
exports['default'] = Module;
//# sourceMappingURL=module.js.map
