import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { GlobalStyle } from "./Components/GlobalStyle.js";

const Body = styled.main`
  background-color: #c1c1c1;
  height: 100vh;

  nav {
    height: 10rem;
    background-color: #11112e;

    h1 {
      padding-top: 1.5rem;
      text-align: center;
      font-size: 3rem;
      color: #c1c1c1;
    }

    form {
      margin-top: 1rem;
      display: flex;
      justify-content: center;

      section {
        display: flex;
        gap: 1rem;

        input {
          width: 20rem;
          height: 3rem;
          background-color: #c1c1c1;
          padding-left: 1rem;
          border-radius: 25px;
        }

        button {
          background: #c1c1c1;
          width: 3rem;
          text-justify: center;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }
`;

const Wrapper = styled.section`
  padding: 2rem;
  margin: 2rem 30rem 0 30rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  h2 {
    font-size: 1.5em;
    color: #11112e;
  }
`;

function App() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");

  return (
    <>
      <GlobalStyle />
      <Body>
        <nav>
          <h1>HUBusca</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              axios
                .get(`https://api.github.com/users/${name}`)
                .then((response) => setUser(response.data));
            }}
          >
            <section>
              <input
                placeholder="Search..."
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
              <button>Search</button>
            </section>
          </form>
        </nav>

        <Wrapper>
          <a href={user.html_url}>
            <img src={user.avatar_url} alt="" />
          </a>
          <div>
            <h2>{user.name}</h2>
            <h2>{user.login}</h2>
            <p>{user.location}</p>
          </div>
        </Wrapper>
      </Body>
    </>
  );
}

export default App;
