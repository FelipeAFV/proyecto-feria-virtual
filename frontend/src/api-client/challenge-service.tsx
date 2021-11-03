import axios from "axios"

const isChallengeCompleted = async (standId: number, challengeNumber: number) => {
    const response = await axios.post('/api/challenge/isChallengeCompleted', {
        standId: standId,
        challengeNumber: challengeNumber,
    });

    return response.data;





}

const challengesStatus = async (standId: number) => {
    const response = await axios.post('/api/challenge/challengesCompleted', {
        standId: standId,

    });

    return response.data;





}

export {
    isChallengeCompleted,
    challengesStatus
}