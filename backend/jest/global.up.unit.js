import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_DIR = path.resolve(__dirname, '..');

function setupEnv() {

    // finds env in /backend
    dotenv.config({ 
        path: path.resolve(BACKEND_DIR, '.env') 
    });
    
    return (process.env.GOOGLE_APPLICATION_CREDENTIALS != undefined);
}

export default async () => {
    const success = setupEnv();
    if (success)
        console.log('env loaded');
    else
        process.exit(1);
};