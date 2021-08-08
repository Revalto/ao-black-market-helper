const Browser = require('./libs/Browser');
const AONetwork = require('./libs/AONetwork');

class App {
    constructor() {
        this.Browser = new Browser();
        this.AONetwork = new AONetwork(this.Browser);
    }
}

new App();