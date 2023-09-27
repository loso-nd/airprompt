import { connectToDB } from "@utils/database"; //connect the frontend to DB
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 });

        //if successful
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify("Failed to retrieve prompt"), {status: 500})
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    // data we passed into the update
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 });
        
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify("Failed to update prompt"), {status: 500})
    }
}

// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Failed to delete prompt"), {status: 500})
    }
}