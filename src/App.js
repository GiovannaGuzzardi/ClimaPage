import React, { useState } from "react";

//criei um objeto que seta os valores entregues pela api
const climaObj = {
  Mist: "Névoa",
  Smoke: "Fumaça",
  Haze: "Nevoeiro",
  Sand: "Areia",
  Dust: "Pó",
  Fog: "Névoa",
  Ash: "Cinzas",
  Squall: "Nevasca",
  Tornado: "Tornado",
  Clouds: "Nuvem",
  Clear: "Claro",
  Snow: "Neve",
  Rain: "Chuva",
  Drizzle: "Garoa",
  Thunderstorm: "Tempestade",
};

// tempo recebe uma resposta da api em in e retorna a correspondencia contida em climaObj para a let g
const Tempo = (d) => {
  let g;
  (g = climaObj[d]) || (g = d);
  return g;
};

// não fazer aqui e sim no env que fica fora de visão do usuario, como ? sla
const api = {
  key: "f59f66bf99772bf83c2e8fc51e313de1",
  base: "http://api.openweathermap.org/data/2.5/",
};

// renderError recebe uma mensagem de erro da api,
// procura uma correspondencia em ErrosObj e retorna a mesma
// se não houver correlato no objeto retorna erro generico 
const renderError = (erro) => {
  const ErrosObj = {
    "city not found": "Cidade não foi encontrada",
    "vazio": "Por favor escreva alguma coisa"
  };
  return ErrosObj[erro] || "Aconteceu um erro!";
};

function App() {
  // consulta é igual ao seu estado que pode ser uma string, query é o dado recebido
  const [query, setQuery] = useState("");
  // vamos definir o clima que sera igual a um objeto
  const [clima, setClima] = useState({});
  // retornos de erros
  const [error, setError] = useState("");
  // tempo de espera
  const [loading, setLoading] = useState(false);

  // evt é o evento de uma função arrow

  const search = (evt) => {
    //apos pressionar enter
    setError("");
    if (evt.key === "Enter") {
      // if (evt.target.value === "") return;
      if (evt.target.value === "") return alert(renderError("vazio"))
      // fetch é uma solicitação de busca simples
      setLoading(true);
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        // then é uma promessa que recebe uma função como parametro
        // retorna o objeto como json
        .then((res) => res.json())
        // retorna todos os dados do objeto atraves do result
        .then((result) => {
          // setLoaging inicial com valor falso pois posteriormente definimos que o input depende disso
          setLoading(false);
          // se a resposta da api tiver um status cod diferente de 200 consideramos que houve um erro
          // logo se houver um erro setError recebe o return de renderError(que traduz o erro) que tem como props o retorno da api
          if (result.cod !== 200) {
            setError(renderError(result.message));
            return;
          }
          // para visualização da api
          console.log(result)
          // setClima recebe o objeto entregue pela api
          setClima(result);
          //setquery volta a ter valor nulo
          setQuery("");
        });
    }
  };

  const DataHoje = (d) => {
    //fazendo com que o mes e diaSemana fique igual ao que quero
    let mes = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Outrubro",
      "novembro",
      "Dezembro",
    ];
    let diaSemana = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sabado",
      "Domingo",
    ];

    let dia = diaSemana[d.getDay()];
    let diaMes = d.getDate();
    let mesFinal = mes[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia} ${diaMes} ${mesFinal} ${ano}`;
  };

  //se o nome for null o texto é outro
  // clima.main?.temp ao inserir o ? estou conferindo se main existe antes de realizar a operação
  return (
    <div className={clima.main?.temp > 15 ? "App quente" : "App"}>
      <main>
        <div className="pesquisa">
          <input
            type="text"
            className="barraDePesquisa"
            placeholder="Pesquisa..."
            // setQuery é igual o valor recebido pelo input
            onChange={(e) => setQuery(e.target.value)}
            // e logo o value é igual a query
            value={query}
            onKeyPress={search} //não achei substituição nem tentei tanto assim tbm
            // disabled significa que ao receber um valor true o imput fica inativo
            disabled={loading}
          />
        </div>
        {/* retorno do error */}
        {error !== "" && <span style={{ color: "red" }}>{error}</span>}
        {/* tratamento de espera */}
        {loading && <span>Carregando...</span>}
        {/*  clima.main &&  true , essa parte acontece somente se clima.main existir*/}
        {clima.main && (
          <>
            <div className="localBox">
              <div className="localizacao">{clima.name},{clima.sys.country}</div>
              <div className="data">{DataHoje(new Date())}</div>
            </div>
            <div className="tempoBox">
              <div className="temperatura">{Math.round(clima.main.temp)}°c</div>
              <div className="clima">{Tempo(clima.weather[0].main)}</div>
              <div className="climaIcon">
                {" "}
                <img
                  src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
                  alt=""
                />{" "}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
