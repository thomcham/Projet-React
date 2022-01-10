import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

function DetailsRecipe(props) {
  const { id } = props;
  const apikey = "12bebd1cfafd4868928e9a42e358ab99";

  const [state, setState] = useState({ recipe: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(<LoadingOutlined />);
    fetch(
      "https://api.spoonacular.com/recipes/informationBulk?ids=" +
        id +
        "&apiKey=" +
        apikey
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setState({ ...state, recipe: result[0] });
        console.log(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const showIngredients = (item) => {
    return (
      <h3>
        {" "}
        - {item.measures.metric.amount}
        {item.measures.metric.unitShort} {item.name}
      </h3>
    );
  };

  const showSteps = (item) => {
    return (
      <h3>
        {item.number}) {item.step}
      </h3>
    );
  };

  const showDiets = (item) => {
    return <h3>- {item}</h3>;
  };

  if (loading) {
    return loading;
  } else {
    return (
      <div>
        <h1>{state.recipe.title}</h1>
        <img
          src={
            state.recipe.image
              ? state.recipe.image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png"
          }
        ></img>
        <br />
        <br />

        <div>
          <h2>Nombre de portions :</h2>
          <h3>{state.recipe.servings}</h3>
        </div>
        <br />
        <div>
          <h2>Temps de preparation :</h2>
          <h3>{state.recipe.readyInMinutes + " min"}</h3>
        </div>
        <br />
        <div>
          <h2>Ingredients :</h2>
          {state.recipe.extendedIngredients.map((ingredient) =>
            showIngredients(ingredient)
          )}
        </div>
        <br />
        <div>
          <h2>Étapes de préparation :</h2>
          {state.recipe.analyzedInstructions[0].steps.map((step) =>
            showSteps(step)
          )}
        </div>
        <br />
        <div>
          <h2>Regime(s) alimentaire(s) :</h2>
          {state.recipe.diets.map((item) => showDiets(item))}
        </div>
      </div>
    );
  }
}

export default DetailsRecipe;
