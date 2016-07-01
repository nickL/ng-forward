import JQuery from "./";
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IAugmentedJQueryStatic = angular.IAugmentedJQueryStatic;
import { ngClass } from "../testing/test-component-builder";
export interface INgForwardJQueryStatic extends IAugmentedJQueryStatic {
    (selector: string, context?: any): INgForwardJQuery;
    (element: any): INgForwardJQuery;
    (object: {}): INgForwardJQuery;
    (elementArray: any[]): INgForwardJQuery;
    (object: JQuery): INgForwardJQuery;
    (func: Function): INgForwardJQuery;
    (array: any[]): INgForwardJQuery;
    (): INgForwardJQuery;
}
export interface INgForwardJQuery extends IAugmentedJQuery {
    find(selector: string): INgForwardJQuery;
    find(element: any): INgForwardJQuery;
    find(obj: JQuery): INgForwardJQuery;
    nativeElement: any;
    componentInstance: any;
    componentViewChildren: INgForwardJQuery[];
    getLocal(injectable: any): any;
    queryAll(predicate: string, scope?: any): INgForwardJQuery[];
    query(predicate: string, scope?: any): INgForwardJQuery;
}
export declare class By {
    static all(): string;
    static css(selector: string): string;
    static directive(type: ngClass): string;
}
declare var _default: IAugmentedJQueryStatic;
export default _default;
