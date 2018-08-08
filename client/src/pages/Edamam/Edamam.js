import React from "react";
// import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import CardBtn from "../../components/CardBtn";
import FeedbackModal from "../../components/FeedbackModal";
import Wrapper from "../../components/Wrapper";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { withMultiContext } from "with-context";
import { AppContext } from '../../components/AppProvider/AppProvider.js';
import "./Edamam.css";
import SavedCards from "../../components/SavedCards";



let searchResults = [];
let dbSavedResults = [];
let displayResults = [];
let uniqueResults = [];

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
      displayRecipes: [],
      refresh: [],
      user: null,
      logInAlert: false,
    };
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  // When the component mounts, load saved recipes
  // componentDidMount() {
  //   this.loadEdamamRecipes();
  // }

  componentWillReceiveProps(nextProps) {
    console.log('recipes receiving user', nextProps.appContext.user);
    if (nextProps.appContext.user) {
      this.setState({ user: nextProps.appContext.user });

    }

  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.searchRecipes method to get the recipe data from Edamam
  // Then reload recipes from the database
  handleFormSubmit = event => {
    event.preventDefault();
    //uniqueResults = [];
    if (this.state.queryString) {
      console.log(this.state.queryString);

      //makes AJAX call to Edamam API
      API.searchEdamam(this.state.queryString)
        .then(res => {
          searchResults = res.data.hits;
          console.log(res.data.hits[0].recipe.url);
        })
        .then(
          API.findEdamamUser(this.state.user)
            .then(res => {
              dbSavedResults = res.data;

            })

        )
        .then(
          this.checkResults = () => {
            console.log(searchResults);
            console.log(dbSavedResults);

            for (var i = searchResults.length - 1; i >= 0; i--) {
              for (var j = 0; j < dbSavedResults.length; j++) {
                if (searchResults[i].recipe.url === dbSavedResults[j].recipelink[0]) {
                  searchResults.splice(i, 1);
                }
              }
            }

            uniqueResults = searchResults;
            console.log("FINAL: " + uniqueResults.length);
            this.setState({
              displayRecipes: uniqueResults
            })
          }
          // for (var i=0; i<searchResults.length; i++) {
          //   console.log("ok");
          //   for (var j=0; j<dbSavedResults.length; j++) {


          //     if (searchResults[i].recipe.url !== dbSavedResults[j].recipelink[0]) {

          //       displayResults.push(searchResults[i]);

          //     }
          //   }
          // }
          // console.log("FINAL:" + displayResults);
          // uniqueResults = Array.from(new Set(displayResults));
          // console.log("UNIQUE: " + uniqueResults);
          // }

        );




      // )
      // .catch(err => console.log(err));




      // .then(
      //   this.setState({
      //     showCard: true,
      //     displayRecipes: displayResults,
      //     submitBtn: false
      //   })
      // )



    }


    //clears out search term in input box
    this.state.queryString = "";
  };



  // checkResults = (searchResults, dbSavedResults, displayResults) => {
  //   console.log(searchResults);
  //   console.log(dbSavedResults);
  //   for (var i=0; i<12; i++) {
  //     console.log("ok");
  //     for (var j=0; j<12; j++) {

  //       console.log(searchResults[i].recipe.url);
  //       console.log(dbSavedResults[j].recipelink[0]);

  //       if (searchResults[i].recipe.url !== dbSavedResults[j].recipelink[0]) {
  //         displayResults.push(searchResults[i]);

  //       }
  //     }
  //   }
  //   console.log(displayResults);
  // }



  //to pull list of your saved recipes
  handleFormSubmitSaved = (event, user) => {
    event.preventDefault();
    user = this.state.user;
    API.searchForLiked(user)
      .then(res => {
        uniqueResults = res.data;
        this.setState({
          displayRecipes: uniqueResults,
          submitBtn: true
        })
      })
  };

  deleteRecipes = (id, user) => {
    user = this.state.user;
    API.deleteEdamamID(id)
      .then(res => API.searchForLiked(user)
        .then(res => {
          uniqueResults = res.data;
          this.setState({
            displayRecipes: uniqueResults,
            submitBtn: true
          })
        }))
      .catch(err => console.log(err));
  };


  // Saves recipes to db
  handleBtnClick = (event) => {
    event.preventDefault();
    console.log(this.props.appContext.user);

    //check if user is logged in
    if (this.props.appContext.user) {
      // Get the data from  the clicked button
      const cardLink = event.target.attributes.getNamedItem("data-recipelink").value;
      const cardName = event.target.attributes.getNamedItem("data-recipename").value;
      const cardImage = event.target.attributes.getNamedItem("data-image").value;
      const cardIngredients = event.target.attributes.getNamedItem("data-recipeingredients").value;
      const cardLike = event.target.attributes.getNamedItem("data-like").value;
      const cardLikeTracker = event.target.attributes.getNamedItem("data-liketracker").value;
      const user = this.state.user
      console.log(cardLink, );

      // searches db if recipe has aleady been saved
      API.findOneEdamam(cardName, user)
        .then(res => {
          console.log(res.data);

          // if recipe is saved in our db already
          if (res.data !== null) {

            // delete recipe
            this.deleteEdamam(cardName);
            console.log("recipe deleted");


            // else if recipe is not saved in our db already, save the recipe
          } else if (res) {
            console.log("saving recipe");
            API.saveEdamam({
              user: user,
              name: cardName,
              ingredients: cardIngredients,
              recipelink: cardLink,
              image: cardImage,
              liked: true,
            }).then(res => {
              //locate recipe that was saved
              console.log("recipe saved");
              //show feedback in modal


            })

          }
        })
      //if user is not logged in, alert user
    } else {
      this.setState({
        logInAlert: true
      })
        console.log(this.state.logInAlert)
      
    }

    //const cardID = event.target.attributes.getNamedItem("data-value").value;
    // console.log(`like triggered, info will be posted to db: (BTNLIKE)
    // ${cardLikeTracker}, ${cardLike}
    // `);


    //GET request from db, should return URL's of results in an array belonging to your user
    // API.searchForLiked()
    // .then(res => {
    //   dbSavedResults = res.data;
    // });
    // console.log("dbsavedresults: " + dbSavedResults);
    //for loop through resultarray.length
    //if cardLink matches any result in the array then console.log("alreadys saved")

    // console.log(this.state.like);




  }

  //chck if recipe has been liked already, if not then save recipe to db
  // if (cardLikeTracker) {
  // API.saveEdamam({
  //   user: "test",
  //   name: cardName,
  //   ingredients: cardIngredients,
  //   recipelink: cardLink,
  //   image: cardImage,
  //   liked: true,
  // }).then(res => {
  //   //locate recipe that was saved
  //   console.log("recipe saved");

  //     //then update liked status of recipe in db
  //     // .then

  // })
  // .catch(err => console.log(err));
  //if recipe has already been liked, then onClick again will delete the recipe
  // } else if (!cardLikeTracker) {
  //   this.deleteEdamam(cardName);
  //   console.log("recipe deleted");
  // }

  //toggle recipe "liked" status
  //   this.setState(prevState => ({
  //     like: !prevState.like
  //   }));
  //   console.log(this.state.like);

  // };


  // removes recipe from db
  deleteEdamam = cardName => {
    // console.log("recipe deleted");
    // // finds specific recipe in our db
    // API.findOneEdamam(cardName)
    //   .then(res => {
    //     // deletes that recipe from our db
    //     console.log("!!!!" + res.data)
    API.deleteEdamam(cardName)
      // })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div className="bgImage">
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
                    placeholder="Enter Search Term Here"
                  />
                  <button
                    className="searchbtn"
                    disabled={!(this.state.queryString)}
                    onClick={this.handleFormSubmit}
                  >
                    <i className="fas fa-utensils" />
                    Search!
                </button>
                </div>
                <div className="savedForm">
                  <button
                    className="savedbtn"
                    disabled={!(this.state.user)}
                    onClick={this.handleFormSubmitSaved}
                  >
                    <i className="fas fa-utensils" />
                    View Saved Recipes
              </button>
                </div>
              </form>
            </Col>
            <Col size="md-9">




              {!this.state.submitBtn ?
                <h1>Search Results</h1>
                :
                <h1>Your Saved Recipes </h1>
              }


              {this.state.logInAlert ?
                <FeedbackModal show={this.state.logInAlert} />
                :
                ""
              }

              <div className="resultsWrapper" showcard={this.state.showCard}>
                {!this.state.submitBtn ?
                  uniqueResults.map((results, index) => (
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
                  uniqueResults.map((results, index) => (
                    <SavedCards
                      key={index}
                      user={this.state.user}
                      image={results.image}
                      recipeName={results.name}
                      recipeLink={results.recipelink}
                      recipeIngredients={results.ingredients}
                      deleteRecipe={() => this.deleteRecipes(results._id)}>
                    </SavedCards>


                  ))
                }
              </div>


            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default withMultiContext({ appContext: AppContext })(EdamamSearch);
