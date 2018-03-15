export interface IPageRunner {
    /** Registers a new page function */
    on: (pageName: string, fn: (body: HTMLElement) => void) => IPageRunner;
    /** Registers a global function that runs on all pages */
    onAll(fn: () => void): void;
    /** Run pages, accepting an optional callback */
    run(callbackFn?: () => void): void;
}
export interface PageRunnerOptions {
    /** Override the default test function to determine if a page should run */
    testFn?: PageTestFn;
}
declare module PageRunner {
    /** Page describes a regustered page object */
    interface Page {
        name: string;
        resolved: boolean;
        functions: Function[];
    }
}
/** PageTestFn implementations determines whether a page should be run. */
export interface PageTestFn {
    (pageName: string, body: HTMLElement): boolean;
}
declare class PageRunner implements IPageRunner {
    /**
     * testFn is the default page test function that relies on checking the body's
     * data-page attribute
     */
    static testFn: PageTestFn;
    static defaultOptions: PageRunnerOptions;
    options: PageRunnerOptions;
    private pages;
    private globals;
    constructor(options?: PageRunnerOptions);
    on(pageName: string, fn: (body: HTMLElement) => void): this;
    onAll(fn: () => void): this;
    run(callbackFn?: Function): void;
}
export default PageRunner;
