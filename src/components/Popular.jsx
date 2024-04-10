import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const apiKey = "0f8e41c886954c91ba33c8511724019d";
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`
      );
      const data = await api.json();

      localStorage.setItem("popular", JSON.stringify(data.recipes));

      setPopular(data.recipes);
    }
  };

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <CardContainer>
        {popular.map((recipe) => (
          <Card key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <p>{recipe.title}</p>
              <img src={recipe.image} alt={recipe.title} />
              <Gradient />
            </Link>
          </Card>
        ))}
      </CardContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 4rem 0rem;
  text-align: center;

  @media (max-width: 768px) {
    margin: 2rem 0rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  width: 25%;

  @media (max-width: 768px) {
    width: 100%;
  }

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
