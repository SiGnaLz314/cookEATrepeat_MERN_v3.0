import React from 'react';
import renderer from 'react-test-renderer';
import Home from './home';
import { BrowserRouter } from 'react-router-dom';

const user='TestUser@testEmail.com';
const recipes=[
    {    recipe_id: 1,
        recipename: "Test",
        animal: "pork",
        ingredients: "Test",
        instructions:"Test",
        imagepath:"Test.jpg",
        imageURL: "https://cer-images.s3.amazonaws.com/images/Test.jpg",
        date: '2019-11-06T00:06:17.667+00:00',
    },
    {    recipe_id: 2,
        recipename: "Test",
        animal: "pork",
        ingredients: "Test",
        instructions:"Test",
        imagepath:"Test.jpg",
        imageURL: "https://cer-images.s3.amazonaws.com/images/Test.jpg",
        date: '2019-11-06T00:06:17.667+00:00',
    }
]; 
const admin=false;



describe('Home tests', ()=> {
    test('Home snapshot test', () => {
        const component = renderer.create(
            <BrowserRouter>
                <Home user={user}
                    recipes={recipes} 
                    admin={admin} />
            </BrowserRouter>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
