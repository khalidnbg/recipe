import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setactiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const apiKey = "df9cd7b9bce84d079afc785ae95f3186";
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };
  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} width={350} alt="" />
      </div>
      <Info>
        <div style={{ display: "flex" }}>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setactiveTab("instructions")}>
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setactiveTab("ingredients")}>
            Ingredients
          </Button>
        </div>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  gap: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    gap: 3rem;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }
  h2 {
    margin-bottom: 2rem;
  }
  h3 {
    text-align: center;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
    text-align: center;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
  ul {
    margin-top: 2rem;
    list-style-type: none;
  }
`;

const Button = styled.div`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  margin-top: 2rem;
`;

export default Recipe;
