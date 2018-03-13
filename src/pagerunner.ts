/** ========================================================================= *\
 * PageRunner v0.1.0
 * A JavaScript helper library that helps you run page-specific code.
 * 
 * @author James Ooi
 * ========================================================================== */
import { findInArray } from './utils';

export interface IPageRunner {
  /** Registers a new page function */
  on: (pageName: string, fn: (body: HTMLElement) => void) => IPageRunner;

  /** Registers a global function that runs on all pages */
  onAll(fn: () => void): void;

  /** Run pages, accepting an optional callback */
  run(callbackFn?: () => void): void;
}

export interface PageRunnerOptions {
  /** Override the default test function to determine whether a page should run */
  testFn?: PageTestFn
}

module PageRunner {
  /** Page describe a regustered page object */
  export interface Page {
    name: string,
    resolved: boolean,
    functions: Function[]
  }
}

/** PageTestFn implementations determines whether a page should be run. */
export type PageTestFn = (pageName: string, body: HTMLElement) => boolean;


/* PageRunner Implementation
 * ========================================================================== */
class PageRunner implements IPageRunner {

  // Static Properties ------------------------------------------------------ */

  /** 
   * testFn is the default page test function that relies on checking the body's
   * data-page attribute
   */
  static testFn: PageTestFn = (pageName, body) => {
    return body.getAttribute('data-page') === pageName;
  }

  static defaultOptions: PageRunnerOptions = {
    testFn: PageRunner.testFn
  }

  // Class Properties ------------------------------------------------------- */

  public options: PageRunnerOptions = {};
  private pages: PageRunner.Page[] = [];
  private globals: Function[] = [];

  // Constructor ------------------------------------------------------------ */

  constructor(options: PageRunnerOptions = {}) {
    this.options = { ...PageRunner.defaultOptions, ...options };
  }

  // Public Methods --------------------------------------------------------- */

  on(pageName: string, fn: (body: HTMLElement) => void) {
    const pages = this.pages.slice();

    // Add new page if it hasn't been registered
    if (findInArray(pages, (page) => page.name === pageName) !== undefined) {
      pages.push({ name: pageName, resolved: false, functions: [] });
    }

    // Register new function
    this.pages = pages.map((page) => {
      if (page.name === pageName) {
        page.functions.push(fn);
      }
      return page;
    });

    return this;
  }

  onAll(fn: () => void) {
    this.globals.push(fn);
    return this;
  }

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
