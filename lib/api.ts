import axios from "axios";

export async function generateProof(payload: {
  gameId: string;
  player: string;
  playerScore: number;
  botScore: number;
  winner: string;
}) {
  const url = "https://dice.iq-quiz-succinct.xyz/api/generate-proof";

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
