/** ========================================================================= *\
 * PageRunner v0.1.0
 * A JavaScript helper library that helps you run page-specific code.
 *
 * @author James Ooi
 * ========================================================================== */
declare class PageRunner {
    /** Function to determine whether a page should be run */
    static testFn: PageRunner.TestFunction;
    /** Default Options */
    static defaultOptions: PageRunner.Options;
    options: PageRunner.Options;
    pages: PageRunner.Page[];
    globals: Function[];
    constructor(options?: PageRunner.Options);
    /**
     * Registers a new page function
     * @param {String} pageName Name of page
     * @param {Function} fn Function to run in this page
     */
    on(pageName: string, fn: (body: HTMLElement) => void): this;
    /**
     * Registers a new global function that runs on all pages
     * @param {Function} fn
     */
    onAll(fn: () => void): this;
    /**
     * Run pages
     * @param {Function} callbackFn
     */
    run(callbackFn?: Function): void;
}
export default PageRunner;
export declare namespace PageRunner {
    /** Options */
    interface Options {
        testFn?: TestFunction;
    }
    /** Test Function */
    type TestFunction = (pageName: string, body: HTMLElement) => boolean;
    /** Page Interface */
    interface Page {
        name: string;
        resolved: boolean;
        functions: Function[];
    }
}
