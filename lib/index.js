import { Activity, singleS3StreamOutput } from 'aries-data';

export default class SurveyMonkey extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version
    };

    constructor() {
        super();
        // initialize any instance variables here
    }

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
        throw new Error('onTask not implemented');
    }
};
