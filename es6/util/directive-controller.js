import inputsBuilder from '../properties/inputs-builder';
import outputsBuilder from '../properties/outputs-builder';
import { componentHooks } from '../decorators/component';
export default function (caller, injects, controller, ddo, $injector, locals) {
    let instance = Object.create(controller.prototype);
    componentHooks._beforeCtrlInvoke.forEach(hook => hook(caller, injects, controller, ddo, $injector, locals));
    $injector.invoke([...injects, controller], instance, locals);
    componentHooks._afterCtrlInvoke.forEach(hook => hook(caller, injects, controller, ddo, $injector, locals));
    for (let key in ddo.inputMap) {
        inputsBuilder(instance, key, ddo.inputMap[key]);
    }
    Object.assign(instance, caller);
    let { $element, $scope } = locals;
    outputsBuilder(instance, $element, $scope, ddo.outputMap || {});
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlsL2RpcmVjdGl2ZS1jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJPQVNPLGFBQWEsTUFBTSw4QkFBOEI7T0FFakQsY0FBYyxNQUFNLCtCQUErQjtPQUNuRCxFQUFDLGNBQWMsRUFBQyxNQUFNLHlCQUF5QjtBQUt0RCx5QkFBd0IsTUFBVyxFQUFFLE9BQWlCLEVBQUUsVUFBZSxFQUFFLEdBQVEsRUFBRSxTQUFjLEVBQUUsTUFBVztJQUU1RyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVuRCxjQUFjLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBSTVHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFN0QsY0FBYyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUkzRyxHQUFHLENBQUEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzVCLGFBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBSUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFJaEMsSUFBSSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsR0FBNkMsTUFBTSxDQUFDO0lBQzFFLGNBQWMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRWhFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sUUFBUSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxRQUFRLENBQUMsZUFBZSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFHRCxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJmaWxlIjoibGliL3V0aWwvZGlyZWN0aXZlLWNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgT2JqZWN0ICovXG4vLyAjIERpcmVjdGl2ZSBDb250cm9sbGVyIEZhY3Rvcnlcbi8vIFdoaWxlIHdlIHdhbnQgdG8gdXNlIHRoZSBjb21wb25lbnQgY29udHJvbGxlciwgd2UgbmVlZCBhIHdheSB0byBhZGQgb3VyIG93blxuLy8gcHJvcGVydGllcyB0byB0aGUgY29udHJvbGxlciBpbnN0YW5jZSBiZWZvcmUgdGhlIGNvbnN0cnVjdG9yIGlzIGNhbGxlZC4gV2UgYWxzb1xuLy8gd2FudCB0byBkbyB0aGlzIGluIHRoZSBjb250ZXh0IG9mIEFuZ3VsYXIncyBESSBzbyB0aGF0IHdlIGNhbiBhY2Nlc3MgdGhlICRlbGVtZW50XG4vLyBmb3IgZXZlbnRzIGFuZCAkZmlsdGVyIGZvciBwcm9wZXJ0aWVzLlxuLy9cbi8vICMjIFNldHVwXG4vLyBXZSdsbCBuZWVkIGExYXRzY3JpcHQncyBpbnB1dHNCdWlsZGVyIGZvciBnZW5lcmF0aW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uc1xuaW1wb3J0IGlucHV0c0J1aWxkZXIgZnJvbSAnLi4vcHJvcGVydGllcy9pbnB1dHMtYnVpbGRlcic7XG4vLyBBbHNvIG5lZWQgdGhlIG91dHB1dHNCdWlsZGVyIGZvciBjcmVhdGluZyBldmVudCBlbWl0dGVyc1xuaW1wb3J0IG91dHB1dHNCdWlsZGVyIGZyb20gJy4uL3Byb3BlcnRpZXMvb3V0cHV0cy1idWlsZGVyJztcbmltcG9ydCB7Y29tcG9uZW50SG9va3N9IGZyb20gJy4uL2RlY29yYXRvcnMvY29tcG9uZW50JztcblxuLy8gIyMgRmFjdG9yeVxuLy8gTmVlZHMgdGhlIGluamVjdGlvbiBhcnJheSwgdGhlIGNvbnRyb2xsZXIgY2xhc3MsIGFuZCB0aGUgZGlyZWN0aXZlIGRlZmluaXRpb25cbi8vIG9iamVjdCBpbiBvcmRlciB0byBnZW5lcmF0ZSB0aGUgY29udHJvbGxlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGVyOiBhbnksIGluamVjdHM6IHN0cmluZ1tdLCBjb250cm9sbGVyOiBhbnksIGRkbzogYW55LCAkaW5qZWN0b3I6IGFueSwgbG9jYWxzOiBhbnkpOiBhbnl7XG4gIC8vIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgY29udHJvbGxlciB3aXRob3V0IGNhbGxpbmcgaXRzIGNvbnN0cnVjdG9yXG4gIGxldCBpbnN0YW5jZSA9IE9iamVjdC5jcmVhdGUoY29udHJvbGxlci5wcm90b3R5cGUpO1xuXG4gIGNvbXBvbmVudEhvb2tzLl9iZWZvcmVDdHJsSW52b2tlLmZvckVhY2goaG9vayA9PiBob29rKGNhbGxlciwgaW5qZWN0cywgY29udHJvbGxlciwgZGRvLCAkaW5qZWN0b3IsIGxvY2FscykpO1xuXG4gIC8vIEZpbmFsbHksIGludm9rZSB0aGUgY29uc3RydWN0b3IgdXNpbmcgdGhlIGluamVjdGlvbiBhcnJheSBhbmQgdGhlIGNhcHR1cmVkXG4gIC8vIGxvY2Fsc1xuICAkaW5qZWN0b3IuaW52b2tlKFsuLi5pbmplY3RzLCBjb250cm9sbGVyXSwgaW5zdGFuY2UsIGxvY2Fscyk7XG5cbiAgY29tcG9uZW50SG9va3MuX2FmdGVyQ3RybEludm9rZS5mb3JFYWNoKGhvb2sgPT4gaG9vayhjYWxsZXIsIGluamVjdHMsIGNvbnRyb2xsZXIsIGRkbywgJGluamVjdG9yLCBsb2NhbHMpKTtcblxuICAvLyBVc2UgYTFhdHNjcmlwdCdzIGlucHV0c0J1aWxkZXIgdG8gYWRkIHRoZSBnZXR0ZXJzL3NldHRlcnMgdGhlbiBzdWdhclxuICAvLyBvdmVyIGA9YCBhbmQgYEBgIGJpbmRpbmdzXG4gIGZvcihsZXQga2V5IGluIGRkby5pbnB1dE1hcCkge1xuICAgIGlucHV0c0J1aWxkZXIoaW5zdGFuY2UsIGtleSwgZGRvLmlucHV0TWFwW2tleV0pO1xuICB9XG4gIC8vIFJlbWVtYmVyLCBhbmd1bGFyIGhhcyBhbHJlYWR5IHNldCB0aG9zZSBiaW5kaW5ncyBvbiB0aGUgYGNhbGxlcmBcbiAgLy8gYXJndW1lbnQuIE5vdyB3ZSBuZWVkIHRvIGV4dGVuZCB0aGVtIG9udG8gb3VyIGBpbnN0YW5jZWAuIEl0IGlzIGltcG9ydGFudFxuICAvLyB0byBleHRlbmQgYWZ0ZXIgZGVmaW5pbmcgdGhlIHByb3BlcnRpZXMuIFRoYXQgd2F5IHdlIGZpcmUgdGhlIHNldHRlcnMuXG4gIE9iamVjdC5hc3NpZ24oaW5zdGFuY2UsIGNhbGxlcik7XG5cbiAgLy8gT3V0cHV0cyB3b3JrIHNpbWlsYXJseSwgYnV0IHRoZXkgbmVlZCB0aGUgcmF3ICRlbGVtZW50IGFuZCB0aGUgJHNjb3BlIGZvclxuICAvLyBkZXN0cm95aW5nIG91dHB1dCBvYnNlcnZhYmxlcy5cbiAgbGV0IHskZWxlbWVudCwgJHNjb3BlfSA6IHsgJGVsZW1lbnQ6IEpRdWVyeSwgJHNjb3BlOiBuZy5JU2NvcGUgfSA9IGxvY2FscztcbiAgb3V0cHV0c0J1aWxkZXIoaW5zdGFuY2UsICRlbGVtZW50LCAkc2NvcGUsIGRkby5vdXRwdXRNYXAgfHwge30pO1xuXG4gIGlmICh0eXBlb2YgaW5zdGFuY2UubmdPbkluaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpbnN0YW5jZS5uZ09uSW5pdCgpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpbnN0YW5jZS5uZ09uRGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgaW5zdGFuY2UubmdPbkRlc3Ryb3kuYmluZChpbnN0YW5jZSkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpbnN0YW5jZS5uZ0FmdGVyVmlld0luaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkZG8ubmdBZnRlclZpZXdJbml0Qm91bmQgPSBpbnN0YW5jZS5uZ0FmdGVyVmlld0luaXQuYmluZChpbnN0YW5jZSk7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIGNvbnRyb2xsZXIgaW5zdGFuY2VcbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9