import axios from "axios"

const loadPdf = () => {
    return axios.get('/assets/media/pdf/CUENTODIDAXIAfinal.pdf');
}

export {
    loadPdf
}