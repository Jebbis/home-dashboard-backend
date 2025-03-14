import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const bridgeId = process.env.HUE_BRIDGE_ID;
const bridgeIp = process.env.HUE_BRIDGE_IP;
const API_URL = `http://${bridgeIp}/api/${bridgeId}/lights`;
export async function fetchLightState(lightId) {
    const url = `${API_URL}/${lightId}`;
    const response = await axios.get(url);
    return { isOn: response.data.state.on };
}
export async function toggleLightState(lightId) {
    const currentState = await fetchLightState(lightId);
    const newState = !currentState.isOn;
    console.log("tes...");
    await axios.put(`${API_URL}/${lightId}/state`, {
        on: newState,
    });
    return { isOn: newState };
}
export async function toggleLightBrightness(lightId, value) {
    const brightness = Number(value);
    await axios.put(`${API_URL}/${lightId}/state`, {
        on: true,
        bri: brightness,
    });
    return { isOn: true };
}
