'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _propertiesInputsBuilder = require('../properties/inputs-builder');

var _propertiesInputsBuilder2 = _interopRequireDefault(_propertiesInputsBuilder);

var _propertiesOutputsBuilder = require('../properties/outputs-builder');

var _propertiesOutputsBuilder2 = _interopRequireDefault(_propertiesOutputsBuilder);

var _decoratorsComponent = require('../decorators/component');

exports['default'] = function (caller, injects, controller, ddo, $injector, locals) {
    var instance = Object.create(controller.prototype);
    _decoratorsComponent.componentHooks._beforeCtrlInvoke.forEach(function (hook) {
        return hook(caller, injects, controller, ddo, $injector, locals);
    });
    $injector.invoke([].concat(_toConsumableArray(injects), [controller]), instance, locals);
    _decoratorsComponent.componentHooks._afterCtrlInvoke.forEach(function (hook) {
        return hook(caller, injects, controller, ddo, $injector, locals);
    });
    for (var key in ddo.inputMap) {
        (0, _propertiesInputsBuilder2['default'])(instance, key, ddo.inputMap[key]);
    }
    Object.assign(instance, caller);
    var $element = locals.$element;
    var $scope = locals.$scope;

    (0, _propertiesOutputsBuilder2['default'])(instance, $element, $scope, ddo.outputMap || {});
    if (typeof instance.ngOnInit === 'function') {
        instance.ngOnInit();
    }
    if (typeof instance.ngOnDestroy === 'function') {
        $scope.$on('$destroy', instance.ngOnDestroy.bind(instance));
    }
    if (typeof instance.ngAfterViewInit === 'function') {
        ddo.ngAfterViewInitBound = instance.ngAfterViewInit.bind(instance);
    }
    return instance;
};

module.exports = exports['default'];
//# sourceMappingURL=directive-controller.js.map
