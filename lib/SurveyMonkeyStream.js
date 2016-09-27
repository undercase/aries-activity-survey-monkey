import { logger } from 'aries-data';
import { Readable } from 'stream';
import { SurveyMonkeyAPI } from 'surveymonkey';

@logger()
export default class SurveyMonkeyStream extends Readable {
  static PAGE_SIZE = 25;

  constructor({ apiKey, accessToken, version, secure }) {
    super();

    this.api = SurveyMonkeyAPI(apiKey, accessToken, { version: version, secure: secure });
    // Variable for pagination
    this.page = 1;
  }

  /*
   * Implementation for a Readable stream.
   * Get the next chunk of data (page) and push it into the buffer
  */
  _read() {
    new Promise((resolve, reject) => {
      this.api.getSurveyList({ page: this.page, page_size: SurveyMonkeyStream.PAGE_SIZE }, function(error, data) {
        this.page += 1;
        if (error)
          reject(Error("SurveyMonkey API returned error."));
        else
          resolve(data);
      });
    })
      .then(::this.push)
      .catch(this.emit.bind(this, 'error'));
  }
}
