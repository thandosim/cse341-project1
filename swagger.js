
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'list of contacts with CRUD operations'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js', './routes/contacts.js']; // or wherever your routes are defined

swaggerAutogen(outputFile, endpointsFiles, doc);
