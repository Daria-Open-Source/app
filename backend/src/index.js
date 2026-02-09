import 'dotenv/config';
import { allServicesConnected } from "./utils/config/server.config.js";
import app from './app.js';

const PORT = process.env.PORT || 8000;
const allGood = await allServicesConnected();

if (allGood)
    app.listen(PORT, () => console.log(`Server is online at port ${PORT}`));
else
    process.exit(1);