import React from "react";
import CardBtn from "../CardBtn";
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Card.css";



class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnlike: false
    }
  }

  handleCardBtnClick = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      btnlike: !prevState.btnlike
    }
));
    console.log("LIKE: " + this.state.btnlike); 
  }



  render() {
    const { image, recipeName, recipeLink, recipeIngredients, handleBtnClick, like, index, marker } = this.props



    return (
      // fix loading spinner
      <div>
        <ul className={`recipeResults ${index}`}>
          <div className="cardtitle">
            {recipeName}
            <br />
            <a href={recipeLink} target="_blank">View the full recipe!</a>
          </div>

          <div
            className="card"
            style={{
              backgroundImage: image ? `url(${image})` : "none"
            }}
          >
            <ul className="ingredientList">
              <p className="ingredientHeader">Ingredients</p>
              {recipeIngredients.map((ingredients, index) => (
                <li key={index}> {ingredients} </li>
              ))}
            </ul>

            {/* {!image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />} */}

          </div>

          <div className="cardbottom">

          { {marker} ?

            <CardBtn
              // className={ {like} ? "liked" : "heartBtn"}
              className={`heartBtn ${like}`}
              style={{ opacity: image ? 1 : 0 }}
              onClick={handleBtnClick}
              // onClick={this.handleCardBtnClick}
 
            >
              <i 
                className={`fas fa-heart ${like} ${this.state.btnlike}`} 
                data-value={recipeLink}
                data-like={like} 
                data-image={image}
                data-recipename={recipeName}
                data-recipelink={recipeLink}
                data-recipeingredients={recipeIngredients}
                data-liketracker={this.state.btnlike}
                onClick={this.handleCardBtnClick}
              ></i>
            </CardBtn>
            :
            "" 
          }


          </div>

        </ul>
      </div>
      // )
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  recipeName: PropTypes.string,
  recipeLink: PropTypes.string,
  recipeIngredients: PropTypes.array,
  // showCard: PropTypes.bool,
  handleBtnClick: PropTypes.func,
  like: PropTypes.string,
  marker: PropTypes.bool
  //likeTracker: PropTypes.string
}

export default Card;
