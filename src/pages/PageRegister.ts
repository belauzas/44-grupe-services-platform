import PageTemplate from "../lib/PageTemplate.js";

export class PageRegister extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = 'Register';
    }

    main() {
        return `<main>
                    <h1>Register!</h1>
                </main>`;
    }
}

export default PageRegister;