import React, { Component } from 'react';
import 'react-router';


const Recipe = props => (
    <>
    <div className="row">
        <h1>
            {props.recipe.recipename}
        </h1>
    </div>
    <div className="column">
        <img id="recipe_detail_img" alt="Not Available" src={`../uploads/${props.recipe.imagepath}`}/>
        <div>
            <h3>Algorithm:</h3>
            <div id="recipe_detail">
                {props.recipe.instructions}
            </div>
        </div>
    </div>
    <div className="column">
        <h3>Variables:</h3>
        <div id="recipe_detail">
            {props.recipe.ingredients}
        </div>
    </div>
    </>
)

export default class RecipeDetail extends Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            recipe: [],
        }
    }

     componentDidMount() {

     }
    
     recipe(){
        const rList = this.props.recipes
        if(rList.length > 0){
            const recipe = rList.find(el => el.recipe_id.toString() === window.location.pathname.substring(8));
            return <Recipe recipe={recipe} deleteRecipe={this.deleteRecipe} key={recipe.recipe_id} />;
        } else {
            window.location = '/';
        }
    }

    render() {
        return (
        <>
            {this.recipe()}
        </>
        )
    }
}