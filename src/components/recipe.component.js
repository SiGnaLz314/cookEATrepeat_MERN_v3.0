import React, { Component } from 'react';
import axios from 'axios';


export default class RecipeDetail extends Component {
    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);

        this.state = {
            recipename: '',
            animal: '',
            ingredients: '',
            instructions: '',
            imagepath: '',
            date: new Date(),
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/recipes/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                recipename: response.data.recipename,
                animal: response.data.animal,
                ingredients: response.data.ingredients,
                instructions: response.data.instructions,
                imagepath: response.data.imagepath,
                date: new Date(response.data.date)
            })
        })
        .catch(function(error) {
            console.log(error);
        })
    }
    

    render() {
        return (
        <>
        <h1>
            {this.state.recipename}
        </h1>
        <div className="row">
			<div className="column">
            <img id="recipe_detail_img" alt="Not Available" src={`../uploads/${this.state.imagepath}`}/>
				<div>
					<h3>Algorithm:</h3>
					<div id="recipe_detail">
						{this.state.instructions}
					</div>
				</div>
            </div>
			<div className="column">
				<h3>Variables:</h3>
				<div id="recipe_detail">
                    {this.state.ingredients}
				</div>
			</div>
        </div>
        </>
        )
    }
}