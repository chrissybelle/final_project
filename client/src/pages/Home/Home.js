import React from "react";
import Jumbotron from "../../components/Jumbotron"
import CardHome from "../../components/CardGeneric";
import Wrapper from "../../components/Wrapper";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";


// import { Col, Row, Container } from "../../components/Grid";
let searchResults = [];
let cardID = [];

const options = ["cookies", "brownies", "pizza", "chicken wings", "turkey","pasta"]
let rand = Math.floor(Math.random() * 6) + 1  
let searchQuery = options[rand]


class Home extends React.Component {
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
    }

    // When the component mounts, load featured recipe
    componentDidMount() {
        API.searchEdamam(searchQuery)
            .then(res => {
                searchResults = res.data.hits;
                for (let i = 0; i < 3; i++) {
                    cardID.push(searchResults[i]);
                };
                console.log(cardID)
                this.setState({
                    showCard: true
                })
            }
                // this.setState({ recipeResults: res.data.hits, image: res.data.hits[0].recipe.image, recipeName: res.data.hits[0].recipe.label, recipeLink: res.data.hits[0].recipe.url })
            )
            .catch(err => console.log(err));

    }


    render() {
        return (
            <div>
                <Jumbotron />
                <Container fluid>

                    <Row>

                        <Col size="md-9">
                            <Wrapper showCard={this.state.showCard}>
                                {cardID.map((results, index) => (
                                    <CardHome
                                        image={results.recipe.image}
                                        recipeName={results.recipe.label}
                                        recipeLink={results.recipe.url}
                                        recipeIngredients={results.recipe.ingredientLines}
                                    />
                                ))}
                            </Wrapper>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default Home;