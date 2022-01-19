import React, { useEffect, useState } from "react";
import DetailsRecipe from "./DetailsRecipe";
import { LoadingOutlined } from "@ant-design/icons";

function ListRecipes(props) {
  const { setActiveComponent } = props;
  const apikey = "1a3ecf21f1264ffbbcfac427d1d2abfd";

  const [randomRecipe, setRandomRecipe] = useState({ recipe: [] });
  const [searchedRecipes, setSearchedRecipes] = useState({ recipes: [] });
  const [state, setState] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(<LoadingOutlined />);
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
  }, [state]);

  function searchRecipes() {
    console.log(document.getElementById("number").value);
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
        console.log(result);
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

  if (loading) {
    return loading;
  } else {
    return (
      <div>
        <div>
          <div>
            <label>Rechercher une recette: </label>
            <br />
            <input type="text" name="search" id="search" required />
            <br />
            <label>Nombre de recettes à afficher : </label>
            <input type="number" id="number" name="number" min="1" max="50" />
            <br />
            <button onClick={() => searchRecipes()}>Recherche</button>
          </div>
          <h1>Idée de recette</h1>
          {showRecipe(randomRecipe.recipe[0])}
        </div>

        <div>
          <h1>Recette recherchées</h1>
          {searchedRecipes.recipes.map((recipe) => showRecipe(recipe))}
        </div>
      </div>
    );
  }
}

export default ListRecipes;
