import 'dotenv/config';
import { allServicesConnected } from "./utils/config/server.config.js";
import app from './app.js';

const PORT = process.env.PORT || 8000;
allServicesConnected().then(
    result => app.listen(PORT, () => console.log(`
      Server is online at port ${PORT}\n
      Services are ${result ? 'online' : 'offline'}
      `)
    ),
    error => console.log('Did not start server because of an error, %O', error)
);
