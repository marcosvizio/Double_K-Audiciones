import participantModel from "../models/participant.js";

export default class ParticipantsManager {
    createParticipant = (params) => {
        return participantModel.create(params)
    }

    getParticipant = (params) => {
        return participantModel.findOne(params)
    }
}