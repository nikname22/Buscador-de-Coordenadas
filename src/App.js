import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import "./App.css";

function App() {
  const [coord1, setCoord1] = useState("");
  const [coord2, setCoord2] = useState("");
  const [infos, setInfos] = useState({});
  const [locale, setLocale] = useState({});

  const fetchData = () => {
    axios
      .get(
        "https://raw.githubusercontent.com/fidelizou-me/frontend-test/main/db.json"
      )
      .then((response) => {
        setInfos(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function findCoord() {
    const infoAux = Array.from(infos);
    const info = infoAux.find(
      (info) =>
        info.coordinates &&
        info.coordinates[0] === Number(coord1) &&
        info.coordinates[1] === Number(coord2)
    );

    if (info === null || info === undefined) {
      alert("Coordenadas vazias ou incorretas");
    } else {
      setLocale(info);
    }
  }

  return (
    <div className="App">
      <h1 className="title">Buscador de Coordenadas</h1>
      <div className="flexInput">
        <div className="containerInput">
          <input
            className="coord1"
            type="text"
            placeholder="Digite a coordenada 1"
            value={coord1}
            onChange={(e) => setCoord1(e.target.value)}
          />
        </div>
        <div className="containerInput">
          <input
            className="coord2"
            type="text"
            placeholder="Digite a coordenada 2"
            value={coord2}
            onChange={(e) => setCoord2(e.target.value)}
          />
        </div>
      </div>
      <button className="buttonSearch" onClick={findCoord}>
        <span>Buscar</span> <FiSearch color="#000" size={20} />
      </button>
      {Object.keys(locale).length > 0 && (
        <main className="main">
          <h2>
            Coordenadas: {locale.coordinates[0]}, {locale.coordinates[1]}
          </h2>
          <span>País: {locale.country}</span>
          <span>Estado: {locale.state}</span>
          <span>Cidade: {locale.city}</span>
          <span>Endereço: {locale.address}</span>
        </main>
      )}
    </div>
  );
}

export default App;
