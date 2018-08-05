import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./Details.css";


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      isUpdate: false,
      ingredientsList: [],
      descriptionList : [],
      i: 0
    };
  }
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getRecipesID(this.props.match.params.id)
      .then(res => {this.setState({ recipe: res.data, ingredientsList: res.data.ingredients, descriptionList: res.data.description})
      
      console.log(this.state.ingredientsList)}
    )
      .catch(err => console.log(err));
  }

  handleUpdate(isUpdate) {
    this.setState({ isUpdate: isUpdate })
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;

    const updatedRecipe = { ...this.state.recipe }
    updatedRecipe[name] = value

    this.setState({
      recipe: updatedRecipe
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.recipe.name && this.state.recipe.ingredients && this.state.recipe.description) {
      API.patchRecipes(this.props.match.params.id, this.state.recipe)
        .then(res => this.setState({ isUpdate: false }))
        .catch(err => console.log(err));
    }
  };

  getReadOnly = () => (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <h1>
            {this.state.recipe.name}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <ul>
              <h1 >Ingredients</h1>
              <span>
          <img id = "foodImage" src={this.state.recipe.image}  height="42" width="42"/>
           </span> 
              {this.state.ingredientsList.map(ingredients => (
                <li> {ingredients} </li> 
              ))}
            </ul>
          </article>
          
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <ul>
              <h1 >Ingredients</h1>
              {this.state.descriptionList.map(description => (
                <p> {description} </p> 
              ))}
            </ul>
          </article>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
        <p>
          Origin: {this.state.recipe.origin}
          </p>
      
        </Col>
      </Row>
      <Row>
        <button onClick={() => this.handleUpdate(true)}>Update</button>

      </Row>
    </Container>
  );

  getUpdateform = () => (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <h1>Update Recipe</h1>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <form>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              defaultValue={this.state.recipe.name}

            />
            <TextArea
              value={this.state.ingredients}
              onChange={this.handleInputChange}
              name="ingredients"
              defaultValue={this.state.recipe.ingredients}

            />
            <TextArea
              value={this.state.description}
              onChange={this.handleInputChange}
              name="description"
              defaultValue={this.state.recipe.description}
            />
             <Input
                    value={this.state.image}
                    onChange={this.handleInputChange}
                    name="image"
                    placeholder={this.state.recipe.image}
                />
                <Input
                    value={this.state.origin}
                    onChange={this.handleInputChange}
                    name="origin"
                    placeholder={this.state.recipe.origin}
                />
            <button onClick={() => this.handleUpdate(false)}>Cancel</button>
            <FormBtn
              disabled={!(this.state.recipe.name && this.state.recipe.ingredients && this.state.recipe.description)}
              onClick={this.handleFormSubmit}
            >
              Submit Recipe
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
  );

  render() {
    if (this.state.isUpdate) return this.getUpdateform();
    else return this.getReadOnly();
  }
}

export default Detail;
