"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLightState = fetchLightState;
exports.toggleLightState = toggleLightState;
exports.toggleLightBrightness = toggleLightBrightness;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bridgeId = process.env.HUE_BRIDGE_ID;
const bridgeIp = process.env.HUE_BRIDGE_IP;
const API_URL = `http://${bridgeIp}/api/${bridgeId}/lights`;
async function fetchLightState(lightId) {
    const url = `${API_URL}/${lightId}`;
    const response = await axios_1.default.get(url);
    return { isOn: response.data.state.on };
}
async function toggleLightState(lightId) {
    const currentState = await fetchLightState(lightId);
    const newState = !currentState.isOn;
    console.log("tes...");
    await axios_1.default.put(`${API_URL}/${lightId}/state`, {
        on: newState,
    });
    return { isOn: newState };
}
async function toggleLightBrightness(lightId, value) {
    const brightness = Number(value);
    await axios_1.default.put(`${API_URL}/${lightId}/state`, {
        on: true,
        bri: brightness,
    });
    return { isOn: true };
}
