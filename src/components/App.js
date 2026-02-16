import React, {useState} from "react"
import Header from "./Header.js"
import Footer from "./Footer.js"
import './App.css';

function App() {
  const [cidade, setCidade] = useState("")
  const [informacoes, setInformacoes] = useState(null)
  const [erro, setErro] = useState(null)

  const chaveApi = "f914b76d9e143dfa64dd1e1eb94bf720"
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt-br&units=metric&appid=${chaveApi}`
  function capturarInput(e) {
    setCidade(e.target.value)
  }

  async function enviarFormulariuo(e) {
    e.preventDefault()
    try {
      const resposta = await fetch(api)
      const json = await resposta.json()
      if(json.cod === 200) {
        setInformacoes(json)
        setErro(null)
      } else {
        setInformacoes(null)
        setErro("Digite uma cidade válida!")
      }
    } catch(err) {
      setErro("Erro ao buscar os dados!")
      setInformacoes(null)
    }
  }

  return (
    <div className="main">
      <Header />
      <div className="card">
        <form onSubmit={enviarFormulariuo} method="post">
            <input onChange={capturarInput} required type="text" value={cidade} />
            <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
        {erro !== null? <p>{erro}</p>: null}
        {informacoes ? <div className="infos">
          <div className="info-principal">
            <div>
              <h2>{informacoes.name}</h2>
              <p>{informacoes.main.temp}°</p>
            </div>
            <div className="campo-imagem">
              <img src={`http://openweathermap.org/img/wn/${informacoes.weather[0].icon}.png`} />
            </div>
          </div>
          <div className="infos-secundarias">
            <div className="info-secundaria">
              <h3>Max-Temp</h3>
              <div>
                <i className="fa-solid fa-temperature-full"></i>
                <p>{informacoes.main.temp_min}°</p>
              </div>
            </div>
            <div className="info-secundaria">
              <h3>Min-Temp</h3>
              <div>
                <i className="fa-solid fa-temperature-full"></i>
                <p>{informacoes.main.temp_max}°</p>
              </div>
            </div>
          </div>
        </div> : null}
      </div>  
      <Footer />
    </div>
  );
}

export default App;
