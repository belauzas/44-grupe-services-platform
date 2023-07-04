import { PageTemplate } from "../lib/PageTemplate.js";

export class PageRegister extends PageTemplate {
    constructor() {
        super();
        this.pageCSSfile = 'auth';
        this.pageJSfile = 'register';
    }

    private heroHTML() {
        return `
            <section class="inner-hero">
                <h1 class="main-title">Register!</h1>
            </section>`;
    }

    private formHTML() {
        const username = this.isDev ? 'Chuck' : '';
        const email = this.isDev ? 'chuck@norris.com' : '';
        const pass = this.isDev ? 'chuck@norris.com' : '';
        const repass = this.isDev ? 'chuck@norris.com' : '';
        return `
            <section class="section">
                <form class="form" action="/api/register" method="POST">
                    <div class="form-row" data-state="">
                        <label for="username">Username</label>
                        <input id="username" type="text" value="${username}" required>
                        <div class="notifications">
                            <p class="info">Letters only. Between 4..20 symbols.</p>
                            <p id="username_err" class="error"></p>
                        </div>
                    </div>
                    <div class="form-row" data-state="">
                        <label for="email">Email</label>
                        <input id="email" type="email" value="${email}" required>
                        <div class="notifications">
                            <p class="info">Example: username@mail.com</p>
                            <p id="email_err" class="error"></p>
                        </div>
                    </div>
                    <div class="form-row" data-state="">
                        <label for="pass">Password</label>
                        <input id="pass" type="password" value="${pass}" required>
                        <div class="notifications">
                            <p class="info">Between 12..100 symbols.</p>
                            <p id="pass_err" class="error"></p>
                        </div>
                    </div>
                    <div class="form-row" data-state="">
                        <label for="repass">Repeat password</label>
                        <input id="repass" type="password" value="${repass}" required>
                        <div class="notifications">
                            <p id="repass_err" class="error"></p>
                        </div>
                    </div>
                    <div class="form-row">
                        <button class="btn" type="submit">Register now!</button>
                    </div>
                </form>
            </section>`;
    }

    main(): string {
        return this.heroHTML() + this.formHTML();
    }
}

export default PageRegister;