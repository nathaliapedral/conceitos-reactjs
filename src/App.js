import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('/repositories').then( response =>{
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
        "title": `New Repository ${Date.now()}`,
        "url":`https://github.com/nathaliapedral/repository-${Date.now()}`,
        "techs": ["Javascript","HTML", "CSS"]
    });
    setRepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(() => {
      const newRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(newRepositories);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository => 
          <li key={repository.id}> {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
