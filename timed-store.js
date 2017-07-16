import fs from 'fs';
/**
 * This class stores data points with their timestamps and performs various analytics
 */
export default class TimedStore {
    /**
     * Database
     * @type {Object}
     */
    data = {};

    /**
     * Filename to store data in
     * @type {string}
     */
    filename = null;

    /**
     * Create a new instance and load data
     * @param  {string} filename - a filename to store data in
     */
    constructor(filename) {
        this.filename = filename;
        try {
            this.data = JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
        } catch(err) {
            console.error(err.toString());
        }
    }

    /**
     * Adds a data point with `setID` at the current point in time
     * @param {string} setID - the data set id (e.g. `campaigns`)
     * @param {Object} data - data object
     */
    addDataPoint(setID, data) {
        const timestamp = Date.now();
        console.log(`adding ${setID} data set with timestamp ${timestamp}`);
        this.data[setID] = this.data[setID] || {};
        this.data[setID][timestamp] = data;
        this.save();
    }

    /**
     * Saves the data to the storage
     */
    save() {
        fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 4), 'utf-8');
    }
}
