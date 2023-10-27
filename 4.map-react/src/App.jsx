import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

function App() {
  const [summary, setSummary] = useState(null);
  const [geojson, setGeoJSON] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
// Obtener datos GeoJSON
const geojsonResponse = await axios.get('http://localhost:3000/states');
const geojsonData = Array.isArray(geojsonResponse.data)
  ? geojsonResponse.data.map(state => ({
      type: 'Feature',
      properties: {
        id: state.id,
        name: state.name,
      },
      geometry: {
        type: 'MultiPolygon', 
        coordinates: [ -106.623454789999982, 31.914039152000043 ],
      },
    }))
  : null;

if (Array.isArray(geojsonData)) {
  const coloredGeojson = geojsonData.map(state => {
    // Asignar color según el índice de obesidad (ajusta según sea necesario)
    state.properties.color = getColor(state.properties.Obesity);
    return state;
  });
  setGeoJSON(coloredGeojson);
} else {
  console.error('GeoJSON data is not in the expected format:', geojsonResponse.data);
}
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Función para asignar colores según el índice de obesidad
  const getColor = (obesityIndex) => {
    return obesityIndex > 21 ? 'red' : obesityIndex > 10 ? 'yellow' : 'green';
  };

  return (
    <div className="App">
      <h1>KPI de Resumen</h1>
      {summary && (
        <div>
          <p>Mayor Índice de Obesidad: {summary.stateWithHighestObesity.name} - {summary.stateWithHighestObesity.obesityIndex}</p>
          <p>Menor Índice de Obesidad: {summary.stateWithLowestObesity.name} - {summary.stateWithLowestObesity.obesityIndex}</p>
          <p>Índice de Obesidad Promedio: {summary.averageObesityIndex}</p>
        </div>
      )}

      <h2>Mapa de EE. UU.</h2>
      {geojson && (
        <MapContainer center={[37.8, -96]} zoom={4} style={{ height: '400px', width: '80%', margin: 'auto' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON data={geojson} style={(feature) => ({
            fillColor: feature.properties.color,
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
          })} />
        </MapContainer>
      )}
    </div>
  );
}

export default App;
