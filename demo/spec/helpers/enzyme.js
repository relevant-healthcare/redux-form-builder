import jasmineEnzyme from 'jasmine-enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

configure({ adapter: new Adapter() });

beforeEach(function() {
  jasmineEnzyme();
});
