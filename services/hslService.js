"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGraphQL = fetchGraphQL;
const axios_1 = __importDefault(require("axios"));
async function fetchGraphQL() {
    const query = `{ someField }`; // Replace with actual query
    const response = await axios_1.default.post("https://your-graphql-endpoint.com/graphql", { query });
    return response.data;
}
