import React, {useState} from "react"
import Header from "./Header.js"
import './App.css';

function App() {
  const [cidade, setCidade] = useState("")
  const [informacoes, setInformacoes] = useState(null)

  const chaveApi = "f914b76d9e143dfa64dd1e1eb94bf720"
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt-br&units=metric&appid=${chaveApi}`
  function capturarInput(e) {
    setCidade(e.target.value)
  }

  async function enviarFormulariuo(e) {
    e.preventDefault()
    const resposta = await fetch(api)
    const json = await resposta.json()
    console.log(json)
    setInformacoes(json)
  }

  return (
    <div className="main">
      <Header />
      <div className="card">
            <form onSubmit={enviarFormulariuo} method="post">
                <i className="fa-solid fa-location-dot"></i>
                <input onChange={capturarInput} type="text" value={cidade} />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
            {informacoes ? <div className="infos">
              <div className="info-principal">
                <h2>{informacoes.name}</h2>
                <div className="campo-imagem"></div>
              </div>
              <div className="infos-secundarias">
                <div className="info-secundaria">
                  <p>{informacoes.main.temp}</p>
                </div>
                <div className="info-secundaria">
                  <h3>Max-Temp</h3>
                  <i className="fa-solid fa-temperature-full"></i>
                  <p>{informacoes.main.temp_min}</p>
                </div>
                <div className="info-secundaria">
                  <h3>Min-Temp</h3>
                  <i className="fa-solid fa-temperature-full"></i>
                  <p>{informacoes.main.temp_max}</p>
                </div>
              </div>
            </div> : null}
        </div>  
    </div>
  );
}

export default App;
