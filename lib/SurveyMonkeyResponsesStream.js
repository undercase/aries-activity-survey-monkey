import { logger } from 'aries-data';
import { Readable } from 'stream';
import { SurveyMonkeyAPI } from 'surveymonkey';

@logger()
export default class SurveyMonkeyResponsesStream extends Readable {
  static PAGE_SIZE = 25;

  constructor({ apiKey, accessToken, version, secure, survey_id }) {
    super({
      objectMode: true
    });

    this.api = SurveyMonkeyAPI(apiKey, accessToken, { version: version, secure: secure });
    // Variable for pagination
    this.page = 1;
    this.survey_id = survey_id;
  }


  getChunk() {
    return new Promise((resolve, reject) => {
      this.api.getRespondentList({ survey_id: this.survey_id, page: this.page, page_size: SurveyMonkeyResponsesStream.PAGE_SIZE }, (error, data) => {
        this.page += 1;
        if (error)
          reject(Error(error));
        else {
          if (!data["respondents"] || !data["respondents"].length)
            resolve(null);
          else
            resolve(data);
        }
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
