import mongoose, { Schema } from "mongoose";

const todosSchema = new Schema({
    todo: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users', // Reference to the 'users' collection
        required: true
    }
});


const todos = mongoose.model('todos', todosSchema);

export default todos