"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Settings_1 = require("./Settings");
const app = (0, express_1.default)();
const server = app.listen(// Replace with your desired port number
process.env.PORT || 3000, // Use environment variable for port or default to 3000
() => {
    console.log(`Server listening on port ${Settings_1.PORT}`);
});
