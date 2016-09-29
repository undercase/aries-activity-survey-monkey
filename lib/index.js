import { Activity, singleS3StreamOutput } from 'aries-data';
import { SurveyMonkeyAPI } from 'surveymonkey';
import SurveyMonkeyStream from './SurveyMonkeyStream.js';
import SurveyMonkeyResponsesStream from './SurveyMonkeyResponsesStream.js';

export default class SurveyMonkey extends Activity {
    static props = {
        name: require('../package.json').name,
        version: require('../package.json').version
    };

    constructor() {
        super();
    }

    @singleS3StreamOutput('json')
    async onTask(activityTask, config) {
      var data = null;
      switch (config.method) {
        case 'surveys':
          data = await this.requestSurveys(config);
          break;
        case 'details':
          data = await this.requestDetails(config);
          break;
        case 'responses':
          data = await this.requestResponses(config);
        default:
          break;
      }

      return data;
    }

    async requestSurveys(config) {
      return new SurveyMonkeyStream(config);
    }

    async requestResponses(config) {
      return new SurveyMonkeyResponsesStream(config);
    }

    async requestDetails({ apiKey, accessToken, version, secure, survey_id }) {
      var api = SurveyMonkeyAPI(apiKey, accessToken, { version: version, secure: secure });
      return new Promise((resolve, reject)  => {
        api.getSurveyDetails({ survey_id: survey_id }, (error, data) => {
          if (error)
            reject(Error(error));
          else
            resolve(data);
        });
      });
    }
};
