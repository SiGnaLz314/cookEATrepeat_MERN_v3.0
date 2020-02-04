import React from 'react';
// import renderer from 'react-test-renderer';
import App from './App';

import { shallow } from 'enzyme';

describe('App Component Testing', () => {
  const wrapper = shallow(<App />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })
});

// test('App snapshot test', () => {
//   const component = renderer.create(<App />);
//   const tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });