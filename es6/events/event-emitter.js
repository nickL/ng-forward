import Subject from '@reactivex/rxjs/dist/cjs/Subject';
export default class EventEmitter extends Subject {
    constructor(isAsync = true) {
        super();
        this._isAsync = isAsync;
    }
    subscribe(generatorOrNext, error, complete) {
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            let schedulerFn = this._isAsync ?
                    (value) => { setTimeout(() => generatorOrNext.next(value)); } :
                    (value) => { generatorOrNext.next(value); };
            return super.subscribe(schedulerFn, (err) => generatorOrNext.error ? generatorOrNext.error(err) : null, () => generatorOrNext.complete ? generatorOrNext.complete() : null);
        }
        else {
            let schedulerFn = this._isAsync ?
                    (value) => { setTimeout(() => generatorOrNext(value)); } :
                    (value) => { generatorOrNext(value); };
            return super.subscribe(schedulerFn, (err) => error ? error(err) : null, () => complete ? complete() : null);
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9ldmVudHMvZXZlbnQtZW1pdHRlci50cyJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJFdmVudEVtaXR0ZXIuY29uc3RydWN0b3IiLCJFdmVudEVtaXR0ZXIuc3Vic2NyaWJlIl0sIm1hcHBpbmdzIjoiT0FBTyxPQUFPLE1BQU0sa0NBQWtDO0FBMEN0RCwwQ0FBNkMsT0FBTztJQVFsREEsWUFBWUEsT0FBT0EsR0FBWUEsSUFBSUE7UUFDakNDLE9BQU9BLENBQUNBO1FBQ1JBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLE9BQU9BLENBQUNBO0lBQzFCQSxDQUFDQTtJQUVERCxTQUFTQSxDQUFDQSxlQUFxQkEsRUFBRUEsS0FBV0EsRUFBRUEsUUFBY0E7UUFDMURFLEVBQUVBLENBQUNBLENBQUNBLGVBQWVBLElBQUlBLE9BQU9BLGVBQWVBLEtBQUtBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1lBRTNEQSxJQUFJQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQTtnQkFDM0JBLEtBQUNBLEtBQUtBLE9BQU9BLFVBQVVBLENBQUNBLE1BQU1BLGVBQWVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUM3REEsS0FBQ0EsS0FBS0EsT0FBT0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFaERBLE1BQU1BLENBQUNBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLFdBQVdBLEVBQzlCQSxDQUFDQSxHQUFHQSxLQUFLQSxlQUFlQSxDQUFDQSxLQUFLQSxHQUFHQSxlQUFlQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxFQUNsRUEsTUFBTUEsZUFBZUEsQ0FBQ0EsUUFBUUEsR0FBR0EsZUFBZUEsQ0FBQ0EsUUFBUUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFFMUVBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRU5BLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBO2dCQUMzQkEsS0FBQ0EsS0FBS0EsT0FBT0EsVUFBVUEsQ0FBQ0EsTUFBTUEsZUFBZUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hEQSxLQUFDQSxLQUFLQSxPQUFPQSxlQUFlQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUUzQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFDOUJBLENBQUNBLEdBQUdBLEtBQUtBLEtBQUtBLEdBQUdBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLEVBQ2xDQSxNQUFNQSxRQUFRQSxHQUFHQSxRQUFRQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUUxQ0EsQ0FBQ0E7SUFDSEEsQ0FBQ0E7QUFDSEYsQ0FBQ0E7QUFFZSIsImZpbGUiOiJsaWIvZXZlbnRzL2V2ZW50LWVtaXR0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ViamVjdCBmcm9tICdAcmVhY3RpdmV4L3J4anMvZGlzdC9lczYvU3ViamVjdCc7XG5cbi8qKlxuICogVXNlIGJ5IGRpcmVjdGl2ZXMgYW5kIGNvbXBvbmVudHMgdG8gZW1pdCBjdXN0b20gRXZlbnRzLiBDb3BpZWQgZnJvbSBBbmd1bGFyIDIncyBbRXZlbnRFbWl0dGVyXShcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9jYTM5ODZmMzFkYmE1NzkzYjBhMTQxZTkwYzRhNWZiMTdjZTg4NDdhL21vZHVsZXMvYW5ndWxhcjIvc3JjL2NvcmUvZmFjYWRlL2FzeW5jLnRzI0w4OC1MMTE3KS5cbiAqXG4gKiAjIyMgRXhhbXBsZXNcbiAqXG4gKiBJbiB0aGUgZm9sbG93aW5nIGV4YW1wbGUsIGBaaXBweWAgYWx0ZXJuYXRpdmVseSBlbWl0cyBgb3BlbmAgYW5kIGBjbG9zZWAgZXZlbnRzIHdoZW4gaXRzXG4gKiB0aXRsZSBnZXRzIGNsaWNrZWQ6XG4gKlxuICogYGBgXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICd6aXBweScsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgIDxkaXYgY2xhc3M9XCJ6aXBweVwiPlxuICogICAgIDxkaXYgKGNsaWNrKT1cInRvZ2dsZSgpXCI+VG9nZ2xlPC9kaXY+XG4gKiAgICAgPGRpdiBbaGlkZGVuXT1cIiF2aXNpYmxlXCI+XG4gKiAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gKiAgICAgPC9kaXY+XG4gKiAgPC9kaXY+YH0pXG4gKiBleHBvcnQgY2xhc3MgWmlwcHkge1xuICogICB2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAqICAgQE91dHB1dCgpIG9wZW46IEV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAqICAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gKlxuICogICB0b2dnbGUoKSB7XG4gKiAgICAgdGhpcy52aXNpYmxlID0gIXRoaXMudmlzaWJsZTtcbiAqICAgICBpZiAodGhpcy52aXNpYmxlKSB7XG4gKiAgICAgICB0aGlzLm9wZW4ubmV4dChudWxsKTtcbiAqICAgICB9IGVsc2Uge1xuICogICAgICAgdGhpcy5jbG9zZS5uZXh0KG51bGwpO1xuICogICAgIH1cbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogVXNlIFJ4Lk9ic2VydmFibGUgYnV0IHByb3ZpZGVzIGFuIGFkYXB0ZXIgdG8gbWFrZSBpdCB3b3JrIGFzIHNwZWNpZmllZCBoZXJlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2podXNhaW4vb2JzZXJ2YWJsZS1zcGVjXG4gKlxuICogT25jZSBhIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgc3BlYyBpcyBhdmFpbGFibGUsIHN3aXRjaCB0byBpdC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyPFQ+IGV4dGVuZHMgU3ViamVjdDxUPiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2lzQXN5bmM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgW0V2ZW50RW1pdHRlcl0sIHdoaWNoIGRlcGVuZGluZyBvbiBbaXNBc3luY10sXG4gICAqIGRlbGl2ZXJzIGV2ZW50cyBzeW5jaHJvbm91c2x5IG9yIGFzeW5jaHJvbm91c2x5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoaXNBc3luYzogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2lzQXN5bmMgPSBpc0FzeW5jO1xuICB9XG5cbiAgc3Vic2NyaWJlKGdlbmVyYXRvck9yTmV4dD86IGFueSwgZXJyb3I/OiBhbnksIGNvbXBsZXRlPzogYW55KTogYW55IHtcbiAgICBpZiAoZ2VuZXJhdG9yT3JOZXh0ICYmIHR5cGVvZiBnZW5lcmF0b3JPck5leHQgPT09ICdvYmplY3QnKSB7XG5cbiAgICAgIGxldCBzY2hlZHVsZXJGbiA9IHRoaXMuX2lzQXN5bmMgP1xuICAgICAgICAgICh2YWx1ZSkgPT4geyBzZXRUaW1lb3V0KCgpID0+IGdlbmVyYXRvck9yTmV4dC5uZXh0KHZhbHVlKSk7IH0gOlxuICAgICAgICAgICh2YWx1ZSkgPT4geyBnZW5lcmF0b3JPck5leHQubmV4dCh2YWx1ZSk7IH07XG5cbiAgICAgIHJldHVybiBzdXBlci5zdWJzY3JpYmUoc2NoZWR1bGVyRm4sXG4gICAgICAgICAgKGVycikgPT4gZ2VuZXJhdG9yT3JOZXh0LmVycm9yID8gZ2VuZXJhdG9yT3JOZXh0LmVycm9yKGVycikgOiBudWxsLFxuICAgICAgICAgICgpID0+IGdlbmVyYXRvck9yTmV4dC5jb21wbGV0ZSA/IGdlbmVyYXRvck9yTmV4dC5jb21wbGV0ZSgpIDogbnVsbCk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBsZXQgc2NoZWR1bGVyRm4gPSB0aGlzLl9pc0FzeW5jID9cbiAgICAgICAgICAodmFsdWUpID0+IHsgc2V0VGltZW91dCgoKSA9PiBnZW5lcmF0b3JPck5leHQodmFsdWUpKTsgfSA6XG4gICAgICAgICAgKHZhbHVlKSA9PiB7IGdlbmVyYXRvck9yTmV4dCh2YWx1ZSk7IH07XG5cbiAgICAgIHJldHVybiBzdXBlci5zdWJzY3JpYmUoc2NoZWR1bGVyRm4sXG4gICAgICAgICAgKGVycikgPT4gZXJyb3IgPyBlcnJvcihlcnIpIDogbnVsbCxcbiAgICAgICAgICAoKSA9PiBjb21wbGV0ZSA/IGNvbXBsZXRlKCkgOiBudWxsKTtcblxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge1N1YmplY3R9Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9