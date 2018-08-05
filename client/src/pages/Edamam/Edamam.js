import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import CardBtn from "../../components/CardBtn";
import Wrapper from "../../components/Wrapper";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import "./Edamam.css";

// let searchResults = [];
let dbSavedResults = [];
let displayResults = [];

// S E A R C H  E D A M A M   A P I

class EdamamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: "",
      recipeID: [],
      showCard: false,
      like: false,
      submitBtn: false,
      displayRecipes: []
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  // When the component mounts, load saved recipes
  // componentDidMount() {
  //   this.loadEdamamRecipes();
  // }



  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.searchRecipes method to get the recipe data from Edamam
  // Then reload recipes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.queryString) {
      console.log(this.state.queryString);

      //makes AJAX call to Edamam API
      API.searchEdamam(this.state.queryString)
        .then(res => {
          displayResults = res.data.hits;
          this.setState({ 
            showCard: true,
            displayRecipes: displayResults,
            submitBtn: false
           })
        })
        .catch(err => console.log(err));
    }
    //clears out search term in input box
    this.state.queryString = "";
  };

  //to pull list of your saved recipes
  handleFormSubmitSaved = event => {
    event.preventDefault();
    API.searchForLiked()
    .then(res => {
      displayResults = res.data;
      this.setState({
        displayRecipes: displayResults,
        submitBtn: true
      })
    })
  };

  // Saves recipes to db
  handleBtnClick = (event) => {
    event.preventDefault();
    // Get the data from  the clicked button
    const cardLink = event.target.attributes.getNamedItem("data-recipelink").value;
    const cardName = event.target.attributes.getNamedItem("data-recipename").value;
    const cardImage = event.target.attributes.getNamedItem("data-image").value;
    const cardIngredients = event.target.attributes.getNamedItem("data-recipeingredients").value;
    const cardLike = event.target.attributes.getNamedItem("data-like").value;
    const cardLikeTracker = event.target.attributes.getNamedItem("data-liketracker").value;
    //const cardID = event.target.attributes.getNamedItem("data-value").value;
    console.log(`like triggered, info will be posted to db: (BTNLIKE)
    ${cardLikeTracker},
    `);


//GET request from db, should return URL's of results in an array belonging to your user
    // API.searchForLiked()
    // .then(res => {
    //   dbSavedResults = res.data;
    // });
    // console.log("dbsavedresults: " + dbSavedResults);
//for loop through resultarray.length
//if cardLink matches any result in the array then console.log("alreadys saved")
      
      console.log(this.state.like); 

      //chck if recipe has been liked already, if not then save recipe to db
      if (cardLikeTracker && this.state.like === false) {
        API.saveEdamam({
          user: "test",
          name: cardName,
          ingredients: cardIngredients,
          recipelink: cardLink,
          image: cardImage
          // liked: true,
      });
      console.log("recipe saved");
      //if recipe has already been liked, then onClick again will delete the recipe
    } else if (cardLike === "liked") {
        this.deleteEdamam(cardName);
        console.log("recipe deleted");
    }

        //toggle recipe "liked" status
        this.setState(prevState => ({
          like: !prevState.like
        }));
        console.log(this.state.like); 

  };

// removes recipe from db
deleteEdamam = cardName => {
  console.log("test");
  // finds specific recipe in our db
  API.findEdamamID(cardName)
        .then(res => {
          // deletes that recipe from our db
          API.deleteEdamam(res.data[0]._id)
      }).catch(err => console.log(err));
  };
 
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3">
              <h1>Search</h1>
            <form id="searchForm"> 
              <div className="searchForm">
                <Input
                  value={this.state.queryString}
                  onChange={this.handleInputChange}
                  name="queryString"
                  placeholder="Search"
                />
                <button
                  className="searchbtn"
                  disabled={!(this.state.queryString)}
                  onClick={this.handleFormSubmit}
                >
                <i className="fas fa-utensiles"/>
                  Search!
                </button>
              </div>
              <div className="savedForm">
              <button
                className="savedbtn"
                onClick={this.handleFormSubmitSaved}
              >
              <i className="fas fa-utensils"/>
                View Saved Recipes
              </button>
              </div>
            </form>
          </Col>
          <Col size="md-9">
          { !this.state.submitBtn ? 
            <h1>Search Results</h1>
            :
            <h1>Your Saved Recipes </h1>
          }

          <div className="resultsWrapper" showcard={this.state.showCard}>
          { !this.state.submitBtn ?
          displayResults.map((results, index) => (
              <Card 
                key={results.recipe.shareAs}
                image={results.recipe.image} 
                recipeName={results.recipe.label}
                recipeLink={results.recipe.url}
                recipeIngredients={results.recipe.ingredientLines}
                handleBtnClick={this.handleBtnClick}
                likeTracker={this.state.like ? results.recipe.url : ""}
                like={this.state.like ? "liked" : "unliked"}
                // save={this.state.save ? "saved" : "unsaved"}
                recipeID={index}
                marker="true"
              />
            ))
            :
            displayResults.map((results, index) => (
              <Card 
                key={index}
                user="test"
                image={results.image} 
                recipeName={results.name}
                recipeLink={results.recipelink}
                recipeIngredients={results.ingredients}
                marker="false"
              />
            ))
          }
          </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EdamamSearch;