/**
 * External dependencies
 */
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
const AnnonceRoutes = require('./routes/Annonce');

/**
 * Internal dependencies: routes
 */


/**
 * Create the application
 */
const app: express.Application = express();

interface ErrorWithStatus extends Error {
	status?: number;
}

/**
 * Connect to the database
 */
mongoose.connect('mongodb+srv://root:root@cluster0.xoxfzvh.mongodb.net/')
  .then(() => console.log('Connected to database')) // Log successful connection
  .catch((err) => console.error('Database connection error:', err)); // Log connection error

/**
 * Add middlewares
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', AnnonceRoutes);
/**
 * Setup CORS
 */
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');

	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

		return res.status(200).json({});
	}

	return next();
});

/**
 * Setup routes
 */
/**
 * Error handling: 404
 */
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	const error: ErrorWithStatus = new Error('Not found');

	error.status = 404;

	next(error);
});

/**
 * Error handling: 500
 */
app.use((error: ErrorWithStatus, req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

export default app;
