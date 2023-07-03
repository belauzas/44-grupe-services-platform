import PageTemplate from "../lib/PageTemplate.js";

export class Page404 extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = '404';
    }

    main() {
        return `<main>
                    <h1>404!</h1>
                </main>`;
    }
}

export default Page404;