import { OpaqueToken } from "./opaque-token";
export declare class Provider {
    isProvider: boolean;
    token: any;
    useClass: any;
    useValue: any;
    useConstant: any;
    useFactory: any;
    private _dependencies;
    private _type;
    constructor(token: string | OpaqueToken | Function, {useClass, useValue, useConstant, useFactory, deps}: {
        useClass?: any;
        useValue?: any;
        useConstant?: any;
        useFactory?: any;
        deps?: any[];
    });
    type: string;
    dependencies: string[];
}
export declare const provide: (token: string | OpaqueToken | Function, {
      useClass,
      useValue, 
      useConstant, 
      useFactory, 
      deps
    }: {
    useClass?: any;
    useValue?: any;
    useConstant?: any;
    useFactory?: any;
    deps?: any[];
}) => Provider;
