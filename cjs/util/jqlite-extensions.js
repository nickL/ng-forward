'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _writers = require('../writers');

var _getInjectableName = require('./get-injectable-name');

var By = (function () {
    function By() {
        _classCallCheck(this, By);
    }

    _createClass(By, null, [{
        key: 'all',
        value: function all() {
            return '*';
        }
    }, {
        key: 'css',
        value: function css(selector) {
            return selector;
        }
    }, {
        key: 'directive',
        value: function directive(type) {
            return _writers.bundleStore.get('selector', type);
        }
    }]);

    return By;
})();

exports.By = By;

(function extendJQLite(proto) {
    Object.defineProperties(proto, {
        nativeElement: {
            get: function get() {
                return this[0];
            }
        },
        componentInstance: {
            get: function get() {
                if (this._componentInstance) return this._componentInstance;
                var isolateScope = this.isolateScope();
                this._componentInstance = isolateScope && isolateScope['ctrl'] || null;
                return this._componentInstance;
            }
        },
        componentViewChildren: {
            get: function get() {
                return [].concat(_toConsumableArray(this.children())).map(function (child) {
                    return angular.element(child);
                });
            }
        },
        getLocal: {
            value: function value(injectable) {
                return (this.injector() || this.inheritedData('$injector')).get((0, _getInjectableName.getInjectableName)(injectable));
            }
        },
        query: {
            value: function value(predicate, scope) {
                var results = this.queryAll(predicate, scope);
                return results.length > 0 ? results[0] : null;
            }
        },
        queryAll: {
            value: function value(predicate, scope) {
                if (scope) throw Error('scope argument not yet supported. All queries are done with Scope.all for now.');
                return Array.from(this[0].querySelectorAll(predicate)).map(function (el) {
                    return angular.element(el);
                });
            }
        },
        getDirectiveInstance: {
            value: function value(index) {
                throw new Error('Not yet implemented in ng-forward.');
            }
        },
        triggerEventHandler: {
            value: function value(eventName, eventObj) {
                throw new Error('Not yet implemented in ng-forward.');
            }
        },
        inject: {
            value: function value(type) {
                throw new Error('Not yet implemented in ng-forward.');
            }
        },
        hasDirective: {
            value: function value(type) {
                throw new Error('Not yet implemented in ng-forward.');
            }
        }
    });
})(angular.element.prototype);
exports['default'] = angular.element;
//# sourceMappingURL=jqlite-extensions.js.map
