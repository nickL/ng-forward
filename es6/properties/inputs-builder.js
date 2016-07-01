const BIND_STRING = '_bind_string_';
const BIND_ONEWAY = '_bind_oneway_';
const BIND_TWOWAY = '_bind_twoway_';
function isDefined(value) { return typeof value !== 'undefined'; }
export function inputsMap(inputs) {
    let definition = {};
    for (let key in inputs) {
        let lowercaseInput = inputs[key];
        definition[`@${key}`] = `@${lowercaseInput}`;
        definition[`[${inputs[key]}]`] = `=?`;
        definition[`[(${inputs[key]})]`] = `=?`;
    }
    return definition;
}
export default function inputsBuilder(controller, localKey, publicKey) {
    // We are going to be installing a lot of properties on the controller to handle the magic
    // of our input bindings. Here we are marking them as hidden but writeable, that way
    // we don't leak our abstraction
    let stringKey = `@${localKey}`;
    let oneWayKey = `[${publicKey}]`;
    let twoWayKey = `[(${publicKey})]`;
    let __stringKey = Symbol();
    let __oneWayKey = Symbol();
    let __twoWayKey = Symbol();
    let __using_binding = Symbol();
    Object.defineProperties(controller, {
        [stringKey]: {
            enumerable: false, configurable: false,
            set: createHiddenPropSetter(BIND_STRING, __stringKey),
            get() { return this[__stringKey]; }
        },
        [oneWayKey]: {
            enumerable: false, configurable: false,
            set: createHiddenPropSetter(BIND_ONEWAY, __oneWayKey),
            get() { return this[__oneWayKey]; }
        },
        [twoWayKey]: {
            enumerable: false, configurable: false,
            set: createHiddenPropSetter(BIND_TWOWAY, __twoWayKey),
            get() { return this[localKey]; }
        },
        [__using_binding]: {
            enumerable: false, configurable: false, writable: true,
            value: controller.__using_binding || {}
        }
    });
    function createHiddenPropSetter(BIND_TYPE, __privateKey) {
        return function (val) {
            this[__privateKey] = val;
            if (isDefined(val)) {
                setBindingUsed(BIND_TYPE, localKey);
            }
            if (controller[__using_binding][localKey] === BIND_TYPE) {
                this[localKey] = val;
            }
        };
    }
    function setBindingUsed(using, key) {
        if (controller[__using_binding][key] && controller[__using_binding][key] !== using) {
            throw new Error(`Can not use more than one type of attribute binding simultaneously: ${key}, [${key}], [(${key})]. Choose one.`);
        }
        controller[__using_binding][key] = using;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0aWVzL2lucHV0cy1idWlsZGVyLnRzIl0sIm5hbWVzIjpbImlzRGVmaW5lZCIsImlucHV0c01hcCIsImlucHV0c0J1aWxkZXIiLCJpbnB1dHNCdWlsZGVyLmdldCIsImlucHV0c0J1aWxkZXIuY3JlYXRlSGlkZGVuUHJvcFNldHRlciIsImlucHV0c0J1aWxkZXIuc2V0QmluZGluZ1VzZWQiXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQztBQUNwQyxNQUFNLFdBQVcsR0FBRyxlQUFlLENBQUM7QUFDcEMsTUFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDO0FBRXBDLG1CQUFtQixLQUFLLElBQUdBLE1BQU1BLENBQUNBLE9BQU9BLEtBQUtBLEtBQUtBLFdBQVdBLENBQUNBLENBQUFBLENBQUNBO0FBR2hFLDBCQUEwQixNQUFNO0lBQzlCQyxJQUFJQSxVQUFVQSxHQUFHQSxFQUFFQSxDQUFDQTtJQUVwQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDdkJBLElBQUlBLGNBQWNBLEdBQUdBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2pDQSxVQUFVQSxDQUFDQSxJQUFJQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxjQUFjQSxFQUFFQSxDQUFDQTtRQUM3Q0EsVUFBVUEsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFDdENBLFVBQVVBLENBQUNBLEtBQUtBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBO0lBQzFDQSxDQUFDQTtJQUVEQSxNQUFNQSxDQUFDQSxVQUFVQSxDQUFDQTtBQUNwQkEsQ0FBQ0E7QUFFRCxzQ0FBc0MsVUFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTO0lBQ25FQywwRkFB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Q0EsdUVBQXVFQSxHQUFHQSxNQUFNQSxHQUFHQSxRQUFRQSxHQUFHQSxpQkFBaUJBLENBQUNBLENBQUNBO1FBQ25JQSxDQUFDQTtRQUNEQSxVQUFVQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtJQUMzQ0EsQ0FBQ0E7QUFDSEgsQ0FBQ0EiLCJmaWxlIjoibGliL3Byb3BlcnRpZXMvaW5wdXRzLWJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGlzIGFuIGltcGxlbWVudGF0aW9uIHRoYXQgYmxlbmRzIGEgYml0IG9mIEBoYW5uYWhob3dhcmQncyBhMWF0c2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIGN1c3RvbVxuLy8gaW5wdXRzIGFuZCBAbWl0cmFuaW0ncyBuZy1kZWNvcmF0ZSBvbmUgd2F5IGJpbmRpbmcgdGVjaG5pcXVlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vaGFubmFoaG93YXJkL2ExYXRzY3JpcHQvYmxvYi9tYXN0ZXIvc3JjL2ExYXRzY3JpcHQvbmcyRGlyZWN0aXZlcy9Qcm9wZXJ0aWVzQnVpbGRlci5qc1xuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vTWl0cmFuaW0vbmctZGVjb3JhdGUvYmxvYi9tYXN0ZXIvc3JjL2JpbmRpbmdzLnRzI0wxNjVcbmNvbnN0IEJJTkRfU1RSSU5HID0gJ19iaW5kX3N0cmluZ18nO1xuY29uc3QgQklORF9PTkVXQVkgPSAnX2JpbmRfb25ld2F5Xyc7XG5jb25zdCBCSU5EX1RXT1dBWSA9ICdfYmluZF90d293YXlfJztcblxuZnVuY3Rpb24gaXNEZWZpbmVkKHZhbHVlKSB7cmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCc7fVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIHJlc3BvbnNpYmxlIGZvciB0cmFuc2Zvcm1pbmcgdGhlIGlucHV0cyBmcm9tIEBDb21wb25lbnQgdG8gbmcxIERETyBiaW5kaW5ncy5cbmV4cG9ydCBmdW5jdGlvbiBpbnB1dHNNYXAoaW5wdXRzKXtcbiAgbGV0IGRlZmluaXRpb24gPSB7fTtcblxuICBmb3IgKGxldCBrZXkgaW4gaW5wdXRzKSB7XG4gICAgbGV0IGxvd2VyY2FzZUlucHV0ID0gaW5wdXRzW2tleV07XG4gICAgZGVmaW5pdGlvbltgQCR7a2V5fWBdID0gYEAke2xvd2VyY2FzZUlucHV0fWA7XG4gICAgZGVmaW5pdGlvbltgWyR7aW5wdXRzW2tleV19XWBdID0gYD0/YDtcbiAgICBkZWZpbml0aW9uW2BbKCR7aW5wdXRzW2tleV19KV1gXSA9IGA9P2A7XG4gIH1cblxuICByZXR1cm4gZGVmaW5pdGlvbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5wdXRzQnVpbGRlcihjb250cm9sbGVyLCBsb2NhbEtleSwgcHVibGljS2V5KXtcbiAgLy8gV2UgYXJlIGdvaW5nIHRvIGJlIGluc3RhbGxpbmcgYSBsb3Qgb2YgcHJvcGVydGllcyBvbiB0aGUgY29udHJvbGxlciB0byBoYW5kbGUgdGhlIG1hZ2ljXG4gIC8vIG9mIG91ciBpbnB1dCBiaW5kaW5ncy4gSGVyZSB3ZSBhcmUgbWFya2luZyB0aGVtIGFzIGhpZGRlbiBidXQgd3JpdGVhYmxlLCB0aGF0IHdheVxuICAvLyB3ZSBkb24ndCBsZWFrIG91ciBhYnN0cmFjdGlvblxuXG4gIGxldCBzdHJpbmdLZXkgPSBgQCR7bG9jYWxLZXl9YDtcbiAgbGV0IG9uZVdheUtleSA9IGBbJHtwdWJsaWNLZXl9XWA7XG4gIGxldCB0d29XYXlLZXkgPSBgWygke3B1YmxpY0tleX0pXWA7XG4gIGxldCBfX3N0cmluZ0tleSA9IFN5bWJvbCgpO1xuICBsZXQgX19vbmVXYXlLZXkgPSBTeW1ib2woKTtcbiAgbGV0IF9fdHdvV2F5S2V5ID0gU3ltYm9sKCk7XG4gIGxldCBfX3VzaW5nX2JpbmRpbmcgPSBTeW1ib2woKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb250cm9sbGVyLCB7XG5cbiAgICBbc3RyaW5nS2V5XToge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBzZXQ6IGNyZWF0ZUhpZGRlblByb3BTZXR0ZXIoQklORF9TVFJJTkcsIF9fc3RyaW5nS2V5KSxcbiAgICAgIGdldCgpIHsgcmV0dXJuIHRoaXNbX19zdHJpbmdLZXldOyB9XG4gICAgfSxcblxuICAgIFtvbmVXYXlLZXldOiB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSwgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHNldDogY3JlYXRlSGlkZGVuUHJvcFNldHRlcihCSU5EX09ORVdBWSwgX19vbmVXYXlLZXkpLFxuICAgICAgZ2V0KCkgeyByZXR1cm4gdGhpc1tfX29uZVdheUtleV07IH1cbiAgICB9LFxuXG4gICAgW3R3b1dheUtleV06IHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgc2V0OiBjcmVhdGVIaWRkZW5Qcm9wU2V0dGVyKEJJTkRfVFdPV0FZLCBfX3R3b1dheUtleSksXG4gICAgICBnZXQoKSB7IHJldHVybiB0aGlzW2xvY2FsS2V5XTsgfVxuICAgIH0sXG5cbiAgICBbX191c2luZ19iaW5kaW5nXToge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsIGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGNvbnRyb2xsZXIuX191c2luZ19iaW5kaW5nIHx8IHt9XG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBjcmVhdGVIaWRkZW5Qcm9wU2V0dGVyKEJJTkRfVFlQRSwgX19wcml2YXRlS2V5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgdGhpc1tfX3ByaXZhdGVLZXldID0gdmFsO1xuXG4gICAgICBpZiAoaXNEZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgc2V0QmluZGluZ1VzZWQoQklORF9UWVBFLCBsb2NhbEtleSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb250cm9sbGVyW19fdXNpbmdfYmluZGluZ11bbG9jYWxLZXldID09PSBCSU5EX1RZUEUpIHtcbiAgICAgICAgdGhpc1tsb2NhbEtleV0gPSB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0QmluZGluZ1VzZWQodXNpbmcsIGtleSkge1xuICAgIGlmIChjb250cm9sbGVyW19fdXNpbmdfYmluZGluZ11ba2V5XSAmJiBjb250cm9sbGVyW19fdXNpbmdfYmluZGluZ11ba2V5XSAhPT0gdXNpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCB1c2UgbW9yZSB0aGFuIG9uZSB0eXBlIG9mIGF0dHJpYnV0ZSBiaW5kaW5nIHNpbXVsdGFuZW91c2x5OiAke2tleX0sIFske2tleX1dLCBbKCR7a2V5fSldLiBDaG9vc2Ugb25lLmApO1xuICAgIH1cbiAgICBjb250cm9sbGVyW19fdXNpbmdfYmluZGluZ11ba2V5XSA9IHVzaW5nO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=