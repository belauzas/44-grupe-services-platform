import { PageTemplate } from "../lib/PageTemplate.js";

export class PageHome extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = '';
    }

    main() {
        return `<main>
                    <h1>Home!</h1>
                </main>`;
    }
}

export default PageHome;