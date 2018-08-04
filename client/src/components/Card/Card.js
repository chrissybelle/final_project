import React from "react";
import CardBtn from "../CardBtn";
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Card.css";



class Card extends React.Component {

  render() {
    const { image, recipeName, recipeLink, recipeIngredients, handleBtnClick, like, save, index } = this.props

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

            <CardBtn
              // className={ {like} ? "liked" : "heartBtn"}
              className={`heartBtn ${like}`}
              style={{ opacity: image ? 1 : 0 }}
              onClick={this.props.handleBtnClick}
 
            >
              <i 
                className={`fas fa-heart ${like}`} 
                data-value="heart" 
                data-like={like} 
                data-image={image}
                data-recipename={recipeName}
                data-recipelink={recipeLink}
                data-recipeingredients={recipeIngredients}

              ></i>
            </CardBtn>

            <CardBtn
              // className={ {save} ? "saved" : "bookmarkBtn"}
              className={`bookmarkBtn ${save}`}
              style={{ opacity: image ? 1 : 0 }}
              onClick={this.props.handleBtnClick}
              save={save}
            >
              <i 
                className={`fas fa-bookmark ${save}`} 
                data-value="bookmark"
                data-save={save} 
                data-image={image}
                data-recipename={recipeName}
                data-recipelink={recipeLink}
                data-recipeingredients={recipeIngredients}

              ></i>
            </CardBtn>



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
  save: PropTypes.string
}

export default Card;
