const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
//Leer la data
const data = JSON.parse(fs.readFileSync('National_Obesity_By_State.geojson', 'utf8'));

app.get('/', (req, res) => {
    res.send('III. Creación de servicio API Rest base');
  });

  
app.get('/states', (req, res) => {
    const states = data.features.map(feature => ({
      id: feature.properties.FID,
      name: feature.properties.NAME,
    }));
    res.json(states);
  });
  

// a. Nombres de estados e ID´S
app.get('/states', (req, res) => {
  const states = data.features.map(feature => ({
    id: feature.properties.FID,
    name: feature.properties.NAME,
  }));
  res.json(states);
});

// b. Indice de obesidad
app.get('/state/:id', (req, res) => {
  const stateId = parseInt(req.params.id);
  const state = data.features.find(feature => feature.properties.FID === stateId);
  
  if (state) {
    const stateInfo = {
      id: state.properties.FID,
      name: state.properties.NAME,
      obesityIndex: state.properties.Obesity,
      area: state.properties.SHAPE_Area,
      coordinates: state.geometry.coordinates,
    };
    res.json(stateInfo);
  } else {
    res.status(404).json({ message: 'State not found' });
  }
});

// c. Data resumida
app.get('/summary-data', (req, res) => {
  const obesityIndices = data.features.map(feature => feature.properties.Obesity);
  const stateWithHighestObesity = data.features.reduce((max, state) => (state.properties.Obesity > max ? state : max), data.features[0]);
  const stateWithLowestObesity = data.features.reduce((min, state) => (state.properties.Obesity < min ? state : min), data.features[0]);
  const averageObesityIndex = obesityIndices.reduce((sum, index) => sum + index, 0) / obesityIndices.length;

  const summary = {
    stateWithHighestObesity: {
      name: stateWithHighestObesity.properties.NAME,
      obesityIndex: stateWithHighestObesity.properties.Obesity,
    },
    stateWithLowestObesity: {
      name: stateWithLowestObesity.properties.NAME,
      obesityIndex: stateWithLowestObesity.properties.Obesity,
    },
    averageObesityIndex,
  };

  res.json(summary);
});

app.listen(PORT, () => {
  console.log(`Server listening on port https://localhost:${PORT}`);
});
