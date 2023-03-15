const mongoose = require("mongoose");


function connectAsync() {
    return new Promise((resolve, reject) => {

        // const connStr = `mongodb://host:port/database`;
        const connStr = process.env.MONGODB_CONNECTION_STRING;

        // More config for mongo: 
        const options = { useNewUrlParser: true ,useCreateIndex: true, useUnifiedTopology: true };

        // Connect: 
        mongoose.connect(connStr, options, (err, db) => {
            if (err) {
                global.config.err = err;
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}

(async () => {
    try {
        const db = await connectAsync();
        console.log(`Connected to ${db.connections[0].name}`);
    }
    catch (err) {
        console.error(err);
    }
})();
