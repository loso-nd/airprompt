import { connectToDB } from "@utils/database"; //connect the frontend to DB
import Prompt from "@models/prompt";

export const POST = async (request) => {
    //write data we passed into the api request
    const { userId, prompt, tag } = await request.json(); 

    try {
        //connect to the db each time it creates a new prompt and dies out
        await connectToDB();

        //new model
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new Prompt", { status: 500 });
    }
}