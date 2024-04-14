"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATLAS_URL = exports.JWT_KEY = exports.PORT = exports.ROOT = void 0;
const dotenv = require('dotenv');
dotenv.config();
exports.ROOT = process.env.ROOT;
exports.PORT = process.env.PORT;
exports.JWT_KEY = process.env.JWT_KEY;
exports.ATLAS_URL = process.env.ATLAS_URL;
