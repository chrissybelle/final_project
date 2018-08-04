import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import Wrapper from "../../components/Wrapper";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";


let searchResults = [];
let compareFromEdamam = [];
let dbResults = [];
let compareFromDb = [];
let displayResults = [];
let cardID = [];

// S E A R C H  E D A M A M   A P I

class EdamamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // recipeResults: [],
      queryString: "",
      recipeID: [],
      // recipeName: "",
      // image: "",
      // recipeLink: "",
      showCard: false,
      like: false,
      save: false,
      dbID: "",
      recipeSearchRes: []
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  // When the component mounts, load featured recipe
  // componentDidMount() {
  //   this.loadEdamamRecipes();
  // }

  // Loads FEATURED RECIPE ******* need to fix
  // loadRecipes = () => {
  //   API.getOneRecipe()
  //     .then(res =>
  //       this.setState({ recipes: res.data, name: "", ingredients: "", description: "", origin:"", labels:""  })
  //     )
  //     .catch(err => console.log(err));
  // };



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
          
          searchResults = res.data.hits;

          //stores URL of recipes into array
          for (var i=0; i<res.data.hits.length; i++) {
            compareFromEdamam.push(res.data.hits[i].recipe.url);
          }

          console.log("Edamam Results Array" + compareFromEdamam);
        
          //searches our db for Edamam recipes that have already been liked
          API.searchForLiked()
          .then(res => {

            dbResults = res.data;

            //stores URL of results into array
            for (var i=0; i<res.data.length; i++) {
              compareFromDb.push(res.data[i].description);
            }

            console.log("Liked Recipes:" + compareFromDb);
            console.log("searchresults" + searchResults);
            console.log('dbresults' + dbResults);

            let pushed = false;

            //check if Edamam results have been saved in our db already, if so then display "liked" version
            for (var i=0; i<compareFromEdamam; i++) {
              for (var j=0; j<compareFromDb; j++) {
                if (compareFromEdamam[i] === compareFromDb[j]) {
                  if (pushed === false) {
                    displayResults.push(dbResults[j]);
                    pushed = true;
                  }

                } 
              }
            }
            

            console.log("final display results:" + displayResults);
          });


          

          this.setState({ 
            showCard: true
           })
        }
      
        )
        .catch(err => console.log(err));

    }
  };

  //FIXXXXXXX :(
  handleBtnClick = (event) => {
    event.preventDefault();
    // Get the data from  the clicked button
    const cardLink = event.target.attributes.getNamedItem("data-recipelink").value;
    const cardName = event.target.attributes.getNamedItem("data-recipename").value;
    const cardImage = event.target.attributes.getNamedItem("data-image").value;
    const cardIngredients = event.target.attributes.getNamedItem("data-recipeingredients").value;
    const cardLike = event.target.attributes.getNamedItem("data-like").value;
    console.log(`${cardLink}, 
    ${cardName}, 
    ${cardIngredients}, 
    ${cardLike}`);

    //mark recipe as "liked"
      this.setState(prevState => ({
        like: !prevState.like
      }));
      
      console.log(this.state.like); 

      if (cardLike === "unliked") {
        API.saveEdamam({
          user: "test",
          name: cardName,
          ingredients: cardIngredients,
          description: cardLink,
          image: cardImage,
          origin: "Edamam",
          liked: true,
          sharable: true
      });
    } else if (cardLike === "liked") {
        this.deleteEdamam(cardName);
    }

  };

  
deleteEdamam = cardName => {
  console.log("test");
  API.findEdamamID(cardName)
        .then(res => {
          API.deleteEdamam(res.data[0]._id)
          // console.log(res.data[0]._id)
      }).catch(err => console.log(err));
        // console.log("DB id:" + this.state.dbID);
        // API.deleteEdamam(this.state.dbID);
  };
 
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-3">
            {/* <Jumbotron> */}
              <h1>Search</h1>
            {/* </Jumbotron> */}
            <form>
              <Input
                value={this.state.queryString}
                onChange={this.handleInputChange}
                name="queryString"
                placeholder="Search"
              />
              <FormBtn
                disabled={!(this.state.queryString)}
                onClick={this.handleFormSubmit}
              >
                Search!
              </FormBtn>
            </form>
          </Col>
          <Col size="md-9">
          <h1>Search Results</h1>
          <Wrapper showCard={this.state.showCard}>
            {searchResults.map((results, index) => (
              <Card 
                key={results.recipe.shareAs}
                image={results.recipe.image} 
                recipeName={results.recipe.label}
                recipeLink={results.recipe.url}
                recipeIngredients={results.recipe.ingredientLines}
                handleBtnClick={this.handleBtnClick}
                like={this.state.like ? "liked" : "unliked"}
                save={this.state.save ? "saved" : "unsaved"}
                recipeID={index}
              />
            ))}
          </Wrapper>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EdamamSearch;