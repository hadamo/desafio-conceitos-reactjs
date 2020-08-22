import React, {useState, useEffect} from 'react';
import api from './services/api'
import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    //Quando componente é iniciado pega todos repositórios da api
    useEffect( () => {
        api.get('repositories').then(
            response => setRepositories(response.data)
        );
    },[]);

    //Lida com criação de repositório
    async function handleAddRepository() {
        const response = await api.post('repositories', {
            title: "React",
            owner: "hádamo",
            techs: ["react"]
        });

        setRepositories([...repositories,response.data]);
    }

    //Lida com deleção de reposiório
    async function handleRemoveRepository(id) {
        await api.delete(`repositories/${id}`);
        setRepositories(repositories.filter( repository => 
            repository.id !== id 
        ));
    }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( repository => 
                <li key={repository.id}>
                    {repository.title}
                    <button onClick={() => handleRemoveRepository(repository.id)}>
                        Remover
                    </button> 
                </li>
        )}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
