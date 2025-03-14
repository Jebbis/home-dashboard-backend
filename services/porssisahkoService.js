"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExternalData = fetchExternalData;
const axios_1 = __importDefault(require("axios"));
const dayjs_1 = __importDefault(require("dayjs"));
const VAT_RATE = 1.255; // 25.5% VAT
async function fetchExternalData() {
    const now = (0, dayjs_1.default)();
    const todayStart = now
        .startOf("day")
        .subtract(2, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    const todayEnd = now
        .endOf("day")
        .subtract(2, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    const yesterdayStart = now
        .add(1, "day")
        .startOf("day")
        .subtract(2, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    const yesterdayEnd = now
        .add(1, "day")
        .endOf("day")
        .subtract(2, "hour")
        .format("YYYY-MM-DD HH:mm:ss");
    // Fetch both datasets
    const [todayRes, yesterdayRes] = await Promise.all([
        axios_1.default.get("https://dashboard.elering.ee/api/nps/price", {
            params: { start: todayStart, end: todayEnd },
        }),
        axios_1.default.get("https://dashboard.elering.ee/api/nps/price", {
            params: { start: yesterdayStart, end: yesterdayEnd },
        }),
    ]);
    const todayData = todayRes.data.data.fi;
    const tomorrowData = yesterdayRes.data.data.fi;
    // Find peak prices for today and tomorrow
    const maxToday = Math.max(...todayData.map((entry) => entry.price));
    const maxTomorrow = Math.max(...tomorrowData.map((entry) => entry.price));
    const higherDayLabel = maxToday > maxTomorrow ? "today" : "tomorrow";
    // Combine data based on timestamps
    const formattedData = todayData.map((entry, index) => {
        var _a;
        return ({
            time: dayjs_1.default.unix(entry.timestamp).format("HH"),
            tomorrow: (((_a = tomorrowData[index]) === null || _a === void 0 ? void 0 : _a.price) * VAT_RATE) / 10,
            today: (entry.price * VAT_RATE) / 10,
            higherDay: higherDayLabel,
        });
    });
    return formattedData;
}
