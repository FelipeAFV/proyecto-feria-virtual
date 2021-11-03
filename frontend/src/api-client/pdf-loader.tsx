import axios from "axios"

const loadPdf = () => {
    return axios.get('/api/pdf');
}

export {
    loadPdf
}