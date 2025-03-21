import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function getTimeToWork(locationId: string) {
  const API_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

  const END =
    locationId === "1" ? process.env.END_LOC_1 : process.env.END_LOC_2;
  const START = process.env.START_LOC;
  const API_KEY = process.env.GOOGLE_MAPS_KEY;
  const requestUrl = `${API_URL}?destinations=${END}&origins=${START}&units=metric&key=${API_KEY}`;

  try {
    const response = await axios.get(requestUrl);

    const fullData = response.data;

    let totalDuration = 0;

    fullData.rows.forEach((row: any) => {
      row.elements.forEach((element: any) => {
        console.log(element.duration);

        totalDuration += element.duration.value;
      });
    });

    console.log("Total Duration in seconds:", totalDuration);

    return {
      totalTime: totalDuration,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      totalDuration: 0,
    };
  }
}
