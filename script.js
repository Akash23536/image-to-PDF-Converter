const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function convertImageToPdf(imagePath, outputPdfPath) {
  try {
    // Load the image file
    const imageBytes = fs.readFileSync(imagePath);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Embed the PNG image into the PDF
    const image = await pdfDoc.embedJpg(imageBytes); // Change it as per format of image

    // Get the dimensions of the image
    const { width, height } = image;

    // Add a page to the PDF document with the same size as the image
    const page = pdfDoc.addPage([width, height]);

    // Draw the image on the page
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // Write the PDF to the output file
    fs.writeFileSync(outputPdfPath, pdfBytes);

    console.log('PDF created successfully at:', outputPdfPath);
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
}

// Example Usage
const imagePath = './Input File/photo2.jpg'; // Path to your PNG image
const outputPdfPath = './Output file/output.pdf'; // Path for the output PDF

convertImageToPdf(imagePath, outputPdfPath);
