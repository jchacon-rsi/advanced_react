import { EnvironmentPlugin } from 'webpack';
import path from 'path';
import template from './../template';
import { MongoClient } from 'mongodb';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${mongoUri}`);
})

const CURRENT_WORKING_DIR = process.cwd();
const app = express();
const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/template';

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
console.log({nodeENV: process.env.NODE_ENV})
// if (process.env.NODE_ENV === "development") { // Only include hotloader when developing
    import devBundle from './devBundle';
    devBundle.compile(app);
// }

app.get('/', (req, res) => {
    res.status(200).send(template());
})
MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log("Couldn't connect to MongoDB: " + err);
    }
    console.log("Successfully connected to MongoDB database");
    db.close();
})
app.listen(port, function onStart(err) {
    if(err) {
        console.log(err);
    }
    console.info('Server started on port %s.', port);
});