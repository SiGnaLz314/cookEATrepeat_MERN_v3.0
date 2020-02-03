import React from 'react';
import renderer from 'react-test-renderer';
import RecipesList from './recipes-list';
import { BrowserRouter } from 'react-router-dom';

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
const adminFalse=false;
const loggedInFalse=false;
const adminTrue=true;
const loggedInTrue=true;


describe('Recipe-List tests', ()=> {
    test('Recipe-List snapshot test', () => {
        const component = renderer.create(
            <BrowserRouter>
                <RecipesList
                    recipes={recipes}
                    loggedIn={loggedInFalse}
                    admin={adminFalse} />
            </BrowserRouter>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Recipe-List snapshot Logged In & Admin test', () => {
        const component = renderer.create(
            <BrowserRouter>
                <RecipesList
                    recipes={recipes}
                    loggedIn={loggedInTrue}
                    admin={adminTrue} />
            </BrowserRouter>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});
