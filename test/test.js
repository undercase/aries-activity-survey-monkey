import test from 'blue-tape';
import SurveyMonkey from '../lib/index.js';
import config from './test-config.js';

test('proper configuration', t => {
    t.equal(SurveyMonkey.props.name, require('../package.json').name);
    t.equal(SurveyMonkey.props.version, require('../package.json').version);
    t.end();
});

test('test here', t => {
    // don't forget to write tests :)
    t.fail('Write tests!');
    t.end();
});
