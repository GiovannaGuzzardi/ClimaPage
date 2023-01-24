import React, { useState } from 'react'

const api = {
  key: "f59f66bf99772bf83c2e8fc51e313de1",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  // consulta é igual ao seu estado que pode ser uma string, query é o dado recebido
  const [query, setQuery] = useState('');
  // vamos definir o clima que sera igual a um objeto
  const [clima, setClima] = useState({});
  // evt é o evento de uma função arrow

  const search = evt => {
    if (evt.key === "Enter") {
      // fetch é uma solicitação de busca simples
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        // then é uma promessa que recebe uma função como parametro 
        // se der errado
        .then(res => res.json())
        // se der certo 
        .then(result => {
          setClima(result);
          setQuery('');
          console.log(`Clima : ${setClima}`)
          console.log(result)
        })
    }
  }

  const DataHoje = (d) => {
    let mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "junho", "Julho", "Agosto", "Setembro", "Outubro", "Outrubro", "novembro", "Dezembro"];
    let diaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];

    let dia = diaSemana[d.getDay()];
    let diaMes = d.getDate();
    let mesFinal = mes[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia} ${diaMes} ${mesFinal} ${ano}`
  }
  const cidade = {
    nomeCidade: clima.name || 'Pesquise uma localização valida',
  }

  if (!clima.name) {
    return (
      <div className="App">
        <main>
          <div className="pesquisa">
            <input
              type="text"
              className="barraDePesquisa"
              placeholder="Pesquisa..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search} />
          </div>
          <div className="localBox">
            <div className="localizacao">{cidade.nomeCidade}</div>
            <div className="data">{DataHoje(new Date())}</div>
          </div>
        </main>
      </div>
    )
  } else {

    return (
      <div className={(typeof clima.main != undefined) ? ((clima.main.temp > 15) ? 'App quente' : 'App') : 'App'}>
        <main>
          <div className="pesquisa">
            <input
              type="text"
              className="barraDePesquisa"
              placeholder="Pesquisa..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search} />
          </div>
          <div className="localBox">
            <div className="localizacao">{cidade.nomeCidade}, {clima.sys.country}</div>
            <div className="data">{DataHoje(new Date())}</div>
          </div>
          <div className="tempoBox">
            {/* Math.round() retorna o valor de um número arredondado para o inteiro mais proximo. */}
            <div className="temperatura">{Math.round(clima.main.temp)}°c</div>
            <div className="clima">{clima.weather[0].main}</div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
