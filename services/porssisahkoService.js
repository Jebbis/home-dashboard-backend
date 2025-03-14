import axios from "axios";
import dayjs from "dayjs";
const VAT_RATE = 1.255; // 25.5% VAT
export async function fetchExternalData() {
    const now = dayjs();
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
        axios.get("https://dashboard.elering.ee/api/nps/price", {
            params: { start: todayStart, end: todayEnd },
        }),
        axios.get("https://dashboard.elering.ee/api/nps/price", {
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
    const formattedData = todayData.map((entry, index) => ({
        time: dayjs.unix(entry.timestamp).format("HH"),
        tomorrow: (tomorrowData[index]?.price * VAT_RATE) / 10,
        today: (entry.price * VAT_RATE) / 10,
        higherDay: higherDayLabel,
    }));
    return formattedData;
}
