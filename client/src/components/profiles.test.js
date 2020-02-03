import React from 'react';
import renderer from 'react-test-renderer';
import Profile from './profiles';
import { BrowserRouter } from 'react-router-dom';

const users=[
    'test', 'test2', 'test3'
]; 
const admin=false;
const loggedIn=true;



describe('Recipe-List tests', ()=> {
    test('Recipe-List snapshot test', () => {
        const component = renderer.create(
            <BrowserRouter>
                <Profile
                    users={users}
                    loggedIn={loggedIn}
                    admin={admin} />
            </BrowserRouter>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
