const mongoose = require("mongoose");

function connectAsync() {
    return new Promise((resolve, reject) => {

        // ConnectionString: מחרוזת אחת המכילה את כל פרטי ההתחברות למסד הנתונים
        const connStr = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`; // mongodb://localhost:27017/Northwind
        console.log(connStr);
        // More config for mongo: 
        const options = { useNewUrlParser: true, useUnifiedTopology: true };

        // Connect: 
        mongoose.connect(connStr, options, (err, db) => {
            if (err) {
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
