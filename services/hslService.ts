import axios from "axios";

export async function fetchGraphQL() {
  const query = `{ someField }`; // Replace with actual query
  const response = await axios.post(
    "https://your-graphql-endpoint.com/graphql",
    { query }
  );
  return response.data;
}
