import { config } from "dotenv";
import { StreamChat } from "stream-chat";

config();

const apiKey = process.env.STREAM_API_KEY!;
const apiSecret = process.env.STREAM_API_SECRET!;

if (!apiKey || !apiSecret) {
  console.error("Error: Stream API key or Secret is Missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData: any) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.log("Error upserting stream user:", error);
  }
};
