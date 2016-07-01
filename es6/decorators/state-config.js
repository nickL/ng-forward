import { componentStore, bundleStore } from '../writers';
import { Providers } from './providers';
import { componentHooks } from "./component";
import { createConfigErrorMessage } from '../util/helpers';
import { getInjectableName } from '../util/get-injectable-name';
const configsKey = 'ui-router.stateConfigs';
const childConfigsKey = 'ui-router.stateChildConfigs';
const annotatedResolvesKey = 'ui-router.annotatedResolves';
const resolvedMapKey = 'ui-router.resolvedMap';
export function StateConfig(stateConfigs) {
    return function (t) {
        Providers(...stateConfigs.map(sc => sc.component))(t, `while analyzing StateConfig '${t.name}' state components`);
        componentStore.set(childConfigsKey, stateConfigs, t);
        stateConfigs.forEach(config => {
            if (!config.component)
                return;
            let existingConfigs = componentStore.get(configsKey, config.component) || [];
            componentStore.set(configsKey, [...existingConfigs, config], config.component);
        });
    };
}
function targetIsStaticFn(t) {
    return t.name !== undefined && t.constructor.name === 'Function';
}
export function Resolve(resolveName = null) {
    return function (target, resolveFnName, { value: resolveFn }) {
        if (!targetIsStaticFn(target)) {
            throw new Error('@Resolve target must be a static method.');
        }
        componentStore.merge(annotatedResolvesKey, { [resolveName || resolveFnName]: resolveFn }, target);
    };
}
componentHooks.extendDDO((ddo) => {
    if (ddo.template && ddo.template.replace) {
        ddo.template = ddo.template.replace(/ng-outlet/g, 'ui-view');
    }
});
componentHooks.after((target, name, injects, ngModule) => {
    const childStateConfigs = componentStore.get(childConfigsKey, target);
    if (childStateConfigs) {
        if (!Array.isArray(childStateConfigs)) {
            throw new TypeError(createConfigErrorMessage(target, ngModule, '@StateConfig param must be an array of state objects.'));
        }
        ngModule.config(['$stateProvider', function ($stateProvider) {
                if (!$stateProvider)
                    return;
                childStateConfigs.forEach((config) => {
                    const tagName = bundleStore.get('selector', config.component);
                    config.template = config.template || `<${tagName}></${tagName}>`;
                    const annotatedResolves = componentStore.get(annotatedResolvesKey, config.component) || {};
                    Object.keys(annotatedResolves).forEach(resolveName => {
                        const resolveFn = annotatedResolves[resolveName];
                        const fnInjects = bundleStore.get('$inject', resolveFn);
                        resolveFn.$inject = fnInjects;
                    });
                    config.resolve = Object.assign({}, config.resolve, annotatedResolves);
                    const childInjects = bundleStore.get('$inject', config.component);
                    const injects = childInjects ? childInjects.map(getInjectableName) : [];
                    function stateController(...resolves) {
                        const resolvedMap = resolves.reduce((obj, val, i) => {
                            obj[injects[i]] = val;
                            return obj;
                        }, {});
                        componentStore.set(resolvedMapKey, resolvedMap, config.component);
                    }
                    config.controller = config.controller || [...injects, stateController];
                    $stateProvider.state(config.name, config);
                });
            }]);
    }
});
componentHooks.beforeCtrlInvoke((caller, injects, controller, ddo, $injector, locals) => {
    const resolvesMap = componentStore.get(resolvedMapKey, controller);
    Object.assign(locals, resolvesMap);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kZWNvcmF0b3JzL3N0YXRlLWNvbmZpZy50cyJdLCJuYW1lcyI6WyJTdGF0ZUNvbmZpZyIsInRhcmdldElzU3RhdGljRm4iLCJSZXNvbHZlIiwic3RhdGVDb250cm9sbGVyIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLGNBQWMsRUFBRSxXQUFXLEVBQWdCLE1BQU0sWUFBWTtPQUU5RCxFQUFDLFNBQVMsRUFBQyxNQUFNLGFBQWE7T0FDOUIsRUFBQyxjQUFjLEVBQUMsTUFBTSxhQUFhO09BQ25DLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpQkFBaUI7T0FDakQsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QjtBQUk3RCxNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQztBQUM1QyxNQUFNLGVBQWUsR0FBRyw2QkFBNkIsQ0FBQztBQUN0RCxNQUFNLG9CQUFvQixHQUFHLDZCQUE2QixDQUFDO0FBQzNELE1BQU0sY0FBYyxHQUFHLHVCQUF1QixDQUFDO0FBb0IvQyw0QkFBNEIsWUFBK0I7SUFDdkRBLE1BQU1BLENBQUNBLFVBQVNBLENBQU1BO1FBRWxCLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDLElBQUksb0JBQW9CLENBQUMsQ0FBQztRQUdsSCxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFJckQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDOUIsSUFBSSxlQUFlLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3RSxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUs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VztJQUduSCxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJsaWIvZGVjb3JhdG9ycy9zdGF0ZS1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2NvbXBvbmVudFN0b3JlLCBidW5kbGVTdG9yZSwgcHJvdmlkZXJTdG9yZX0gZnJvbSAnLi4vd3JpdGVycyc7XG5pbXBvcnQgTW9kdWxlIGZyb20gJy4uL2NsYXNzZXMvbW9kdWxlJztcbmltcG9ydCB7UHJvdmlkZXJzfSBmcm9tICcuL3Byb3ZpZGVycyc7XG5pbXBvcnQge2NvbXBvbmVudEhvb2tzfSBmcm9tIFwiLi9jb21wb25lbnRcIjtcbmltcG9ydCB7Y3JlYXRlQ29uZmlnRXJyb3JNZXNzYWdlfSBmcm9tICcuLi91dGlsL2hlbHBlcnMnO1xuaW1wb3J0IHtnZXRJbmplY3RhYmxlTmFtZX0gZnJvbSAnLi4vdXRpbC9nZXQtaW5qZWN0YWJsZS1uYW1lJztcbmltcG9ydCBJU3RhdGUgPSBuZy51aS5JU3RhdGU7XG5pbXBvcnQgSVN0YXRlUHJvdmlkZXIgPSBuZy51aS5JU3RhdGVQcm92aWRlcjtcblxuY29uc3QgY29uZmlnc0tleSA9ICd1aS1yb3V0ZXIuc3RhdGVDb25maWdzJztcbmNvbnN0IGNoaWxkQ29uZmlnc0tleSA9ICd1aS1yb3V0ZXIuc3RhdGVDaGlsZENvbmZpZ3MnO1xuY29uc3QgYW5ub3RhdGVkUmVzb2x2ZXNLZXkgPSAndWktcm91dGVyLmFubm90YXRlZFJlc29sdmVzJztcbmNvbnN0IHJlc29sdmVkTWFwS2V5ID0gJ3VpLXJvdXRlci5yZXNvbHZlZE1hcCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbXBvbmVudFN0YXRlIGV4dGVuZHMgSVN0YXRlIHtcbiAgICBjb21wb25lbnQ6IGFueTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHN0YXRlQ29uZmlncyBhbiBhcnJheSBvZiBzdGF0ZSBjb25maWcgb2JqZWN0c1xuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBc3N1bWUgd2UgYWxzbyBoYWQgdHdvIG90aGVyIGNvbXBvbmVudHM6IEluYm94IGFuZCBDb21wb3NlXG4gKlxuICogQENvbXBvbmVudCh7IHNlbGVjdG9yOiAnYXBwJywgdGVtcGxhdGU6ICc8dWktdmlldz48L3VpLXZpZXc+JyB9KVxuICogQFN0YXRlQ29uZmlnKFtcbiAqICAgeyBuYW1lOiAnaW5ib3gnLCB1cmw6ICcvJywgY29tcG9uZW50OiBJbmJveCwgcmVzb2x2ZTogLi4uIH0sXG4gKiAgIHsgbmFtZTogJ2NvbXBvc2UnLCB1cmw6ICcvY29tcG9zZScsIGNvbXBvbmVudDogQ29tcG9zZSB9XG4gKiBdKVxuICogY2xhc3MgQXBwIHt9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTdGF0ZUNvbmZpZyhzdGF0ZUNvbmZpZ3M6IElDb21wb25lbnRTdGF0ZVtdKXtcbiAgICByZXR1cm4gZnVuY3Rpb24odDogYW55KXtcbiAgICAgICAgLy8gQWRkIGFsbCByb3V0ZWQgY29tcG9uZW50cyBhcyBwcm92aWRlcnMgdG8gdGhpcyBwYXJlbnQgY29tcG9uZW50IHNvIHRoZXkgYXJlIGluY2x1ZGVkIGluIHRoZSBidW5kbGVcbiAgICAgICAgUHJvdmlkZXJzKC4uLnN0YXRlQ29uZmlncy5tYXAoc2MgPT4gc2MuY29tcG9uZW50KSkodCwgYHdoaWxlIGFuYWx5emluZyBTdGF0ZUNvbmZpZyAnJHt0Lm5hbWV9JyBzdGF0ZSBjb21wb25lbnRzYCk7XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIHN0YXRlIGNvbmZpZ3MgaW4gdGhlIHBhcmVudCBjb21wb25lbnQncyBtZXRhZGF0YS4uLlxuICAgICAgICBjb21wb25lbnRTdG9yZS5zZXQoY2hpbGRDb25maWdzS2V5LCBzdGF0ZUNvbmZpZ3MsIHQpO1xuXG4gICAgICAgIC8vIC4uLkJ1dCBhbHNvIHN0b3JlIGVhY2ggY2hpbGQncyBvd24gY29uZmlnIGluIHRoYXQgY2hpbGQgY29tcG9uZW50J3MgbWV0YWRhdGFcbiAgICAgICAgLy8gY3VycmVudGx5IG5vdCB1c2VkLCBidXQgbWlnaHQgYmUgdXNlZnVsIGluIHRoZSBmdXR1cmUuXG4gICAgICAgIHN0YXRlQ29uZmlncy5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5jb21wb25lbnQpIHJldHVybjtcbiAgICAgICAgICAgIGxldCBleGlzdGluZ0NvbmZpZ3MgPSBjb21wb25lbnRTdG9yZS5nZXQoY29uZmlnc0tleSwgY29uZmlnLmNvbXBvbmVudCkgfHwgW107XG4gICAgICAgICAgICBjb21wb25lbnRTdG9yZS5zZXQoY29uZmlnc0tleSwgWy4uLmV4aXN0aW5nQ29uZmlncywgY29uZmlnXSwgY29uZmlnLmNvbXBvbmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gdGFyZ2V0SXNTdGF0aWNGbih0KSB7XG4gICAgcmV0dXJuIHQubmFtZSAhPT0gdW5kZWZpbmVkICYmIHQuY29uc3RydWN0b3IubmFtZSA9PT0gJ0Z1bmN0aW9uJztcbn1cblxuXG4vKipcbiAqXG4gKiBAcGFyYW0gcmVzb2x2ZU5hbWUgaWYgeW91J2QgbGlrZSB0byByZW5hbWUgdGhlIHJlc29sdmUsIG90aGVyd2lzZSBpdCB3aWxsIHVzZSB0aGUgbmFtZSBvZiB0aGUgc3RhdGljIG1ldGhvZFxuICogQGV4YW1wbGVcbiAqXG4gKiBAQ29tcG9uZW50KHsgc2VsZWN0b3I6ICdpbmJveCcsIHRlbXBsYXRlOiAnLi4uJyB9KVxuICogLy8gRG9uJ3QgZm9yZ2V0IHRvIGFsc28gaW5qZWN0IHlvdXIgcmVzb2x2ZSBpbnRvIHlvdXIgY29uc3RydWN0b3Igd2l0aCBhbm90aGVyIEBJbmplY3QgdXAgaGVyZSwgdXNlIGEgc3RyaW5nIGZvciByZXNvbHZlcy5cbiAqIEBJbmplY3QoJ21lc3NhZ2VzJylcbiAqIGNsYXNzIEluYm94IHtcbiAqXG4gKiAgIC8vIFRoZSByZXNvbHZlIGZ1bmN0aW9uIG11c3QgYmUgc3RhdGljLiBZb3UgY2FuIG9wdGlvbmFsbHkgaW5qZWN0IHdpdGggQEluamVjdFxuICogICBAUmVzb2x2ZSgpXG4gKiAgIEBJbmplY3QoJyRodHRwJylcbiAqICAgc3RhdGljIG1lc3NhZ2VzKCRodHRwKSB7XG4gKiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9hcGkvbWVzc2FnZXMpO1xuICogICB9XG4gKlxuICogICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVzc2FnZXMpIHsgfVxuICogfVxuICpcbiAqIEBDb21wb25lbnQoeyBzZWxlY3RvcjogJ2FwcCcsIHRlbXBsYXRlOiAnPHVpLXZpZXc+PC91aS12aWV3PicgfSlcbiAqIEBTdGF0ZUNvbmZpZyhbXG4gKiAgIHsgbmFtZTogJ2luYm94JywgdXJsOiAnLycsIGNvbXBvbmVudDogSW5ib3guIH1cbiAqIF0pXG4gKiBjbGFzcyBBcHAge31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFJlc29sdmUocmVzb2x2ZU5hbWU6IHN0cmluZyA9IG51bGwpe1xuICAgIHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgcmVzb2x2ZUZuTmFtZTogc3RyaW5nLCB7dmFsdWU6IHJlc29sdmVGbn0pe1xuICAgICAgICBpZiAoIXRhcmdldElzU3RhdGljRm4odGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdAUmVzb2x2ZSB0YXJnZXQgbXVzdCBiZSBhIHN0YXRpYyBtZXRob2QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnRTdG9yZS5tZXJnZShhbm5vdGF0ZWRSZXNvbHZlc0tleSwge1tyZXNvbHZlTmFtZSB8fCByZXNvbHZlRm5OYW1lXTogcmVzb2x2ZUZufSwgdGFyZ2V0KTtcbiAgICB9XG59XG5cbmNvbXBvbmVudEhvb2tzLmV4dGVuZERETygoZGRvOiBhbnkpID0+IHtcbiAgICBpZiAoZGRvLnRlbXBsYXRlICYmIGRkby50ZW1wbGF0ZS5yZXBsYWNlKSB7XG4gICAgICAgIC8vIEp1c3QgYSBsaXR0bGUgc3VnYXIuLi4gc28gZm9sa3MgY2FuIHdyaXRlICduZy1vdXRsZXQnIGlmIHRoZXkgd2FudFxuICAgICAgICBkZG8udGVtcGxhdGUgPSBkZG8udGVtcGxhdGUucmVwbGFjZSgvbmctb3V0bGV0L2csICd1aS12aWV3Jyk7XG4gICAgfVxufSk7XG5cbmNvbXBvbmVudEhvb2tzLmFmdGVyKCh0YXJnZXQ6IGFueSwgbmFtZTogc3RyaW5nLCBpbmplY3RzOiBzdHJpbmdbXSwgbmdNb2R1bGU6IG5nLklNb2R1bGUpID0+IHtcbiAgICBjb25zdCBjaGlsZFN0YXRlQ29uZmlnczogSUNvbXBvbmVudFN0YXRlW10gPSBjb21wb25lbnRTdG9yZS5nZXQoY2hpbGRDb25maWdzS2V5LCB0YXJnZXQpO1xuXG4gICAgaWYgKGNoaWxkU3RhdGVDb25maWdzKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjaGlsZFN0YXRlQ29uZmlncykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoY3JlYXRlQ29uZmlnRXJyb3JNZXNzYWdlKHRhcmdldCwgbmdNb2R1bGUsICdAU3RhdGVDb25maWcgcGFyYW0gbXVzdCBiZSBhbiBhcnJheSBvZiBzdGF0ZSBvYmplY3RzLicpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5nTW9kdWxlLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXI6IElTdGF0ZVByb3ZpZGVyKSB7XG4gICAgICAgICAgICBpZiAoISRzdGF0ZVByb3ZpZGVyKSByZXR1cm47XG5cbiAgICAgICAgICAgIGNoaWxkU3RhdGVDb25maWdzLmZvckVhY2goKGNvbmZpZzogSUNvbXBvbmVudFN0YXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gR3JhYiB0YWcgbmFtZSBmcm9tIGNvbXBvbmVudCwgdXNlIGl0IHRvIGJ1aWxkIGEgbWluaW1hbCBzdGF0ZSB0ZW1wbGF0ZVxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSBidW5kbGVTdG9yZS5nZXQoJ3NlbGVjdG9yJywgY29uZmlnLmNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgY29uZmlnLnRlbXBsYXRlID0gY29uZmlnLnRlbXBsYXRlIHx8IGA8JHt0YWdOYW1lfT48LyR7dGFnTmFtZX0+YDtcblxuICAgICAgICAgICAgICAgIC8vIFlvdSBjYW4gYWRkIHJlc29sdmVzIGluIHR3byB3YXlzOiBhICdyZXNvbHZlJyBwcm9wZXJ0eSBvbiB0aGUgU3RhdGVDb25maWcsIG9yIHZpYVxuICAgICAgICAgICAgICAgIC8vIHRoZSBAUmVzb2x2ZSBkZWNvcmF0b3IuIFRoZXNlIGxpbmVzIGhhbmRsZSBtZXJnaW5nIG9mIHRoZSB0d28gKEBSZXNvbHZlIHRha2VzIHByZWNlZGVuY2UpXG4gICAgICAgICAgICAgICAgLy8gQWxzbyBpZiBhIHJlc29sdmUgZnVuY3Rpb24gbmVlZHMgdG8gYmUgaW5qZWN0ZWQgd2l0aCBASW5qZWN0IHdlIG1ha2Ugc3VyZSB0byBhZGQgJGluamVjdFxuICAgICAgICAgICAgICAgIC8vIHRvIHRoYXQgZnVuY3Rpb24gc28gaXQgd29ya3MuXG4gICAgICAgICAgICAgICAgY29uc3QgYW5ub3RhdGVkUmVzb2x2ZXMgPSBjb21wb25lbnRTdG9yZS5nZXQoYW5ub3RhdGVkUmVzb2x2ZXNLZXksIGNvbmZpZy5jb21wb25lbnQpIHx8IHt9O1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGFubm90YXRlZFJlc29sdmVzKS5mb3JFYWNoKHJlc29sdmVOYW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZUZuID0gYW5ub3RhdGVkUmVzb2x2ZXNbcmVzb2x2ZU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmbkluamVjdHMgPSBidW5kbGVTdG9yZS5nZXQoJyRpbmplY3QnLCByZXNvbHZlRm4pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlRm4uJGluamVjdCA9IGZuSW5qZWN0cztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25maWcucmVzb2x2ZSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZy5yZXNvbHZlLCBhbm5vdGF0ZWRSZXNvbHZlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBOb3cgZ3JhYiBhbGwgdGhlIEBJbmplY3QtZWRzIG9uIHRoZSBzdGF0ZSBjb21wb25lbnQsIG1hcCB0aG9zZSBpbmplY3RhYmxlcyB0b1xuICAgICAgICAgICAgICAgIC8vIHRoZWlyIGluamVjdGFibGUgbmFtZXMgKGluIGNhc2UgdGhleSBhcmVuJ3Qgc3RyaW5ncykuIENvbnN0cnVjdCBhIHN0YXRlIGNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAvLyB0aGF0IGFza3MgZm9yIHRob3NlIGluamVjdGVkIGl0ZW1zLiBJZiBhbnkgb2YgdGhlbSBhcmUgcmVzb2x2ZXMgdGhhdCB3aWxsIGdpdmUgdXNcbiAgICAgICAgICAgICAgICAvLyB0aGUgZnVsbHkgcmVzb2x2ZWQgdmFsdWVzIG9mIHRob3NlIHJlc29sdmVzLiBXZSBjcmVhdGUgYSBtYXAgb2YgdGhlIHJlc29sdmVkIHZhbHVlc1xuICAgICAgICAgICAgICAgIC8vIGFuZCB3cml0ZSB0aGUgbWFwIGFzIG1ldGFkYXRhIG9uIHRoZSBzdGF0ZSBjb21wb25lbnQuIFRoZSBtYXAgaXMgdGhlbiB1c2VkIGJlbG93IGluXG4gICAgICAgICAgICAgICAgLy8gdGhlIGJlZm9yZUN0cmxJbnZva2UgaG9vayB0byBhZGQgdGhlIHJlc29sdmVkIHZhbHVlcyBhcyBsb2NhbHMgdG8gb3VyIGNvbXBvbmVudCdzXG4gICAgICAgICAgICAgICAgLy8gY29uc3RydWN0b3IuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRJbmplY3RzID0gYnVuZGxlU3RvcmUuZ2V0KCckaW5qZWN0JywgY29uZmlnLmNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5qZWN0cyA9IGNoaWxkSW5qZWN0cyA/IGNoaWxkSW5qZWN0cy5tYXAoZ2V0SW5qZWN0YWJsZU5hbWUpIDogW107XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc3RhdGVDb250cm9sbGVyKC4uLnJlc29sdmVzKTogYW55IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRNYXAgPSByZXNvbHZlcy5yZWR1Y2UoKG9iaiwgdmFsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbaW5qZWN0c1tpXV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFN0b3JlLnNldChyZXNvbHZlZE1hcEtleSwgcmVzb2x2ZWRNYXAsIGNvbmZpZy5jb21wb25lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWcuY29udHJvbGxlciA9IGNvbmZpZy5jb250cm9sbGVyIHx8IFsuLi5pbmplY3RzLCBzdGF0ZUNvbnRyb2xsZXJdO1xuXG4gICAgICAgICAgICAgICAgLy8gTm93IGFjdHVhbGx5IGFkZCB0aGUgc3RhdGUgdG8gJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShjb25maWcubmFtZSwgY29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XSk7XG4gICAgfVxufSk7XG5cbmNvbXBvbmVudEhvb2tzLmJlZm9yZUN0cmxJbnZva2UoKGNhbGxlcjogYW55LCBpbmplY3RzOiBzdHJpbmdbXSwgY29udHJvbGxlcjogYW55LCBkZG86IGFueSwgJGluamVjdG9yOiBhbnksIGxvY2FsczogYW55KSA9PiB7XG4gICAgLy8gSGVyZSB3ZSBqdXN0IGdyYWIgdGhlIGFscmVhZHkgcmVzb2x2ZWQgdmFsdWVzIGFuZCBhZGQgdGhlbSBhcyBsb2NhbHMgYmVmb3JlIHRoZSBjb21wb25lbnQnc1xuICAgIC8vIGNvbnRyb2xsZXIgaXMgaW52b2tlZFxuICAgIGNvbnN0IHJlc29sdmVzTWFwID0gY29tcG9uZW50U3RvcmUuZ2V0KHJlc29sdmVkTWFwS2V5LCBjb250cm9sbGVyKTtcbiAgICBPYmplY3QuYXNzaWduKGxvY2FscywgcmVzb2x2ZXNNYXApO1xufSk7XG5cblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9