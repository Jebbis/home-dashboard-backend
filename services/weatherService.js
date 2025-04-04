import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export async function getTodayWeather() {
    const API_URL = "https://api.openweathermap.org/data/2.5/forecast";
    const API_KEY = process.env.WEATHER_KEY;
    const LAT = "60.33150022520558";
    const LON = "25.053551234292176";
    const response = await axios.get(API_URL, {
        params: { lat: LAT, lon: LON, appid: API_KEY, units: "metric" },
    });
    const fullData = response.data.list;
    const nextDaysForecast = [];
    function formatDateWithDay(dateStr) {
        const date = new Date(dateStr);
        return `${new Intl.DateTimeFormat("fi-FI", {
            weekday: "short",
        }).format(date)}`;
    }
    //Loop results and make a dataset for current day + next 3
    for (let i = 1; i <= 4; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        const dateStrNext = nextDate.toISOString().split("T")[0];
        const dailyData = fullData.filter((entry) => entry.dt_txt.startsWith(dateStr) ||
            (entry.dt_txt.startsWith(dateStrNext) &&
                entry.dt_txt.endsWith("00:00:00")));
        if (dailyData.length > 0) {
            const tempMin = Math.min(...dailyData.map((entry) => entry.main.temp_min));
            const tempMax = Math.max(...dailyData.map((entry) => entry.main.temp_max));
            nextDaysForecast.push({
                date: i === 1 ? dateStr : formatDateWithDay(dateStr),
                temp_min: Math.round(tempMin),
                temp_max: Math.round(tempMax),
            });
        }
    }
    // Extract detailed temp data for tomorrow
    const tomorrowData = nextDaysForecast[0];
    const nextDate = new Date(tomorrowData.date);
    nextDate.setDate(nextDate.getDate() + 1);
    const dateStrNext = nextDate.toISOString().split("T")[0];
    const tempDataPoints = fullData
        .filter((entry) => entry.dt_txt.startsWith(tomorrowData.date) ||
        (entry.dt_txt.startsWith(dateStrNext) &&
            entry.dt_txt.endsWith("00:00:00")))
        .map((entry) => ({
        temp: Math.round(entry.main.temp),
        time: entry.dt_txt.split(" ")[1].slice(0, 2), // Extracts "HH"
    }));
    return {
        date: tomorrowData.date,
        temp_min: tomorrowData.temp_min,
        temp_max: tomorrowData.temp_max,
        temp_data_points: tempDataPoints,
        nextDaysForecast,
    };
}
