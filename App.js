import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import './style.css';


import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  async function handleSearch(){


    if(input === ''){
      alert("preencha algum cep!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch{
      alert("ops... Esse cep não existe :(");
      setInput("")

    }
  }

  return (
    <div className="container">
       <h1 className="title">BuscaCEP</h1>

       <div className="containerInput">
          <input 
           type="text"
           placeholder="seu cep é..."
           value={input}
           onChange={(e) => setInput(e.target.value) }
           />
          <button className="buttonSearch" onClick={handleSearch}>
            <BiSearchAlt size={30} color='#4f8aa8'/>
          </button>
       </div>

       {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>

       )}

    </div>
  );
}

export default App;
