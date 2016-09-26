import test from 'blue-tape';
import SurveyMonkey from '../lib/index.js';
import config from './test-config.js';

test('proper configuration', t => {
    t.equal(SurveyMonkey.props.name, require('../package.json').name);
    t.equal(SurveyMonkey.props.version, require('../package.json').version);
    t.end();
});

test('test here', t => {
  const activity = new SurveyMonkey();
  const stream = activity.create(config);
  stream.getSurveyList({title: 'some_title', page_size: 25 }, function(error, data) {
    if (error)
      console.log(error.message);
    else
      console.log(JSON.stringify(data));
  });
  t.end();
});
