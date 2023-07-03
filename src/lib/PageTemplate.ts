export class PageTemplate {
    private baseTitle: string;
    protected pageTitle: string;
    protected language: string;

    constructor() {
        this.language = 'en';
        this.baseTitle = 'Services platform';
        this.pageTitle = '';
    }

    head() {
        const title = `${this.pageTitle ? this.pageTitle + ' | ' : ''}${this.baseTitle}`;

        return `<head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title}</title>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
                    <link rel="manifest" href="/favicon/site.webmanifest">
                    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
                    <meta name="msapplication-TileColor" content="#da532c">
                    <meta name="theme-color" content="#ffffff">
                    <link rel="stylesheet" href="/css/pages/main.css">
                </head>`;
    }

    header() {
        return `<header>
                    <img src="#" alt="Logo">
                    <nav>
                        <a href="/">Home</a>
                        <a href="/register">Register</a>
                        <a href="/login">Login</a>
                    </nav>
                </header>`;
    }

    footer() {
        return `<footer>
                    <p>Copyright &copy; 2023</p>
                </footer>`;
    }

    main() {
        return `<main>
                    PAGE TEMPLATE
                </main>`;
    }

    render() {
        return `<!DOCTYPE html>
                <html lang="${this.language}">
                ${this.head()}
                <body>
                    ${this.header()}
                    ${this.main()}
                    ${this.footer()}
                    <script src="/js/main.js" type="module" defer></script>
                </body>
                </html>`;
    }
}

export default PageTemplate;