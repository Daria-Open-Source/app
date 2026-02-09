import { GenericContainer, Wait } from 'testcontainers';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKEND_DIR = path.resolve(__dirname, '..');

function setupEnv() {

    // finds env in /backend
    dotenv.config({ 
        path: path.resolve(BACKEND_DIR, '.env') 
    });

    return (process.env.GOOGLE_APPLICATION_CREDENTIALS != undefined);
}

async function runDocker() {
    
    console.log(process.env.DEBUG);
    let testContainer;
    console.log('building the container');
    try {
        const containerBuilder = await GenericContainer.fromDockerfile(BACKEND_DIR)
            .withCache(false)
            .build();
            
        // builds container with specs
        testContainer = await containerBuilder
            .withExposedPorts(8000)
            .withWaitStrategy(Wait.forLogMessage(/Server running on port 8000/))
            .start();
    }
    catch (error) {
        console.log('Encountered error, killing process: \n\n%O', error);
        process.exit(1);
    }

    console.log('succeeded in building container');
    const host = testContainer.getHost();
    const port = testContainer.getMappedPort(8000);
    
    process.env.TEST_API_URL = `http://${host}:${port}`;
    global.__CONTAINER__ = testContainer;
}

export default async () => {

    // load the env first
    const success = setupEnv();

    if (success) await runDocker();
    else {
        console.log('could not load env');
        process.exit(1);
    } 
};