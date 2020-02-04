import React from 'react';
// import renderer from 'react-test-renderer';
import App from './App';

import { shallow } from 'enzyme';

describe('App Component Testing', () => {
  const wrapper = shallow(<App />);
  global.scrollTo = jest.fn();
  test('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
});

