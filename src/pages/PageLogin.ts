import { PageTemplate } from "../lib/PageTemplate.js";

export class PageLogin extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = 'Login';
        this.pageCSSfile = 'auth';
        this.pageJSfile = 'login';
    }

    private heroHTML() {
        return `
            <section class="inner-hero">
                <h1 class="main-title">Login!</h1>
            </section>`;
    }

    private formHTML() {
        return `
            <section class="section">
                <form class="form" action="/api/login" method="POST">
                    <div class="form-row" data-state="">
                        <label for="email">Email</label>
                        <input id="email" type="email" required>
                        <div class="notifications">
                            <p class="info">Example: username@mail.com</p>
                            <p id="email_err" class="error"></p>
                        </div>
                    </div>
                    <div class="form-row" data-state="">
                        <label for="pass">Password</label>
                        <input id="pass" type="password" required>
                        <div class="notifications">
                            <p class="info">Between 12..100 symbols.</p>
                            <p id="pass_err" class="error"></p>
                        </div>
                    </div>
                    <div class="form-row">
                        <button class="btn" type="submit">Login now!</button>
                    </div>
                </form>
            </section>`;
    }

    main(): string {
        return this.heroHTML() + this.formHTML();
    }
}

export default PageLogin;