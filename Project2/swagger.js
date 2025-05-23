const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Video Games & Accounts API',
        description: 'API documentation for the project',
    },
    host: 'project2-8ncx.onrender.com',
    schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);