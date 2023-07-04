export class PageTemplate {
    private baseTitle: string;
    private language: string;
    protected isDev: boolean;
    protected pageTitle: string;
    protected pageCSSfile: string;
    protected pageJSfile: string;
    protected isHomePage: boolean;

    constructor() {
        this.isDev = true;

        this.baseTitle = 'Service platform';
        this.pageTitle = '';
        this.language = 'en';
        this.pageCSSfile = 'main';
        this.pageJSfile = 'main';
        this.isHomePage = false;
    }

    private css() {
        return `<link rel="stylesheet" href="/css/pages/${this.pageCSSfile}.css">`;
    }

    private head() {
        const title = (this.pageTitle ? this.pageTitle + ' | ' : '') + this.baseTitle;
        return `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            ${this.css()}
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
            <link rel="manifest" href="/favicon/site.webmanifest">
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
            <meta name="msapplication-TileColor" content="#da532c">
            <meta name="theme-color" content="#ffffff">`;
    }

    private header() {
        let logoHTML = '<img class="logo" src="/img/logo.png" alt="Logo">';
        if (!this.isHomePage) {
            logoHTML = `<a href="/">${logoHTML}</a>`;
        }

        return `
            <header class="main-header">
                ${logoHTML}
                <nav class="main-nav">
                    <a class="link" href="/">Home</a>
                    <a class="link" href="/services">Services</a>
                    <a class="link" href="/register">Register</a>
                    <a class="link" href="/login">Login</a>
                </nav>
            </header>`;
    }

    protected main() {
        return `MAIN CONTENT`;
    }

    private footer() {
        return `
            <footer>
                <p>Copyright &copy; 2023</p>
            </footer>`;
    }

    private scripts() {
        let HTML = `<script src="/js/${this.pageJSfile}.js" type="module" defer></script>`;
        return HTML;
    }

    render() {
        return `
            <!DOCTYPE html>
            <html lang="${this.language}">
            <head>${this.head()}</head>
            <body>
                ${this.header()}
                <main>${this.main()}</main>
                ${this.footer()}
                ${this.scripts()}
            </body>
            </html>`;
    }
}

export default PageTemplate;