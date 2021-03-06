'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.Component = Component;
exports.View = View;

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

var _inputOutput = require('./input-output');

var _propertiesInputsBuilder = require('../properties/inputs-builder');

var _eventsEvents = require('../events/events');

var _eventsEvents2 = _interopRequireDefault(_eventsEvents);

var _utilHelpers = require('../util/helpers');

var TYPE = 'component';
var componentHooks = {
    _after: [],
    _extendDDO: [],
    _beforeCtrlInvoke: [],
    _afterCtrlInvoke: [],
    after: function after(fn) {
        this._after.push(fn);
    },
    extendDDO: function extendDDO(fn) {
        this._extendDDO.push(fn);
    },
    beforeCtrlInvoke: function beforeCtrlInvoke(fn) {
        this._beforeCtrlInvoke.push(fn);
    },
    afterCtrlInvoke: function afterCtrlInvoke(fn) {
        this._afterCtrlInvoke.push(fn);
    }
};
exports.componentHooks = componentHooks;

function Component(_ref) {
    var selector = _ref.selector;
    var controllerAs = _ref.controllerAs;
    var template = _ref.template;
    var templateUrl = _ref.templateUrl;
    var _ref$providers = _ref.providers;
    var providers = _ref$providers === undefined ? [] : _ref$providers;
    var _ref$inputs = _ref.inputs;
    var inputs = _ref$inputs === undefined ? [] : _ref$inputs;
    var _ref$outputs = _ref.outputs;
    var outputs = _ref$outputs === undefined ? [] : _ref$outputs;
    var _ref$pipes = _ref.pipes;
    var pipes = _ref$pipes === undefined ? [] : _ref$pipes;
    var _ref$directives = _ref.directives;
    var directives = _ref$directives === undefined ? [] : _ref$directives;

    return function (t) {
        if (!selector) {
            throw new Error('Component Decorator Error in "' + t.name + '": Component selector must be provided');
        }

        var _parseSelector = (0, _utilParseSelector2['default'])(selector);

        var name = _parseSelector.name;
        var restrict = _parseSelector.type;

        _writers.providerStore.set('name', name, t);
        _writers.providerStore.set('type', TYPE, t);
        _writers.bundleStore.set('selector', selector, t);
        _providers.Providers.apply(undefined, _toConsumableArray(providers))(t, 'while analyzing Component \'' + t.name + '\' providers');
        _writers.componentStore.set('restrict', restrict, t);
        _writers.componentStore.set('scope', {}, t);
        _writers.componentStore.set('transclude', true, t);
        _writers.componentStore.set('bindToController', true, t);
        [['inputs', inputs], ['providers', providers], ['directives', directives], ['outputs', outputs]].forEach(function (_ref2) {
            var _ref22 = _slicedToArray(_ref2, 2);

            var propName = _ref22[0];
            var propVal = _ref22[1];

            if (propVal !== undefined && !Array.isArray(propVal)) {
                throw new TypeError('Component Decorator Error in "' + t.name + '": Component ' + propName + ' must be an array');
            }
        });
        (0, _inputOutput.writeMapMulti)(t, inputs, 'inputMap');
        var outputMap = (0, _inputOutput.writeMapMulti)(t, outputs, 'outputMap');
        Object.keys(outputMap).forEach(function (key) {
            return _eventsEvents2['default'].add(key);
        });
        if (controllerAs === '$auto') {
            _writers.componentStore.set('controllerAs', name, t);
        } else if (controllerAs) {
            _writers.componentStore.set('controllerAs', controllerAs, t);
        } else {
            _writers.componentStore.set('controllerAs', 'ctrl', t);
        }
        if (t.link) {
            _writers.componentStore.set('link', t.link, t);
        }
        if (t.compile) {
            _writers.componentStore.set('compile', t.compile, t);
        }
        View({
            selector: selector,
            template: template,
            templateUrl: templateUrl,
            pipes: pipes,
            directives: directives
        })(t);
    };
}

function View(_ref3) {
    var selector = _ref3.selector;
    var template = _ref3.template;
    var templateUrl = _ref3.templateUrl;
    var _ref3$pipes = _ref3.pipes;
    var pipes = _ref3$pipes === undefined ? [] : _ref3$pipes;
    var _ref3$directives = _ref3.directives;
    var directives = _ref3$directives === undefined ? [] : _ref3$directives;

    return function (t) {
        if (templateUrl) {
            _writers.componentStore.set('templateUrl', templateUrl, t);
        } else if (template) {
            _writers.componentStore.set('template', template, t);
        } else {
            throw new Error('@Component config must include either a template or a template url for component with selector ' + selector + ' on ' + t.name);
        }
        _providers.Providers.apply(undefined, _toConsumableArray(directives))(t, 'while analyzing Component \'' + t.name + '\' directives');
        _providers.Providers.apply(undefined, _toConsumableArray(pipes))(t, 'while analyzing Component \'' + t.name + '\' pipes');
    };
}

_classesModule2['default'].addProvider(TYPE, function (target, name, injects, ngModule) {
    var ddo = {};
    _writers.componentStore.forEach(function (val, key) {
        return ddo[key] = val;
    }, target);
    var bindProp = angular.version.minor >= 4 ? 'bindToController' : 'scope';
    ddo[bindProp] = (0, _propertiesInputsBuilder.inputsMap)(ddo.inputMap);
    if (ddo.restrict !== 'E') {
        throw new Error((0, _utilHelpers.createConfigErrorMessage)(target, ngModule, '@Component selectors can only be elements. ' + 'Perhaps you meant to use @Directive?'));
    }
    controller.$inject = ['$scope', '$element', '$attrs', '$transclude', '$injector'];
    function controller($scope, $element, $attrs, $transclude, $injector) {
        var locals = { $scope: $scope, $element: $element, $attrs: $attrs, $transclude: $transclude };
        return (0, _utilDirectiveController2['default'])(this, injects, target, ddo, $injector, locals);
    }
    ddo.controller = controller;
    if (typeof target.prototype.ngAfterViewInit === 'function') {
        ddo.link = function () {
            return ddo.ngAfterViewInitBound();
        };
    }
    if (ddo.template && ddo.template.replace) {
        ddo.template = ddo.template.replace(/ng-content/g, 'ng-transclude');
    }
    componentHooks._extendDDO.forEach(function (hook) {
        return hook(ddo, target, name, injects, ngModule);
    });
    ngModule.directive(name, function () {
        return ddo;
    });
    componentHooks._after.forEach(function (hook) {
        return hook(target, name, injects, ngModule);
    });
});
//# sourceMappingURL=component.js.map
