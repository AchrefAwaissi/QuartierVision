"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
/**
 * Internal dependencies: routes
 */
/**
 * Create the application
 */
const app = (0, express_1.default)();
/**
 * Connect to the database
 */
mongoose_1.default.connect('mongodb+srv://root:root@cluster0.xoxfzvh.mongodb.net/')
    .then(() => console.log('Connected to database')) // Log successful connection
    .catch((err) => console.error('Database connection error:', err)); // Log connection error
/**
 * Add middlewares
 */
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
/**
 * Setup CORS
 */
app.use((req, res, next) => {
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
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
/**
 * Error handling: 500
 */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
exports.default = app;
