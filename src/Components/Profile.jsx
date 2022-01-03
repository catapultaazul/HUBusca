import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { format } from "date-fns";

import { BiUserCircle, BiMap } from "react-icons/bi";

const Body = styled.main`
  background-color: #1a202c;
  max-width: 100%;
  overflow: hidden;

  nav {
    height: 7rem;
    background-color: #3ff877;
    box-shadow: 0px 0px 12px #000000c3;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      text-align: center;
      font-size: 3rem;
      color: #1a202c;
    }
  }

  main {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    width: 90%;
    margin: 3rem auto;
    color: #32a053;

    section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      justify-content: center;
      align-items: center;
      padding-top: 2rem;
      gap: 1.5rem;
      padding-bottom: 1.3rem;
      border-bottom: 1px solid #3ff877;

      .bio {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;

        .container {
          display: flex;
          gap: 0.2rem;
          align-items: center;
          justify-content: center;
        }

        .icon {
          margin-top: 6px;
          color: #6dcc89;
        }

        .secondary {
          color: #6dcc89;
        }
      }

      .avatar {
        display: flex;
        justify-content: center;

        img {
          width: 9rem;
          height: 9rem;
          border-radius: 50%;
        }
      }
    }

    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;

      .reposGrid {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;

        a {
          text-decoration: none;
          color: black;
          display: flex;

          .repo {
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
            margin-bottom: 1rem;
            padding: 1rem;
            line-height: 1.5rem;
            border-bottom: 0.25rem solid #3ff877;
            width: 100%;
            border-radius: 20px;

            .title {
              border-bottom: 1px solid #3ff877;
              display: flex;
              justify-content: center;
              color: #32a053;
              margin-bottom: 1rem;
            }

            p {
              margin-bottom: 0.75rem;
              text-align: justify;
              color: #3ff877;
            }
          }
        }
      }
    }
  }
`;

function Profile() {
  let { name } = useParams();
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${name}`)
      .then((response) => setUser(response.data));
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${name}/repos`)
      .then((response) => setRepos(response.data));
  }, []);

  return (
    <Body>
      <nav>
        <a href="/">
          <h1>HUBusca</h1>
        </a>
      </nav>

      <main>
        <section>
          <div className="avatar">
            <img src={user.avatar_url} alt="" />
          </div>
          <div className="bio">
            <h3>{user.name}</h3>
            <div className="container">
              <span className="icon">
                <BiUserCircle />
              </span>{" "}
              <h3>{user.login}</h3>
            </div>
            {typeof user.location === "string" ? (
              <div className="container">
                <span className="icon">
                  <BiMap />
                </span>{" "}
                <h3>{user.location}</h3>
              </div>
            ) : (
              ""
            )}
            <h3>
              <span className="secondary">ID </span>
              {user.id}
            </h3>
            <h3>
              {user.followers} <span className="secondary">Seguidores</span>
            </h3>
            <h3>
              {user.public_repos}{" "}
              <span className="secondary">Repositórios </span>
            </h3>
          </div>
        </section>

        <article>
          <h2>Repositórios</h2>
          <div className="reposGrid">
            {repos.map((repo) => {
              const created = format(new Date(repo.created_at), "dd/MM/yyyy");
              const pushed = format(new Date(repo.pushed_at), "dd/MM/yyyy");
              return (
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={repo.name}
                >
                  <div className="repo">
                    <div className="title">
                      <h3>{repo.name}</h3>
                    </div>
                    <div className="repo-info">
                      {repo.language ? <p>Linguagem: {repo.language}</p> : ""}
                      {repo.description ? (
                        <p>Descrição: {repo.description}</p>
                      ) : (
                        ""
                      )}

                      <p>Criado em: {created} </p>
                      <p>Último push: {pushed}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </article>
      </main>
    </Body>
  );
}

export default Profile;
