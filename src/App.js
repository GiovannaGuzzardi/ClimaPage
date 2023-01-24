import React, { useState } from 'react'

//criei um objeto que seta os valores entregues pela api
const climaObj = {
  "Mist": "Névoa", "Smoke": "Fumaça", "Haze": "Nevoeiro", "Sand": "Areia", "Dust": 'Pó', "Fog": "Névoa", "Ash": "Cinzas", "Squall": "Nevasca", "Tornado": "Tornado", "Clouds": "Nuvem", "Clear": "Claro", "Snow": "Neve", "Rain": "Chuva", "Drizzle": "Garoa", "Thunderstorm": "Tempestade"
}

const Tempo = (d) => {
  let g = climaObj[d]
  return g
}



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
    //apos pressionar enter 
    if (evt.key === "Enter") {
      // fetch é uma solicitação de busca simples
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        // then é uma promessa que recebe uma função como parametro 
        // retorna o objeto como json
        .then(res => res.json())
        // retorna todos os dados do objeto atraves do result
        .then(result => {
          // setClima recebe o objeto entregue pela api 
          setClima(result);
          //setquery volta a ter valor nulo
          setQuery('');
          //visualização das informações entregues
          console.log(result)
        })
    }
  }

  const DataHoje = (d) => {
    //fazendo com que o mes e diaSemana fique igual ao que quero
    let mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "junho", "Julho", "Agosto", "Setembro", "Outubro", "Outrubro", "novembro", "Dezembro"];
    let diaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];

    let dia = diaSemana[d.getDay()];
    let diaMes = d.getDate();
    let mesFinal = mes[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia} ${diaMes} ${mesFinal} ${ano}`
  }

  //se o nome for null o texto é outro
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
              //faço com que setQuery receba o valor escrito
              onChange={e => setQuery(e.target.value)}
              //faço com que o value receba o valor escrito por query
              value={query}
              //evento que recebe uma função (trocar)
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
      <div className={(clima.main !== undefined) ? ((clima.main.temp > 15) ? 'App quente' : 'App') : 'App'}>
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
            <div className="clima">{Tempo(clima.weather[0].main)}</div>
            <div className="climaIcon"> <img src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} alt='' /> </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
