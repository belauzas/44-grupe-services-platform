import { server } from "./lib/server.js";

export const initialFileStructure = () => {
    console.log('Creating folders...');
    console.log('Creating files...');
}

export const init = () => {
    initialFileStructure();
    server.init();
    setInterval(() => {
        // isvalyti nebegaliojancios /token/*.json
    }, 24 * 60 * 60 * 1000);
}

export const app = {
    init,
    initialFileStructure,
};

export default app;

app.init();