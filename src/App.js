import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        console.log(response.data);
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      title: "Desafio React Desafio",
      url: "https://github.com/PatrickGmailHub/desafio-front-end-reactjs",
      techs: [
        "NodeJs",
        "Express"
      ],
      likes: 0
    });

    setRepositories([ ...repositories, repository.data ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
      .then(() => {
        const filtroRepositories = repositories.filter(f => f.id !== id);
        setRepositories([...filtroRepositories ]);
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (       
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
