import { BrowserRouter, Link } from "react-router-dom";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import styled from "styled-components";
import { CiForkAndKnife } from "react-icons/ci";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Nav>
            <CiForkAndKnife />
            <Logo to="/"> nbg | Deleciouss </Logo>
          </Nav>
          <Search />
          <Category />
          <Pages />
        </BrowserRouter>
      </div>
    </>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster", sans-serif;
`;

const Nav = styled.div`
  padding: 4rem 0;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2.5rem;
  }
`;

export default App;
