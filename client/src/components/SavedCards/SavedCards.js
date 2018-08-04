import React from "react";
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SavedCards.css";
import DeleteBtn from "../../components/DeleteBtn";





class ListItem extends React.Component {


  render () {
    const { image, recipeName, recipeLink, deleteRecipe, recipeIngredients } = this.props

    return (
      // fix loading spinner
        <ul className="recipeResults">
          <div className="cardtitle">
            {recipeName}
            <DeleteBtn onClick={deleteRecipe} />
            <br/>
            <a href={recipeLink}>View the full recipe!</a>
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

          </div>

        </ul>
      // )
    );
  }
}

ListItem.propTypes = {
  image: PropTypes.string,
  recipeName: PropTypes.string,
  recipeLink: PropTypes.string,
  showCard: PropTypes.string,
  deleteRecipe: PropTypes.func
}

export default ListItem;
