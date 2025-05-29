const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Video Games & Accounts API',
        description: 'API documentation for the project',
    },
    host: 'project2-8ncx.onrender.com',
    // host: 'localhost:3000',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);