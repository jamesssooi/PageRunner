/** ========================================================================= *\
 * PageRunner v0.1.0
 * A JavaScript helper library that helps you run page-specific code.
 * 
 * @author James Ooi
 * ========================================================================== */

class PageRunner {

  // Static Properties ------------------------------------------------------ */

  /** Function to determine whether a page should be run */
  static testFn: PageRunner.TestFunction = (pageName, body) => {
    return body.getAttribute('data-page') === pageName;
  }

  /** Default Options */
  static defaultOptions: PageRunner.Options = {
    testFn: PageRunner.testFn
  }

  // Class Properties ------------------------------------------------------- */

  options: PageRunner.Options;
  pages: PageRunner.Page[];
  globals: Function[];

  // Constructor ------------------------------------------------------------ */

  constructor(options: PageRunner.Options) {
    this.options = { ...PageRunner.defaultOptions, ...options };
  }

  // Public Methods --------------------------------------------------------- */

  /**
   * Registers a new page function
   * @param {String} pageName Name of page
   * @param {Function} fn Function to run in this page
   */
  on(pageName: string, fn: Function) {
    const pages = this.pages.slice();

    // Add new page if it hasn't been registered
    pages.forEach((page) => {
      if (page.name === pageName) {
        pages.push({ name: pageName, resolved: false, functions: [] });
      }
    });

    // Register new function
    this.pages = pages.map((page) => {
      if (page.name === pageName) {
        page.functions.push(fn);
      }
      return page;
    });

    return this;
  }

  /**
   * Registers a new global function that runs on all pages
   * @param {Function} fn
   */
  onAll(fn: Function) {
    this.globals.push(fn);
    return this;
  }

  /**
   * Run pages
   * @param {Function} callbackFn
   */
  run(callbackFn: Function = null) {
    // Run global functions
    this.globals.map(fn => fn(document.body));

    // Run page specific functions
    this.pages = this.pages.map((page) => {
      // Check if we should run this page
      if (!this.options.testFn(page.name, document.body)) { return page; }

      // Run all page functions
      page.functions.map(fn => fn(page, document.body));
      page.resolved = true;

      return page;
    });

    // Call the callback function
    if (callbackFn) { callbackFn(); }
  }

}

export default PageRunner;


/* Type Declarations
 * ========================================================================== */
export namespace PageRunner {

  /** Options */
  export interface Options {
    testFn: TestFunction
  }

  /** Test Function */
  export type TestFunction = (pageName: string, body: HTMLElement) => boolean;

  /** Page Interface */
  export interface Page {
    name: string,
    resolved: boolean,
    functions: Function[]
  }

}