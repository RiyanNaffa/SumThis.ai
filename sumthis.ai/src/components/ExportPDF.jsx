import fs from 'fs';
import path from 'path';
import html2pdf from 'html-pdf-node';

let options = {
    format: 'A4',
}

let file = {
    url: '',
};

html2pdf.generatePdf(file, options).then((pdfBuffer) => {
    console.log(pdfBuffer);}).catch((error) => {console.error(error);
    });