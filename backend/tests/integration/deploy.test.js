// testing imports
import { GenericContainer, Wait } from 'testcontainers';
import request from 'supertest';
import { jest } from '@jest/globals';

// used to identify the dockerfile
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// describe statement implies hooks remain scoped to this block
describe('Launching Container before Backend Testing', () => {

    let myContainer;
    let baseUrl;
    jest.setTimeout(60000); // give adequate time to turn on containers

    // this sets up the containers, happens before tests are applied
    beforeAll(async () => {
        // logic for turning on containers goes here
        const containerBuilder = await GenericContainer.fromDockerfile(path.resolve(__dirname, '../../'))
            .build();

        // Now configure the instance returned by build()
        myContainer = await containerBuilder
            .withEnvironment({
                GOOGLE_APPLICATION_CREDENTIALS: "/app/.gcloud_config/credentials.json"
            })
            // Replicate the volume mapping from your compose file
            .withBindMounts([
                {
                    source: path.resolve(__dirname, "../../.gcloud_config/application_default_credentials.json"),
                    target: "/app/.gcloud_config/credentials.json",
                    mode: "ro",
                },
            ])
            .withExposedPorts(8000)
            .withWaitStrategy(Wait.forLogMessage(/Server (is )?running on port 8000/))
            .start();

        const host = myContainer.getHost();
        const port = myContainer.getMappedPort(8000);
        baseUrl = `http://${host}:${port}`;
    });

    // this tears down the containers
    afterAll(async () => {
        if (myContainer) await myContainer.stop();
    });
    
    // this tests the backend
    test('send request to backend', async () => {
        // logic for testing the backend goes here

        const response = await request(baseUrl)
            .get('/')
            .set('Accept', 'application/json');
        
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe('Hello World!');
    });
});