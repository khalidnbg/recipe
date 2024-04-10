import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCusine = async (name) => {
    const apiKey = "0f8e41c886954c91ba33c8511724019d";
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCusine(params.type);
  }, [params]);

  if (cuisine?.length === 0) {
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
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      {cuisine.map((item) => (
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

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 3rem;
  justify-content: center; /* Center align the cards */
  padding: 0 1rem; /* Add some padding for responsiveness */
`;

const Card = styled.div`
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

export default Cuisine;
