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
    t.comment(chunk);
  });
  surveysStream.on('error', (error) => {
    t.fail(error);
  });
  surveysStream.on('end', () => {
    t.comment('Completed streaming surveys');
  });
});

test('test details', async t => {
  const activity = new SurveyMonkey();
  const questionsStream = await activity.requestDetails(Object.assign(config, { survey_id: "85519823" }));
  t.equal(questionsStream.data.question_count, 1, "Assert survey with proper number of questions was retrieved.");
});

test('test responses', async t => {
  const activity = new SurveyMonkey();
  const details = await activity.requestResponses(Object.assign(config, { survey_id: "85519823" }));
  details.on('data', (chunk) => {
    t.comment(chunk);
  });
  details.on('error', (error) => {
    t.fail(error);
  });
  details.on('end', () => {
    t.comment('Completed streaming responses.');
  });
});
