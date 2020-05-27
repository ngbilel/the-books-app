const express = require('express');
const graphqlHTTP = require ('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();


mongoose.connect('mongodb+srv://admin:admin123@cluster0-kq3iq.mongodb.net/test',  { useNewUrlParser: true, useUnifiedTopology: true  });

mongoose.connection.once('open', () =>{
    console.log('connected to the database');
});

// allow cros origin requests
server.use(cors());

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(4000, ()=> console.log('port listen on port 4000'));

