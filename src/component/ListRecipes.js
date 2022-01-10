import React, { useEffect, useState } from "react";
import DetailsRecipe from "./DetailsRecipe";
import { LoadingOutlined } from "@ant-design/icons";

function ListRecipes(props) {
  const { setActiveComponent } = props;
  const apikey = "12bebd1cfafd4868928e9a42e358ab99";

  const [state, setState] = useState({ randomRecipe: [], searchedRecipes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(<LoadingOutlined />);
    fetch("https://api.spoonacular.com/recipes/random?apiKey=" + apikey)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setState({ ...state, randomRecipe: result.recipes });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  function searchRecipes(text) {
    console.log(text)
    fetch(
      "https://api.spoonacular.com/recipes/autocomplete?number=10&query=" +
        text +
        "&apiKey=" + apikey
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setState({ searchRecipes: result.recipes });
        console.log(this.state.searchedRecipes);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const showRecipe = (recipe) => {
    return (
      <div onClick={() => setActiveComponent(<DetailsRecipe id={recipe.id} />)}>
        <h1>Idée de recette</h1>
        <h2>{recipe.title ? recipe.title : null}</h2>
        <img
          src={
            state.randomRecipe[0]
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
            <form onSubmit={() => searchRecipes("cake")}>
              <label for="search">Rechercher une recette: </label>
              <br />
              <input type="text" name="search" id="search" required />
              <br />
              <input type="submit" value="Recherche" />
            </form>
          </div>

          {showRecipe(state.randomRecipe[0])}
        </div>

        <div>
          <h1>Recette recherchées</h1>
          {state.searchedRecipes.map((recipe) => showRecipe(recipe))}

        </div>
      </div>
    );
  }
}

export default ListRecipes;
