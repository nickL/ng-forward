const SNAKE_CASE_REGEXP = /[A-Z]/g;
export function ucFirst(word) {
    return `${word.charAt(0).toUpperCase()}${word.substring(1)}`;
}
export function dashToCamel(dash) {
    let words = dash.split('-');
    return `${words.shift()}${words.map(ucFirst).join('')}`;
}
export function dasherize(name, separator = '-') {
    return name.replace(SNAKE_CASE_REGEXP, (letter, pos) => {
        return `${(pos ? separator : '')}${letter.toLowerCase()}`;
    });
}
export function snakeCase(name, separator = '-') {
    return name.replace(SNAKE_CASE_REGEXP, (letter, pos) => {
        return `${(pos ? separator : '')}${letter.toLowerCase()}`;
    });
}
export function flatten(items) {
    let resolved = [];
    for (let item of items) {
        if (Array.isArray(item)) {
            resolved.push(...flatten(item));
        }
        else {
            resolved.push(item);
        }
    }
    return resolved;
}
export function createConfigErrorMessage(target, ngModule, message) {
    return `Processing "${target.name}" in "${ngModule.name}": ${message}`;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlsL2hlbHBlcnMudHMiXSwibmFtZXMiOlsidWNGaXJzdCIsImRhc2hUb0NhbWVsIiwiZGFzaGVyaXplIiwic25ha2VDYXNlIiwiZmxhdHRlbiIsImNyZWF0ZUNvbmZpZ0Vycm9yTWVzc2FnZSJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUM7QUFFbkMsd0JBQXdCLElBQVk7SUFDbENBLE1BQU1BLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLFdBQVdBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBO0FBQy9EQSxDQUFDQTtBQUVELDRCQUE0QixJQUFZO0lBQ3RDQyxJQUFJQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtJQUM1QkEsTUFBTUEsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsS0FBS0EsRUFBRUEsR0FBR0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7QUFDMURBLENBQUNBO0FBRUQsMEJBQTBCLElBQVksRUFBRSxTQUFTLEdBQVcsR0FBRztJQUM3REMsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQSxNQUFjQSxFQUFFQSxHQUFXQTtRQUNqRUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsU0FBU0EsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsV0FBV0EsRUFBRUEsRUFBRUEsQ0FBQ0E7SUFDNURBLENBQUNBLENBQUNBLENBQUNBO0FBQ0xBLENBQUNBO0FBRUQsMEJBQTBCLElBQVksRUFBRSxTQUFTLEdBQVcsR0FBRztJQUM3REMsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsaUJBQWlCQSxFQUFFQSxDQUFDQSxNQUFjQSxFQUFFQSxHQUFXQTtRQUNqRUEsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsU0FBU0EsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsV0FBV0EsRUFBRUEsRUFBRUEsQ0FBQ0E7SUFDNURBLENBQUNBLENBQUNBLENBQUNBO0FBQ0xBLENBQUNBO0FBRUQsd0JBQXdCLEtBQVk7SUFDbENDLElBQUlBLFFBQVFBLEdBQVVBLEVBQUVBLENBQUNBO0lBQ3pCQSxHQUFHQSxDQUFBQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxJQUFJQSxLQUFLQSxDQUFDQSxDQUFBQSxDQUFDQTtRQUNyQkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7WUFDdEJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO1FBQ2xDQSxDQUFDQTtRQUNEQSxJQUFJQSxDQUFBQSxDQUFDQTtZQUNIQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtRQUN0QkEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFREEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7QUFDbEJBLENBQUNBO0FBTUQseUNBQXlDLE1BQWMsRUFBRSxRQUFvQixFQUFFLE9BQWU7SUFDNUZDLE1BQU1BLENBQUNBLGVBQWVBLE1BQU1BLENBQUNBLElBQUlBLFNBQVNBLFFBQVFBLENBQUNBLElBQUlBLE1BQU1BLE9BQU9BLEVBQUVBLENBQUNBO0FBQ3pFQSxDQUFDQSIsImZpbGUiOiJsaWIvdXRpbC9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU05BS0VfQ0FTRV9SRUdFWFAgPSAvW0EtWl0vZztcblxuZXhwb3J0IGZ1bmN0aW9uIHVjRmlyc3Qod29yZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke3dvcmQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHt3b3JkLnN1YnN0cmluZygxKX1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGFzaFRvQ2FtZWwoZGFzaDogc3RyaW5nKTogc3RyaW5ne1xuICBsZXQgd29yZHMgPSBkYXNoLnNwbGl0KCctJyk7XG4gIHJldHVybiBgJHt3b3Jkcy5zaGlmdCgpfSR7d29yZHMubWFwKHVjRmlyc3QpLmpvaW4oJycpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXNoZXJpemUobmFtZTogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZyA9ICctJyk6IHN0cmluZyB7XG4gIHJldHVybiBuYW1lLnJlcGxhY2UoU05BS0VfQ0FTRV9SRUdFWFAsIChsZXR0ZXI6IHN0cmluZywgcG9zOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gYCR7KHBvcyA/IHNlcGFyYXRvciA6ICcnKX0ke2xldHRlci50b0xvd2VyQ2FzZSgpfWA7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc25ha2VDYXNlKG5hbWU6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcgPSAnLScpOiBzdHJpbmcge1xuICByZXR1cm4gbmFtZS5yZXBsYWNlKFNOQUtFX0NBU0VfUkVHRVhQLCAobGV0dGVyOiBzdHJpbmcsIHBvczogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIGAkeyhwb3MgPyBzZXBhcmF0b3IgOiAnJyl9JHtsZXR0ZXIudG9Mb3dlckNhc2UoKX1gO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oaXRlbXM6IGFueVtdKTogYW55W117XG4gIGxldCByZXNvbHZlZDogYW55W10gPSBbXTtcbiAgZm9yKGxldCBpdGVtIG9mIGl0ZW1zKXtcbiAgICBpZihBcnJheS5pc0FycmF5KGl0ZW0pKXtcbiAgICAgIHJlc29sdmVkLnB1c2goLi4uZmxhdHRlbihpdGVtKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICByZXNvbHZlZC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIHJlc29sdmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElOYW1lZCB7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbmZpZ0Vycm9yTWVzc2FnZSh0YXJnZXQ6IElOYW1lZCwgbmdNb2R1bGU6IG5nLklNb2R1bGUsIG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgUHJvY2Vzc2luZyBcIiR7dGFyZ2V0Lm5hbWV9XCIgaW4gXCIke25nTW9kdWxlLm5hbWV9XCI6ICR7bWVzc2FnZX1gO1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==