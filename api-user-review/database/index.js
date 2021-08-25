require('dotenv/config');
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => console.log('successful database connection!'))
    .catch((err) => {
        console.log('failed database connection !');
        console.log(err);
    })

mongoose.Promise = global.Promise;

module.exports = mongoose;