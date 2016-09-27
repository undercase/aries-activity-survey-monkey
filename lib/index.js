import { Activity, singleS3StreamOutput } from 'aries-data';
import { SurveyMonkeyAPI } from 'surveymonkey';
import SurveyMonkeyStream from './SurveyMonkeyStream.js';

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
      var data = null;
      switch (config.method) {
        case 'surveys':
          data = await this.requestSurveys(config);
          break;
        case 'responses':
          data = await this.requestResponses(config);
          break;
        case 'questions':
          data = await this.requestQuestions(config);
          break;
        default:
          break;
      }

      return data;
    }

    async requestSurveys(config) {
      return new SurveyMonkeyStream(config);
    }
};
