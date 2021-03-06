'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Directive = Directive;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _utilParseSelector = require('../util/parse-selector');

var _utilParseSelector2 = _interopRequireDefault(_utilParseSelector);

var _writers = require('../writers');

var _providers = require('./providers');

var _classesModule = require('../classes/module');

var _classesModule2 = _interopRequireDefault(_classesModule);

var _utilDirectiveController = require('../util/directive-controller');

var _utilDirectiveController2 = _interopRequireDefault(_utilDirectiveController);

var _utilHelpers = require('../util/helpers');

var TYPE = 'directive';

function Directive(_ref) {
    var selector = _ref.selector;
    var _ref$providers = _ref.providers;
    var providers = _ref$providers === undefined ? [] : _ref$providers;

    return function (t) {
        if (!selector) {
            throw new Error('Directive selector must be provided');
        }

        var _parseSelector = (0, _utilParseSelector2['default'])(selector);

        var name = _parseSelector.name;
        var restrict = _parseSelector.type;

        if (providers !== undefined && !Array.isArray(providers)) {
            throw new TypeError('Directive providers must be an array');
        }
        _writers.providerStore.set('name', name, t);
        _writers.providerStore.set('type', TYPE, t);
        _writers.bundleStore.set('selector', selector, t);
        _providers.Providers.apply(undefined, _toConsumableArray(providers))(t, 'while analyzing Directive \'' + t.name + '\' providers');
        _writers.componentStore.set('restrict', restrict, t);
    };
}

_classesModule2['default'].addProvider(TYPE, function (target, name, injects, ngModule) {
    var ddo = {};
    _writers.componentStore.forEach(function (val, key) {
        return ddo[key] = val;
    }, target);
    if (ddo.restrict !== 'A') {
        throw new Error((0, _utilHelpers.createConfigErrorMessage)(target, ngModule, '@Directive selectors can only be attributes, e.g. selector: \'[my-directive]\''));
    }
    ngModule.directive(name, ['$injector', function ($injector) {
        ddo.link = function ($scope, $element, $attrs, $requires, $transclude) {
            var locals = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude, $requires: $requires };
            return (0, _utilDirectiveController2['default'])(this, injects, target, ddo, $injector, locals);
        };
        return ddo;
    }]);
});
//# sourceMappingURL=directive.js.map
