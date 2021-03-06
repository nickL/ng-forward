'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _writers = require('../writers');

var _module2 = require('./module');

var _module3 = _interopRequireDefault(_module2);

var _decoratorsInject = require('../decorators/inject');

var _utilGetInjectableName = require('../util/get-injectable-name');

var _decoratorsProviders = require('../decorators/providers');

var _decoratorsInjectable = require('../decorators/injectable');

var TYPE = 'provider';

var Provider = (function () {
    function Provider(token, _ref) {
        var useClass = _ref.useClass;
        var useValue = _ref.useValue;
        var useConstant = _ref.useConstant;
        var useFactory = _ref.useFactory;
        var deps = _ref.deps;

        _classCallCheck(this, Provider);

        this.isProvider = true;
        this._dependencies = [];
        try {
            this.token = (0, _utilGetInjectableName.getInjectableNameWithJitCreation)(token);
        } catch (e) {
            throw new Error('new Provider() Error: Invalid token ' + token);
        }
        Object.assign(this, { useClass: useClass, useValue: useValue, useConstant: useConstant, useFactory: useFactory });
        if (!useClass && !useValue && !useConstant && !useFactory) {
            throw new Error('new Provider(' + token + ') Error: No usage provided (i.e. useClass, useValue, useConstant, useFactory)');
        }
        if (deps) {
            _decoratorsInject.Inject.apply(undefined, _toConsumableArray(deps))(this.useFactory);
            _decoratorsProviders.Providers.apply(undefined, _toConsumableArray(deps.filter(function (d) {
                return typeof d !== 'string';
            })))(this.useFactory, 'while analyzing Provider \'' + this.token + '\' useFactory deps');
            this._dependencies = _writers.bundleStore.get('$inject', this.useFactory);
        }
        _writers.providerStore.set('name', this.token, this);
        _writers.providerStore.set('type', TYPE, this);
    }

    _createClass(Provider, [{
        key: 'type',
        get: function get() {
            var _this = this;

            if (this._type) return this._type;
            this._type = Object.keys(this).find(function (k) {
                return k.startsWith('use') && _this[k] !== undefined;
            });
            return this._type;
        }
    }, {
        key: 'dependencies',
        get: function get() {
            return this._dependencies;
        }
    }]);

    return Provider;
})();

exports.Provider = Provider;

_module3['default'].addProvider(TYPE, function (provider, name, injects, ngModule) {
    switch (provider.type) {
        case 'useValue':
            ngModule.value(provider.token, provider.useValue);
            break;
        case 'useConstant':
            ngModule.constant(provider.token, provider.useConstant);
            break;
        case 'useClass':
            injects = _writers.bundleStore.get('$inject', provider.useClass) || [];
            _module3['default'].getParser(_decoratorsInjectable.INJECTABLE)(provider.useClass, provider.token, injects, ngModule);
            break;
        case 'useFactory':
            ngModule.factory(provider.token, [].concat(_toConsumableArray(provider.dependencies), [provider.useFactory]));
            break;
        default:
            break;
    }
});
var provide = function provide(token, _ref2) {
    var useClass = _ref2.useClass;
    var useValue = _ref2.useValue;
    var useConstant = _ref2.useConstant;
    var useFactory = _ref2.useFactory;
    var deps = _ref2.deps;

    return new Provider(token, { useClass: useClass, useValue: useValue, useConstant: useConstant, useFactory: useFactory, deps: deps });
};
exports.provide = provide;
//# sourceMappingURL=provider.js.map
