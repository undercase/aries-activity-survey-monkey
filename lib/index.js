import { Activity, singleS3StreamOutput } from 'aries-data';
import { SurveyMonkeyAPI } from 'surveymonkey';

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
      return this.create(config);
    }

    create({ apiKey, accessToken, version, secure }) {
      const api = SurveyMonkeyAPI(apiKey, accessToken, {version: version, secure: secure});
      return api;
    }
};
