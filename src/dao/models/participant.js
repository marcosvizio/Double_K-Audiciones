import mongoose from "mongoose";

const collection = 'Participants';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    birthdate: String,
    age: Number,
    email: String,
    instagram: String
}, {timestamps: {createdAt: 'created_at', updated_at: 'updated_at'}});

const participantModel = mongoose.model(collection, schema);

export default participantModel;