import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../components/Loader";

const Searched = () => {
  let params = useParams();
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const getSearched = async (name) => {
    const apiKey = "0f8e41c886954c91ba33c8511724019d";
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  if (searchedRecipes?.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20rem",
        }}>
        <h1 style={{ fontSize: "50px" }}>
          <Loader />
        </h1>
      </div>
    );
  }

  return (
    <Grid>
      {searchedRecipes.map((item) => (
        <Card key={item.id}>
          <Link to={`/recipe/${item.id}`}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1em;
  }
`;

export default Searched;
