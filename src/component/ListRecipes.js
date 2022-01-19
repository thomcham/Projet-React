/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import DetailsRecipe from "./DetailsRecipe";
import { LoadingOutlined } from "@ant-design/icons";

function ListRecipes(props) {
  const { setActiveComponent } = props;
  const apikey = "13e4cb48cd9c4aa0b91d998d61ff84ae";

  const [randomRecipe, setRandomRecipe] = useState({ recipe: [] });
  const [searchedRecipes, setSearchedRecipes] = useState({ recipes: [] });
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(<LoadingOutlined />);
    getRandomRecipe();
  }, [state]);

  function getRandomRecipe() {
    fetch("https://api.spoonacular.com/recipes/random?apiKey=" + apikey)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setRandomRecipe({ ...randomRecipe, recipe: result.recipes });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function searchRecipes() {
    var search = document.getElementById("search").value;
    var number = document.getElementById("number").value
      ? document.getElementById("number").value
      : 10;

    fetch(
      "https://api.spoonacular.com/recipes/autocomplete?number=" +
        number +
        "&query=" +
        search +
        "&apiKey=" +
        apikey
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        var stringId = "";
        result.map((elem) => (stringId = stringId.concat(elem.id).concat(",")));
        getAllInfo(stringId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllInfo(string) {
    fetch(
      "https://api.spoonacular.com/recipes/informationBulk?ids=" +
        string +
        "&apiKey=" +
        apikey
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setSearchedRecipes({ ...searchedRecipes, recipes: result });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const showRecipe = (recipe) => {
    return (
      <div onClick={() => setActiveComponent(<DetailsRecipe id={recipe.id} />)}>
        <h3>{recipe.title ? recipe.title : null}</h3>
        <img
          src={
            recipe.image
              ? recipe.image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png"
          }
        ></img>
      </div>
    );
  };

  const displayChoice = () => {
    if (searchedRecipes.recipes.length > 1) {
      return (
        <div>
          <h1>Recette recherchées</h1>
          {searchedRecipes.recipes.map((recipe) => showRecipe(recipe))}
        </div>
      );
    } else {
      return (
        <div>
          <h1>Idée de recette</h1>
          {showRecipe(randomRecipe.recipe[0])}
        </div>
      );
    }
  };

  if (loading) {
    return loading;
  } else {
    return (
      <div>
        <div>
          <div>
            <label>Rechercher une recette : </label>
            <input type="text" name="search" id="search" required />
            <br />
            <label>Nombre de recettes à afficher : </label>
            <input type="number" id="number" name="number" min="1" max="50" />
            <br />
            <button onClick={() => searchRecipes()}>Recherche</button><br />
            <button onClick={() => {getRandomRecipe(); setSearchedRecipes({ ...searchedRecipes, recipes: [] })}}>Recette aléatoire</button>
          </div>
          {displayChoice()}
        </div>
      </div>
    );
  }
}

export default ListRecipes;
