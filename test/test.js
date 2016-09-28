import test from 'blue-tape';
import SurveyMonkey from '../lib/index.js';
import config from './test-config.js';
import fs from 'fs';

test('proper configuration', t => {
    t.equal(SurveyMonkey.props.name, require('../package.json').name);
    t.equal(SurveyMonkey.props.version, require('../package.json').version);
    t.end();
});

test('test surveys', async t => {
  const activity = new SurveyMonkey();
  const surveysStream = await activity.requestSurveys(config);
  surveysStream.on('data', (chunk) => {
    fs.appendFile('output.txt', chunk);
  });
  surveysStream.on('error', (error) => {
    fs.appendFile('output.txt', error);
  });
});
