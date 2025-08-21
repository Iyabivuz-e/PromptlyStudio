const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const codegenRoutes = require('./controllers/codegen');
const figmaRoutes = require('./controllers/figma');
const exportRoutes = require('./controllers/export');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/codegen', codegenRoutes);
app.use('/api/figma', figmaRoutes);
app.use('/api/export', exportRoutes);

app.get('/', (req, res) => {
  res.send('API Express is running 🚀');
});

module.exports = app;
