import React, { useEffect, useState } from 'react'
import {Document, Page, pdfjs} from 'react-pdf'
import { loadPdf } from '../../api-client/pdf-loader';
import { arrowStyle, pdfContainerStyle } from './book-style';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function Book() {

    const [ pdfFile, setPdfFile] = useState();
    const [numPages, setNumPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    // useEffect(() => {
    //     loadPdfBook();

    // }, []);

    // const loadPdfBook = async () => {

    //     const book = await loadPdf();
    //     console.log('Haciendo request de libro', book);
    //     setPdfFile(book.data);
    // }

    const onLoadSuccess = (pdf: any) => {
        setNumPages(pdf.numPages);
        console.log('Numero de páginas',pdf.pdfInfo);
        console.log('Numero de páginas',pdf.numPages);
        console.log('Numero de páginas',pdf);
    }

    const nextPage = () => {
        if (currentPage == numPages) {
            return;
        }
        setCurrentPage(currentPage+1);
    }

    const prevPage = () => {
        if (currentPage == 1) {
            return;
        }
        setCurrentPage(currentPage-1);
    }


    return (
        <>
            <div style={pdfContainerStyle}>
            <IconContext.Provider value={{size: '20px'}}>
                <FaArrowLeft style={arrowStyle} onClick={prevPage}/>
                <Document onLoadSuccess={onLoadSuccess} onLoadError={console.error} file={'/assets/media/pdf/CUENTODIDAXIAfinal.pdf'}>
                    <Page height={400} pageNumber={currentPage} />        
                </Document>   
                <FaArrowRight style={arrowStyle} onClick={nextPage}/>
            </IconContext.Provider>
            </div>

        </>
    )
}
