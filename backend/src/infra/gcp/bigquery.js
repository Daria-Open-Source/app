import { BigQuery } from '@google-cloud/bigquery';

class BigQueryWrapper {
    
    // private members bc other services don't need to interact w/ these vars
    #client;
    #budgetGb;
    
    /**
     * Function description
     * @param {int} gbBudget            - param description
     * @throws {Error} BigQueryConnect  - what the function throws
     */
    constructor(gbBudget = 10) {
        this.#client = new BigQuery();
        this.#budgetGb = gbBudget;
    
        if (!this.#client)
            throw new Error('Could not connect to BigQuery')
    };

    /**
     * Function description
     * @param {}        - param description
     * @modifies {}     - what the function modifies
     * @returns {}      - what the function returns
     * @throws {}       - what the function throws
     */
    functionName() {}


    /**
     * Function description
     * @returns {boolean}   - what the function returns
     */
    async isConnected() { 
        try {
            
            // simple API call
            const [datasets] = await this.#client.getDatasets();
            if (datasets != null)
                return true;
            return false;
        } catch (err) {
            
            // TODO: replace with a custom error 
            console.log(err);
            return false;
        }
    }

    /**
     * Function description
     * @param {}        - param description
     * @modifies {}     - what the function modifies
     * @returns {}      - what the function returns
     * @throws {}       - what the function throws
     */
    health() {
        // check that each service bigquery uses is online
        // print a json diagnostic that shows each status
    }
    
    /**
     * Function description
     * @param {string} sql          - param description
     * @param {JSON} tenant_id      - 
     * @modifies {}     - what the function modifies
     * @returns {}      - what the function returns
     * @throws {}       - what the function throws
     */
    query(sql, tenant_id) {}
    
    /**
     * Function description
     * @param {}        - param description
     * @modifies {}     - what the function modifies
     * @returns {}      - what the function returns
     * @throws {}       - what the function throws
     */
    dryQuery() {}

    /**
     * Function description
     * @param {}        - param description
     * @modifies {}     - what the function modifies
     * @returns {}      - what the function returns
     * @throws {}       - what the function throws
     */
    hello() {
        console.log('hello');
    }
    
};



// node will only export a single instance of this class
const bigQuery = new BigQueryWrapper(5);
export default bigQuery;