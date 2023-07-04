import { PageTemplate } from "../lib/PageTemplate.js";

export class Page404 extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = '404';
    }

    private heroHTML() {
        return `
            <section class="inner-hero">
                <h1 class="main-title">404!</h1>
            </section>`;
    }

    private mainHTML() {
        return `
            <section class="section">
                <h2>Content not found!</h2>
            </section>`;
    }

    main(): string {
        return this.heroHTML() + this.mainHTML();
    }
}

export default Page404;