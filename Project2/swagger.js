const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Video Games & Accounts API',
        description: 'API documentation for the project',
    },
    host: 'localhost:3000',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);