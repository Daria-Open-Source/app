//src/infra/gcp/firestore/test.js
import { fsService } from './service.js';

const run = async () => {
    const connected = await fsService.isConnected();
    if (connected) {
        console.log("🚀 Firestore Admin Wrapper is ONLINE");
        const data = await fsService.queryCollection('users'); // test a table
        console.log("Sample Data:", data);
    } else {
        console.log("❌ Connection Failed. Check your Service Account JSON.");
        console.log("🔍 Checking Key Path:", process.env.GOOGLE_APPLICATION_CREDENTIALS);
    }
};

run();