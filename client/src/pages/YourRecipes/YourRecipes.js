import React from "react";
import API from "../../utils/API";
import { Col, Row } from "../../components/Grid";
import SavedCards from "../../components/SavedCards";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./YourRecipes.css";


import {withMultiContext} from "with-context";
import { AppContext } from '../../components/AppProvider/AppProvider.js';

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            searchRecipes: [],
            name: "",
            ingredients: [],
            description: [],
            origin: "",
            labels: "",
            image: "",
            selectedOption: "share",
            queryString: "",
            user: null
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('recipes receiving user', nextProps.appContext.user);
        if (nextProps.appContext.user) {
            this.setState({ user: nextProps.appContext.user });

        }
        this.loadUserRecipes(nextProps.appContext.user);

    }

    componentDidMount(user) {
        console.log('recipes have user', this.props.appContext.user);
        if (this.props.appContext.user) {
            this.setState({ user: this.props.appContext.user });
            // this.loadUserRecipes(this.props.appContext.userser);

        }
        // console.log(UserContext)

    }

    handleUpdate(isUpdate) {
        this.setState({ isUpdate: isUpdate })
    }


    //Load recipes associated wit that user
    loadUserRecipes = (user) => {
        API.getRecipesUser(user)
            .then(res =>
                this.setState({ recipes: res.data, name: "", ingredients: "", description: "", origin: "", labels: "", image:"" })
            )
            .catch(err => console.log(err));
    }

    // Deletes a recipe from the database with a given id, then reloads recipes from the db
    deleteRecipes = id => {
        API.deleteRecipes(id)
            .then(res => this.loadUserRecipes(this.state.user))
            .catch(err => console.log(err));
    };

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // When the form is submitted, use the API.saverecipe method to save the recipe data
    // Then reload recipes from the database
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.name && this.state.ingredients && this.state.description) {

            API.saveRecipes({
                user: this.state.user,
                name: this.state.name,
                ingredients: this.state.ingredients.split("\n"),
                description: this.state.description.split("\n"),
                image: this.state.image,
                origin: this.state.origin,
                sharable: this.state.selectedOption === "share"
            })
                .then(res => {
                    this.loadUserRecipes(this.state.user);
                    this.handleUpdate(false)
                })
                .catch(err => console.log(err));
        }
    };

    //When a user searches for something, use the API to search for the term for that user
    handleSearchSubmit = (event, user) => {
        event.preventDefault();
        user = this.state.user
        if (this.state.queryString) {
            API.getRecipesUserQuery(user, this.state.queryString)
                .then(res => {
                    this.setState({ searchRecipes: res.data, name: "", ingredients: "", description: "", origin: "", image: "", labels: "" });
                }
                    // this.setState({ recipeResults: res.data.hits, image: res.data.hits[0].recipe.image, recipeName: res.data.hits[0].recipe.label, recipeLink: res.data.hits[0].recipe.url })
                ).then(
                )
                .catch(err => console.log(err));

        }
    };

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };


    buttonCreate = () => (
        <Col size="md-5 sm-12">
            <div className="createrecipe">
            <button className="btn btn-success" onClick={() => this.handleUpdate(true)}>Create Recipe</button>
        </div>
        </Col>

    )


    createRecipe = () => (
        <Col size="md-5 sm-12">
            <form>
                <Input
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                    placeholder="Name (required)"
                />
                <TextArea
                    value={this.state.ingredients}
                    onChange={this.handleInputChange}
                    name="ingredients"
                    placeholder="Ingredients (required)"
                />
                <TextArea
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    name="description"
                    placeholder="Description (required)"
                />
                 <Input
                    value={this.state.image}
                    onChange={this.handleInputChange}
                    name="image"
                    placeholder="Image URL"
                />
                <Input
                    value={this.state.origin}
                    onChange={this.handleInputChange}
                    name="origin"
                    placeholder="Origin"
                />
                <button className="btn btn-success" onClick={() => this.handleUpdate(false)}>Cancel</button>
                <FormBtn
                    disabled={!(this.state.name && this.state.ingredients && this.state.description)}
                    onClick={this.handleFormSubmit}>
                    Submit Recipe
                     </FormBtn>

            </form>
        </Col>
    );



    favRecipe = () => (
        <div className="col-md-7 col-sm-12">
            <Row>
                <Col size="md-4 sm-12">
                    <form>
                    <div className="favrecipe">
                        <Input
                            value={this.state.queryString}
                            onChange={this.handleInputChange}
                            name="queryString"
                            placeholder="Search"
                        />
                        </div>
                        <div className="favrecipebtn">
                        <FormBtn
                            disabled={!(this.state.queryString)}
                            onClick={this.handleSearchSubmit}
                        >
                            Search!
              </FormBtn>
              </div>
                    </form>
                </Col>
            </Row>
            {this.state.searchRecipes.length ? (
                    <Col size="md-12 sm-12">
                        {this.state.searchRecipes.map(searchRecipes => {
                            return (
                                <SavedCards key={searchRecipes._id}
                                    recipeLink={"/recipes/" + searchRecipes._id}
                                    recipeName={searchRecipes.name}
                                    image = {searchRecipes.image}
                                    recipeIngredients = {searchRecipes.ingredients}
                                    deleteRecipe={() => this.deleteRecipes(searchRecipes._id)}>
                                </SavedCards>

                            );
                        })}
                    </Col>
            ) : (
                        <Col size="md-12 sm-12">
                            {this.state.recipes.map(recipes => {
                                return (
                                    <SavedCards key={recipes._id}
                                        recipeLink={"/recipes/" + recipes._id}
                                        recipeName={recipes.name}
                                        image = {recipes.image}
                                        recipeIngredients = {recipes.ingredients}
                                        deleteRecipe={() => this.deleteRecipes(recipes._id)}>
                                    </SavedCards>

                                );
                            })}
                        </Col>
                )}
        </div>

    )


    render() {
        if (this.state.isUpdate)
            return (
                <Row>
                    {this.createRecipe()}
                    {this.favRecipe()}
                </Row>
            )
        else if (this.props.appContext.user)
        return(
            <Row>
                {this.buttonCreate()}
                {this.favRecipe()}
            </Row>
        );
        else return(
            <div> Please Sign In!</div>
        )
    }

}

export default withMultiContext({ appContext: AppContext })(TestPage);
