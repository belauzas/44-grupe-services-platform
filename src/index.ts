import { server } from "./lib/server.js";

export const initialFileStructure = () => {
    console.log('Creating folders...');
    console.log('Creating files...');
}

export const init = () => {
    initialFileStructure();
    server.init();
}

export const app = {
    init,
    initialFileStructure,
};

export default app;

app.init();