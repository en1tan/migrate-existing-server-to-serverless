const awsLambdaFastify = require('aws-lambda-fastify');
const app = require('./app');

const proxy = awsLambdaFastify(app);

exports.api = (event, context) => proxy(event, context);
