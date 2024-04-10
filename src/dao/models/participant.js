import mongoose from "mongoose";

const collection = 'Participants';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    pronouns: String,
    birthdate: String,
    email: String,
    instagram: String,
    health_history: String
}, {timestamps: {createdAt: 'created_at', updated_at: 'updated_at'}});

const participantModel = mongoose.model(collection, schema);

export default participantModel;