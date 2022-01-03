import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = styled.main`
  background-color: #1a202c;
  overflow: hidden;

  nav {
    height: 11rem;
    background-color: #3ff877;
    box-shadow: 0px 0px 12px #000000c3;

    h1 {
      padding-top: 1.5rem;
      text-align: center;
      font-size: 3rem;
      color: #1a202c;
    }

    form {
      margin-top: 1rem;
      display: flex;
      justify-content: center;

      section {
        display: flex;
        gap: 1rem;

        input {
          width: 15rem;
          height: 3rem;
          background-color: #1a202c;
          padding-left: 1rem;
          border-radius: 25px;
          border: none;
          color: #3ff877;
        }

        button {
          background: #1a202c;
          width: 3rem;
          text-justify: center;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          color: #3ff877;

          span {
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
`;

const Wrapper = styled.section`
  padding: 1.5rem;
  margin: 2rem auto;
  width: 23rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
  border-radius: 20px;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  h2 {
    font-size: 1rem;
    color: #3ff877;
    margin-bottom: 0.5rem;
  }

  P {
    color: #3ff877;
  }
`;

const History = styled.section`
  h1 {
    color: #3ff877;
    text-align: center;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding-bottom: 1.5rem;

    .container {
      padding: 1rem;
      margin: 1rem auto;
      width: 18rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
      border-radius: 20px;

      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 1rem;
      }

      h2 {
        font-size: 0.9rem;
        color: #3ff877;
        margin-bottom: 0.3rem;
      }

      P {
        color: #3ff877;
        font-size: 0.9rem;
      }
    }
  }
`;

toast.configure();

function Home() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");

  const [searches, setSearches] = useState([]);

  return (
    <>
      <Body>
        <nav>
          <h1>HUBusca</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              axios
                .get(`https://api.github.com/users/${name}`)
                .then((response) => setUser(response.data))
                .catch(() =>
                  toast.error("Não foi possível encontrar este usuário ☹️", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                );

              axios
                .get(`https://api.github.com/users/${name}`)
                .then((response) =>
                  setSearches((searches) => [response.data, ...searches])
                );

              setName("");
            }}
          >
            <section>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></input>
              <button>
                <span>
                  <BiSearchAlt2 />
                </span>
              </button>
            </section>
          </form>
        </nav>

        {typeof user.name === "string" ? (
          <>
            <Wrapper>
              <a href={`/profile/${user.login}`}>
                <img src={user.avatar_url} alt="" />
              </a>
              <div>
                <h2>{user.name}</h2>
                <h2>{user.login}</h2>
                <h2>{user.location}</h2>
              </div>
            </Wrapper>

            <History>
              <h1>Histórico de pesquisa</h1>
              <div className="grid">
                {searches.map((search) => {
                  return (
                    <div className="container" key={Math.random() * 6000}>
                      <a href={`/profile/${search.login}`}>
                        <img src={search.avatar_url} alt="" />
                      </a>
                      <div>
                        <h2>{search.name}</h2>
                        <h2>{search.login}</h2>
                        <p>{search.location}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </History>
          </>
        ) : (
          ""
        )}
      </Body>
    </>
  );
}

export default Home;
