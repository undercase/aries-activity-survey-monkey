import { logger } from 'aries-data';
import { Readable } from 'stream';
import { SurveyMonkeyAPI } from 'surveymonkey';

@logger()
export default class SurveyMonkeyStream extends Readable {
  static PAGE_SIZE = 25;

  constructor({ apiKey, accessToken, version, secure }) {
    super({
      objectMode: true
    });

    this.api = SurveyMonkeyAPI(apiKey, accessToken, { version: version, secure: secure });
    // Variable for pagination
    this.page = 1;
  }


  getChunk() {
    return new Promise((resolve, reject) => {
      this.api.getSurveyList({ page: this.page, page_size: SurveyMonkeyStream.PAGE_SIZE }, (error, data) => {
        this.page += 1;
        if (error)
          reject(Error(error));
        else {
          if (!data["surveys"] || !data["surveys"].length)
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
