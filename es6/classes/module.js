import { bundleStore, providerStore } from '../writers';
let _parsers = {};
export class DecoratedModule {
    constructor(name, modules = false) {
        this.name = name;
        if (modules) {
            this.moduleList(modules);
            this._module = angular.module(name, this._dependencies);
        }
        else {
            this._module = angular.module(name);
        }
    }
    add(...providers) {
        // We used a rest parameter so that you can add multiple providers at once.
        // So we must iterate over our array of providers.
        const providersInferred = providers.filter(p => !p.isProvider);
        const providersProper = providers.filter(p => p.isProvider);
        const handleProvider = provider => {
            if (!providerStore.has('type', provider)) {
                throw new Error(`Cannot read provider metadata. Are you adding a class that hasn't been decorated yet?`);
            }
            let type = providerStore.get('type', provider);
            let name = providerStore.get('name', provider);
            let inject = bundleStore.get('$inject', provider) || [];
            if (_parsers[type]) {
                _parsers[type](provider, name, inject, this._module);
            }
            else {
                throw new Error(`No parser registered for type '${type}'`);
            }
        };
        providersInferred.forEach(handleProvider);
        providersProper.forEach(handleProvider);
        return this;
    }
    publish() {
        return this._module;
    }
    moduleList(modules) {
        this._dependencies = [];
        if (modules && modules.length !== 0) {
            for (let i = 0; i < modules.length; i++) {
                if (typeof modules[i] === 'string') {
                    this._dependencies.push(modules[i]);
                }
                else if (modules[i] && modules[i].name) {
                    this._dependencies.push(modules[i].name);
                }
                else {
                    throw new Error(`Cannot read module: Unknown module in ${this.name}`);
                }
            }
        }
    }
    config(configFunc) {
        this._module.config(configFunc);
        return this;
    }
    run(runFunc) {
        this._module.run(runFunc);
        return this;
    }
    value(name, value) {
        this._module.value(name, value);
        return this;
    }
    constant(name, value) {
        this._module.constant(name, value);
        return this;
    }
}
let Module = function (name, modules) {
    return new DecoratedModule(name, modules);
};
Module.addProvider = function (providerType, parser) {
    _parsers[providerType] = parser;
};
Module.getParser = function (providerType) {
    return _parsers[providerType];
};
export default Module;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jbGFzc2VzL21vZHVsZS50cyJdLCJuYW1lcyI6WyJEZWNvcmF0ZWRNb2R1bGUiLCJEZWNvcmF0ZWRNb2R1bGUuY29uc3RydWN0b3IiLCJEZWNvcmF0ZWRNb2R1bGUuYWRkIiwiRGVjb3JhdGVkTW9kdWxlLnB1Ymxpc2giLCJEZWNvcmF0ZWRNb2R1bGUubW9kdWxlTGlzdCIsIkRlY29yYXRlZE1vZHVsZS5jb25maWciLCJEZWNvcmF0ZWRNb2R1bGUucnVuIiwiRGVjb3JhdGVkTW9kdWxlLnZhbHVlIiwiRGVjb3JhdGVkTW9kdWxlLmNvbnN0YW50Il0sIm1hcHBpbmdzIjoiT0FXTyxFQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUMsTUFBTSxZQUFZO0FBSXJELElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQztBQUl2QjtJQUlDQSxZQUFtQkEsSUFBWUEsRUFBRUEsT0FBT0EsR0FBUUEsS0FBS0E7UUFBbENDLFNBQUlBLEdBQUpBLElBQUlBLENBQVFBO1FBRzlCQSxFQUFFQSxDQUFBQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUNYQSxDQUFDQTtZQUVBQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtZQUV6QkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDekRBLENBQUNBO1FBQ0RBLElBQUlBLENBQ0pBLENBQUNBO1lBRUFBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBQ3JDQSxDQUFDQTtJQUNGQSxDQUFDQTtJQUdERCxHQUFHQSxDQUFDQSxHQUFHQSxTQUFnQkE7UUFDdEJFLDJFQUEyRUE7UUFDM0VBLGtEQUFrREE7UUFFbERBLE1BQU1BLGlCQUFpQkEsR0FBR0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FB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TSxDQUFDLFNBQVMsR0FBRyxVQUFTLFlBQW9CO0lBQy9DLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBSUYsZUFBZSxNQUFNLENBQUMiLCJmaWxlIjoibGliL2NsYXNzZXMvbW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIyBNb2R1bGVcbi8vIEEgdGhpbiB3cmFwcGVyIGFyb3VuZCBgYW5ndWxhci5tb2R1bGVgIGZvciB0cmFuc2Zvcm1pbmcgYW5ub3RhdGVkIGNsYXNzZXMgaW50b1xuLy8gYW5ndWxhciBwcm92aWRlcnNcbi8vXG4vLyAjIyBTZXR1cFxuLy8gVW5sZXNzIHlvdSBhcmUgdXNpbmcgYSBzaGltLCBhbGwgb2ZmaWNpYWwgZGlzdHJpYnV0aW9ucyBvZiBBbmd1bGFyLmpzIGluc3RhbGxcbi8vIGBhbmd1bGFyYCBvbiBgd2luZG93YC4gSXQgaXMgc2FmZSB0byBhc3N1bWUgaXQgd2lsbCBhbHdheXMgYmUgdGhlcmUuXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xuLy8gVGhlIGNvcmUgb2YgdGhlIG1vZHVsZSBzeXN0ZW0gcmVsaWVzIG9uIHNwZWNpYWwgbWV0YWRhdGEgd3JpdGVycy4gVGhleSB3cml0ZVxuLy8gbmFtZXNwYWNlZCBtZXRhZGF0YSB0byBhIGNsYXNzLiBFYWNoIHdyaXRlciBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgc29tZVxuLy8gc3Vic2V0IG9mIHVzZWZ1bCBpbmZvcm1hdGlvblxuaW1wb3J0IHtidW5kbGVTdG9yZSwgcHJvdmlkZXJTdG9yZX0gZnJvbSAnLi4vd3JpdGVycyc7XG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tIFwiLi9wcm92aWRlclwiO1xuXG4vLyBBIHZlcnkgc2ltcGxlIG1hcCBob2xkaW5nIHRoZSBwYXJzZXJzIGZvciBlYWNoIHByb3ZpZGVyLiBNb3JlIG9uIHRoaXMgbGF0ZXIuXG5sZXQgX3BhcnNlcnM6IGFueSA9IHt9O1xuXG4vLyAjIyBEZWNvcmF0ZWRNb2R1bGUgY2xhc3Ncbi8vIERlZmluZSB0aGUgTW9kdWxlIHdyYXBwZXIgY2xhc3MuXG5leHBvcnQgY2xhc3MgRGVjb3JhdGVkTW9kdWxle1xuXHRwcml2YXRlIF9tb2R1bGU6IG5nLklNb2R1bGU7XG5cdHByaXZhdGUgX2RlcGVuZGVuY2llczogYW55W107XG5cdFxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBtb2R1bGVzOiBhbnkgPSBmYWxzZSl7XG5cdFx0Ly8gYGFuZ3VsYXIubW9kdWxlYCB3b3JrcyBlaXRoZXIgYnkgY3JlYXRpbmcgYSBuZXcgbW9kdWxlIHZpYSBhbiBhcnJheVxuXHRcdC8vIG9mIGRlcGVuZGVuY2llcyBvciBieSByZWZlcmVuY2Ugd2l0aG91dCB0aGUgZGVwZW5kZW5jaWVzIGFycmF5XG5cdFx0aWYobW9kdWxlcylcblx0XHR7XG5cdFx0XHQvLyBwYXJzZSB0aGUgbW9kdWxlIGxpc3QgdG8gY3JlYXRlIGFuIGFycmF5IG9mIGp1c3Qgc3RyaW5nc1xuXHRcdFx0dGhpcy5tb2R1bGVMaXN0KG1vZHVsZXMpO1xuXHRcdFx0Ly8gQ3JlYXRlIHRoZSBhbmd1bGFyIG1vZHVsZS5cblx0XHRcdHRoaXMuX21vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIHRoaXMuX2RlcGVuZGVuY2llcyk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvLyBJZiBubyBkZXBlbmRlbmNpZXMgd2VyZSBwYXNzZWQsIGFjY2VzcyB0aGUgbW9kdWxlIGJ5IHJlZmVyZW5jZVxuXHRcdFx0dGhpcy5fbW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmFtZSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gVGhpcyBpcyB3aGVyZSB5b3UgYWRkIGFuIGFubm90YXRlZCBjbGFzcyB0byB0aGUgQW5ndWxhciBtb2R1bGVcblx0YWRkKC4uLnByb3ZpZGVyczogYW55W10pOiBEZWNvcmF0ZWRNb2R1bGUge1xuXHRcdC8vIFdlIHVzZWQgYSByZXN0IHBhcmFtZXRlciBzbyB0aGF0IHlvdSBjYW4gYWRkIG11bHRpcGxlIHByb3ZpZGVycyBhdCBvbmNlLlxuXHRcdC8vIFNvIHdlIG11c3QgaXRlcmF0ZSBvdmVyIG91ciBhcnJheSBvZiBwcm92aWRlcnMuXG5cblx0XHRjb25zdCBwcm92aWRlcnNJbmZlcnJlZCA9IHByb3ZpZGVycy5maWx0ZXIocCA9PiAhcC5pc1Byb3ZpZGVyKTtcblx0XHRjb25zdCBwcm92aWRlcnNQcm9wZXIgPSBwcm92aWRlcnMuZmlsdGVyKHAgPT4gcC5pc1Byb3ZpZGVyKTtcblxuXHRcdGNvbnN0IGhhbmRsZVByb3ZpZGVyID0gcHJvdmlkZXIgPT4ge1xuXHRcdFx0Ly8gVGhlIHByb3ZpZGVyU3RvcmUgY29udGFpbnMgdGhlIHR5cGUgb2YgcHJvdmlkZXIgdGhlIGNsYXNzIHdpbGwgYmUgdHJhbnNmb3JtZWRcblx0XHRcdC8vIGludG8gYXMgd2VsbCBhcyB0aGUgbmFtZSBvZiB0aGUgZXZlbnR1YWwgcHJvdmlkZXIuIElmIHRoaXMgaW5mb3JtYXRpb24gaGFzXG5cdFx0XHQvLyBub3QgYmVlbiBzZXQgb24gdGhlIGNsYXNzLCB0aGVuIHdlIGFyZW4ndCBkZWFsaW5nIHdpdGggYSBkZWNvcmF0ZWQgY2xhc3MuXG5cdFx0XHRpZiggIXByb3ZpZGVyU3RvcmUuaGFzKCd0eXBlJywgcHJvdmlkZXIpICl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHJlYWQgcHJvdmlkZXIgbWV0YWRhdGEuIEFyZSB5b3UgYWRkaW5nIGEgY2xhc3MgdGhhdCBoYXNuJ3QgYmVlbiBkZWNvcmF0ZWQgeWV0P2ApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHcmFiIHRoZSB0eXBlIG9mIHByb3ZpZGVyXG5cdFx0XHRsZXQgdHlwZSA9IHByb3ZpZGVyU3RvcmUuZ2V0KCd0eXBlJywgcHJvdmlkZXIpO1xuXHRcdFx0Ly8gLi4uYW5kIHRoZSBuYW1lIG9mIHRoZSBwcm92aWRlclxuXHRcdFx0bGV0IG5hbWUgPSBwcm92aWRlclN0b3JlLmdldCgnbmFtZScsIHByb3ZpZGVyKTtcblx0XHRcdC8vIFRoaXMgaXMgdGhlIGluamVjdGlvbiBhcnJheSB1c2VkIGJ5IGFuZ3VsYXIncyBgJGluamVjdG9yLmludm9rZWAuIFRoaXMgYXJyYXlcblx0XHRcdC8vIGlzIGp1c3QgYSBsaXN0IG9mIHN0cmluZ3MgdGhhdCB3aWxsIGJlIGluamVjdGVkXG5cdFx0XHRsZXQgaW5qZWN0ID0gYnVuZGxlU3RvcmUuZ2V0KCckaW5qZWN0JywgcHJvdmlkZXIpIHx8IFtdO1xuXG5cdFx0XHQvLyBXZSB1c2UgdGhlIHByb3ZpZGVyIHR5cGUgdG8gZGV0ZXJtaW5lIHdoaWNoIHBhcnNlciB3aWxsIGhhbmRsZSB0aGUgY2xhc3Ncblx0XHRcdGlmKF9wYXJzZXJzW3R5cGVdKXtcblx0XHRcdFx0Ly8gRXhlY3V0ZSB0aGUgcGFyc2VyIHBhc3NpbmcgdGhlIGNsYXNzLCBuYW1lIG9mIHRoZSBwcm92aWRlciwgaW5qZWN0aW9uXG5cdFx0XHRcdC8vIGFycmF5LCBhbmQgdGhlIHJhdyBgYW5ndWxhci5tb2R1bGVgIHdlIGRlZmluZWQgaW4gdGhlIGNvbnN0cnVjdG9yLlxuXHRcdFx0XHRfcGFyc2Vyc1t0eXBlXShwcm92aWRlciwgbmFtZSwgaW5qZWN0LCB0aGlzLl9tb2R1bGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBObyBwYXJzZXIgcmVnaXN0ZXJlZCBmb3IgdHlwZSAnJHt0eXBlfSdgKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cHJvdmlkZXJzSW5mZXJyZWQuZm9yRWFjaChoYW5kbGVQcm92aWRlcik7XG5cdFx0cHJvdmlkZXJzUHJvcGVyLmZvckVhY2goaGFuZGxlUHJvdmlkZXIpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvLyBEZWFkIGNvZGUgZnJvbSBhbmd1bGFyLWRlY29yYXRvcnMgdGhhdCBzaG91bGQgcHJvYmFibHkgYmUgcmVtb3ZlZC4gSnVzdCByZXR1cm5zXG5cdC8vIHRoZSByYXcgYW5ndWxhci5tb2R1bGUuXG5cdHB1Ymxpc2goKTogbmcuSU1vZHVsZXtcblx0XHRyZXR1cm4gdGhpcy5fbW9kdWxlO1xuXHR9XG5cblx0Ly8gUGFyc2VzIHRoZSBhcnJheSBvZiBtb2R1bGVzXG5cdG1vZHVsZUxpc3QobW9kdWxlczogYW55W10pe1xuXHRcdC8vIFNldHVwIHRoZSBkZXBlbmRlbmN5IGFycmF5XG5cdFx0dGhpcy5fZGVwZW5kZW5jaWVzID0gW107XG5cblx0XHRpZihtb2R1bGVzICYmIG1vZHVsZXMubGVuZ3RoICE9PSAwKXtcblx0XHRcdC8vIEl0ZXJhdGUgb3ZlciB0aGUgbW9kdWxlcy4gV291bGQgYmUgYmV0dGVyIGRvbmUgdmlhIGBtb2R1bGVzLm1hcGAsIGJ1dFxuXHRcdFx0Ly8gaXQgd29ya3MuXG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKylcblx0XHRcdHtcblx0XHRcdFx0Ly8gSWYgdGhlIG1vZHVsZSBpcyBhIHN0cmluZyAoaS5lLiAndWktcm91dGVyJyBvciAnbmdBcmlhJykgdGhlbiB3ZSBhcmVcblx0XHRcdFx0Ly8gYWxyZWFkeSBzZXRcblx0XHRcdFx0aWYodHlwZW9mIG1vZHVsZXNbaV0gPT09ICdzdHJpbmcnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fZGVwZW5kZW5jaWVzLnB1c2gobW9kdWxlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gSWYgaXQgaXNuJ3QgYSBzdHJpbmcgYnV0IGhhcyBhIG5hbWUgdGhlbiB1c2UgdGhlIG5hbWUgaW5zdGVhZC4gUmF3XG5cdFx0XHRcdC8vIGBhbmd1bGFyLm1vZHVsZWBzIHByb3ZpZGUgdGhlIG5hbWUgaGVyZSBhcyBkb2VzIG91ciByZWltcGxlbWVudGF0aW9uLlxuXHRcdFx0XHRlbHNlIGlmKG1vZHVsZXNbaV0gJiYgbW9kdWxlc1tpXS5uYW1lKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5fZGVwZW5kZW5jaWVzLnB1c2gobW9kdWxlc1tpXS5uYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBJZiBuZWl0aGVyIGNhc2Ugd2FzIG1ldCwgdGhyb3cgYW4gZXJyb3Jcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVhZCBtb2R1bGU6IFVua25vd24gbW9kdWxlIGluICR7dGhpcy5uYW1lfWApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWxpYXMgb3ZlciB0aGUgcmF3IGNvbmZpZyBmdW5jdGlvblxuXHRjb25maWcoY29uZmlnRnVuYzogYW55KTogRGVjb3JhdGVkTW9kdWxle1xuXHRcdHRoaXMuX21vZHVsZS5jb25maWcoY29uZmlnRnVuYyk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8vIEFsaWFzIG92ZXIgdGhlIHJhdyBydW4gZnVuY3Rpb25cblx0cnVuKHJ1bkZ1bmM6IGFueSk6IERlY29yYXRlZE1vZHVsZXtcblx0XHR0aGlzLl9tb2R1bGUucnVuKHJ1bkZ1bmMpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvLyBBbGlhcyBmb3IgdGhlIHZhbHVlIHByb3ZpZGVyXG5cdHZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IERlY29yYXRlZE1vZHVsZXtcblx0XHR0aGlzLl9tb2R1bGUudmFsdWUobmFtZSwgdmFsdWUpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvLyBBbGlhcyBmb3IgdGhlIGNvbnN0YW50IHByb3ZpZGVyXG5cdGNvbnN0YW50KG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IERlY29yYXRlZE1vZHVsZXtcblx0XHR0aGlzLl9tb2R1bGUuY29uc3RhbnQobmFtZSwgdmFsdWUpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuLy8gQmVjdWFzZSBJIGRldGVybWluZWQgYGV4cG9ydCBkZWZhdWx0IG5ldyBNb2R1bGVgIHRvIGJlIHRvbyBsb25nLCB3cmFwIHRoZVxuLy8gYERlY29yYXRlZE1vZHVsZWAgY2xhc3MgaW4gYSBzaW1wbGUgZmFjdG9yeSBmdW5jdGlvbi5cbmxldCBNb2R1bGU6IGFueSA9IGZ1bmN0aW9uKG5hbWU6IHN0cmluZywgbW9kdWxlcz86IGFueSk6IERlY29yYXRlZE1vZHVsZXtcblx0cmV0dXJuIG5ldyBEZWNvcmF0ZWRNb2R1bGUobmFtZSwgbW9kdWxlcyk7XG59O1xuXG4vLyBBIHN0YXRpYyBmdW5jdGlvbiBmb3IgYWRkaW5nIG5ldyBwYXJzZXJzLiBZb3UgcGFzcyBpdCBhIHR5cGUgbGlrZSAnZmFjdG9yeScgYW5kXG4vLyBhIHBhcnNpbmcgZnVuY3Rpb24uIFRoaXMgcGFyc2luZyBmdW5jdGlvbiBpcyB3aGF0IGlzIGNhbGxlZCBpbiB0aGUgYERlY29yYXRlZE1vZHVsZS5hZGRgXG4vLyBmdW5jdGlvblxuTW9kdWxlLmFkZFByb3ZpZGVyID0gZnVuY3Rpb24ocHJvdmlkZXJUeXBlOiBzdHJpbmcsIHBhcnNlcjogYW55KXtcblx0X3BhcnNlcnNbcHJvdmlkZXJUeXBlXSA9IHBhcnNlcjtcbn07XG5cbi8vIFJldHJpZXZlIGEgcGFyc2VyLiBPbmx5IHVzZWZ1bCBmb3IgdGVzdHMgYW5kIGNoZWNraW5nIGlmIGEgcGFyc2VyIGhhcyBhbHJlYWR5IGJlZW5cbi8vIHNldFxuTW9kdWxlLmdldFBhcnNlciA9IGZ1bmN0aW9uKHByb3ZpZGVyVHlwZTogc3RyaW5nKTogYW55e1xuXHRyZXR1cm4gX3BhcnNlcnNbcHJvdmlkZXJUeXBlXTtcbn07XG5cbi8vICMjIENvbmNsdXNpb25cbi8vIEZpbmFsbHkgZXhwb3J0IG1vZHVsZVxuZXhwb3J0IGRlZmF1bHQgTW9kdWxlO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
