import React, {useState,useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories,setRepositories ] = useState([]);

  useEffect(()=>{
    api.get('/repositories')
    .then(res=>res.data)
    .then(data=>{
      setRepositories(data);
    })
    .catch(err=>{
      alert('Error fetching data.')
    })  

  },[])

  async function handleAddRepository() {
    const newRepository = {
      title:`Repositório criado em ${Date.now()}`,
      url:'URL do repositório',
      techs:[
        'Javascript',
        'PHP'
      ]
    }
    api.post('/repositories',newRepository)
    .then(res=>res.data)
    .then(data=>{
      setRepositories([...repositories,data])
    })
    .catch(err=> alert('Error when creating new repository.'))
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex(repo=>repo.id===id);
    if(index < 0)  return false;
    var newRepositories = repositories;
    newRepositories.splice(index,1);
    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository=>(
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
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
