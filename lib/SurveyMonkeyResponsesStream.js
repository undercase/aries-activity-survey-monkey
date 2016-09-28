import { logger } from 'aries-data';
import { Readable } from 'stream';
import { SurveyMonkeyAPI } from 'surveymonkey';

@logger()
export default class SurveyMonkeyResponsesStream extends Readable {
  static PAGE_SIZE = 25;

  constructor({ apiKey, accessToken, version, secure, survey_id }) {
    super();

    this.api = SurveyMonkeyAPI(apiKey, accessToken, { version: version, secure: secure });
    // Variable for pagination
    this.page = 1;
    this.survey_id = survey_id;
  }


  getChunk() {
    return new Promise((resolve, reject) => {
      this.api.getRespondentList({ survey_id: this.survey_id, page: this.page, page_size: SurveyMonkeyStream.PAGE_SIZE }, function(error, data) {
        this.page += 1;
        if (error)
          reject(Error(error));
        else
          resolve(data);
      });
    });
  }

  /*
   * Implementation for a Readable stream.
   * Get the next chunk of data (page) and push it into the buffer
  */
  _read() {
    this.getChunk()
      .then(::this.push)
      .catch(this.emit.bind(this, 'error'));
  }
}
