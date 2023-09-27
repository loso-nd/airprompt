import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, // docoument in the db such as user type
        ref: 'User', //one to many relationship
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is requried.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
});
// get the prompt that already exist or create a new prompt
const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;