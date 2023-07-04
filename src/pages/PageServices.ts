import { PageTemplate } from "../lib/PageTemplate.js";

export class PageServices extends PageTemplate {
    constructor() {
        super();
        this.pageTitle = 'Services';
    }

    private heroHTML() {
        return `
            <section class="inner-hero">
                <h1 class="main-title">Services!</h1>
            </section>`;
    }

    private servicesHTML() {
        return `
            <section class="section">
                <div class="services">
                    <article class="service">
                        <img class="service-thumbnail" src="/" alt="Service thumbnail">
                        <h3 class="service-title">Service title</h3>
                        <p class="service-description">Some service description for user to read about.</p>
                        <p class="service-price">Price: 5.49 Eur</p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                    <article class="service skeleton">
                        <img class="service-thumbnail" src="/" alt="">
                        <h3 class="service-title skeleton-w-50"></h3>
                        <p class="service-description"></p>
                        <p class="service-price skeleton-w-20"></p>
                    </article>
                </div>
            </section>`;
    }

    main(): string {
        return this.heroHTML() + this.servicesHTML();
    }
}

export default PageServices;