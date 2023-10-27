import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PieChart from './PieChart';
import VerticalBarChart from './VerticalBarChart';
import LineChart from './LineChart';
import './App.css';

function App() {
  const [originalData, setOriginalData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pkgstore.datahub.io/core/co2-fossil-by-nation/fossil-fuel-co2-emissions-by-nation_json/data/2b4874bb29c461a614e92773956ad573/fossil-fuel-co2-emissions-by-nation_json.json');
        setOriginalData(response.data);
      } catch (error) {
        console.error('Error al obtener datos JSON:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar los datos según las condiciones
    if (originalData) {
      const filtered = originalData.filter(item => {
        const meetsStartDate = !startDate || item.Year >= startDate;
        const meetsEndDate = !endDate || item.Year <= endDate;
        const meetsCountry = !selectedCountry || item.Country.toLowerCase().includes(selectedCountry.toLowerCase());

        return meetsStartDate && meetsEndDate && meetsCountry;
      });

      setFilteredData(filtered);
      setShowAlert(true);
    }
  }, [startDate, endDate, selectedCountry, originalData]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const uniqueCountries = originalData
  ? [...new Set(originalData.map(item => item.Country))]
  : [];

  return (
    <>
      <h1>Visualizaciones de gráficos</h1>
      <div className="card">
        {/* Fila 1 */}
        <div className="row">
          <div className="itemChart">
            <h2>Gráfico de Pastel</h2>
            {filteredData ? <PieChart data={filteredData} /> : <p>Cargando datos...</p>}
          </div>
          <div className="itemChart">
            <h2>Gráfico de Barras</h2>
            {filteredData ? <VerticalBarChart data={filteredData} /> : <p>Cargando datos...</p>}
          </div>
          <div className="filters">
            <h2>Filtros</h2>
            <div>
              <label>Año Inicial: </label>
              <input type="text" pattern="\d{4}" onChange={handleStartDateChange} placeholder="YYYY" />
            </div>
            <div>
              <label>Año Final: </label>
              <input type="text" pattern="\d{4}" onChange={handleEndDateChange} placeholder="YYYY" />
            </div>
            <div>
              <label>País: </label>
              <select onChange={handleCountryChange}>
                <option value="">Todos los países</option>
                {uniqueCountries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={() => setShowAlert(false)}>Aplicar filtros</button>
            {showAlert && <p>¡Filtros aplicados con éxito!</p>}
          </div>
        </div>
        <div className="row">
          <div className="itemChart">
            <h2>Gráfico de Líneas</h2>
            {filteredData ? <LineChart data={filteredData} /> : <p>Cargando datos...</p>}
          </div>
        </div>
      </div>
    </>
  );
  
}

export default App;
