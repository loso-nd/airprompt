import { connectToDB } from "@utils/database"; //connect the frontend to DB
import Prompt from "@models/prompt";

export const GET = async (request) => {
    //no need to pull in data since this is a GET
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        //if successful
        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify("Failed to retrieve prompts"), {status: 500})
    }
}