import 'dotenv/config';
import { allServicesConnected } from "./utils/config/server.config.js";
import app from './app.js';

const PORT = process.env.PORT || 8000;
const allGood = await allServicesConnected();

if (allGood)
    app.listen(PORT, '0.0.0.0', () => console.log(`Server is online at port ${PORT}`));
else {
    console.error("Dependency check failed. Exiting.");
    process.exit(1);
}