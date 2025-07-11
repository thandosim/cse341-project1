
const swaggerAutogen = require('swagger-autogen')();
const host = process.env.HOST || 'localhost:3000'; // to make this work in both local and production environments

const doc = {
  info: {
    title: 'Contacts API',
    description: 'list of contacts with CRUD operations'
  },
  host: host,
  schemes: ['http', 'https'], // 'http' for local development, 'https' for production
};

const outputFile = './swagger-output.json';
// const endpointsFiles = ['./routes/index.js', './routes/contacts.js']; // or wherever your routes are defined
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
