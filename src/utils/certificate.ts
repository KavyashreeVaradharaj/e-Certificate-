import { jsPDF } from 'jspdf';
import { CertificateData } from '../types';
import logo1 from "./logo4.png";  // Left logo
import logo2 from "./dept.png";  // Right logo

export const generateCertificate = (pdf: jsPDF, data: CertificateData) => {
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  
  // Reset background
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Add header background with gradient
  const headerHeight = 50;
  const headerBgUrl = 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1200';
  pdf.addImage(headerBgUrl, 'JPEG', 0, 0, pageWidth, headerHeight);
  
  // Add semi-transparent overlay for header
  pdf.setFillColor(0, 0, 0);
  pdf.setGState(new pdf.GState({ opacity: 0.6 }));
  pdf.rect(0, 0, pageWidth, headerHeight, 'F');
  pdf.setGState(new pdf.GState({ opacity: 1 }));

  // Add left logo in header
  const logoSize = 60;
  const logoUrlLeft = logo1;  // Left logo
  const topSpace = 2; // Adjust this value for top space
  pdf.addImage(logoUrlLeft, 'JPEG', 15, topSpace, logoSize, logoSize);
  

  // Add right logo in header
  const logoSize1 = 60;
  const logoUrlRight = logo2;  // Right logo
  pdf.addImage(logoUrlRight, 'JPEG', pageWidth - logoSize1 - 25, 5, logoSize1, logoSize1);

  // Add certificate title with special font
  pdf.setTextColor(255, 215, 0); // Gold color
  pdf.setFont('times', 'normal');  // Times New Roman
  pdf.setFontSize(52);
  pdf.text('CERTIFICATE', pageWidth / 2, headerHeight + 25, { align: 'center' });
  
  // Add "of Achievement" text
  pdf.setFontSize(24);
  pdf.setTextColor(100, 100, 100);
  pdf.text('of Achievement', pageWidth / 2, headerHeight + 35, { align: 'center' });

  // Add main content
  pdf.setTextColor(0, 0, 0);
  
  // Add "This is to certify that" text
  const yStart = headerHeight + 50;
  pdf.setFontSize(16);
  pdf.setFont('times', 'italic');
  pdf.text('This is to certify that', pageWidth / 2, yStart, { align: 'center' });

  // Add recipient name with larger font
  pdf.setFontSize(32);
  pdf.setFont('times', 'bold');
  pdf.text(data.name, pageWidth / 2, yStart + 15, { align: 'center' });

  // Add certificate text with increased line spacing
  const margin = 30;
  const textWidth = pageWidth - (2 * margin);
  
  pdf.setFontSize(18);
  pdf.setFont('times', 'normal');
  
  const text = `has successfully completed ${data.title} conducted by ${
    data.organization || 'our organization'}. This certificate is awarded in recognition of their dedication, effort, and achievement in ${
    data.accomplishment || 'completing the course'}. Presented on ${data.date} with appreciation for their outstanding performance.`;

  const lines = pdf.splitTextToSize(text, textWidth);
  pdf.text(lines, margin, yStart + 25, { 
    align: 'justify',
    maxWidth: textWidth,
    lineHeightFactor: 1.5 // Increased line spacing
  });

  // Add award image at the bottom center
  const awardUrl = 'https://images.unsplash.com/photo-1589486466271-4d5c9e163613?w=600';
  const awardSize = 45;
  const awardY = pageHeight - 65;
  pdf.addImage(
    awardUrl,
    'JPEG',
    pageWidth / 2 - awardSize / 2,
    awardY - awardSize,
    awardSize,
    awardSize
  );

  // Add signature section with more spacing
  const signatureY = pageHeight - 35;
  const signWidth = 50;
  const signatureY1 = pageHeight - 28;

  
  
  // Left signature
  pdf.line(margin, signatureY1, margin + signWidth, signatureY1);
  pdf.setFontSize(12);
  pdf.text('CO-ORDINATOR', margin + signWidth/2, signatureY + 14, { align: 'center' });
  
  // Right signature
  pdf.line(pageWidth - margin - signWidth, signatureY1, pageWidth - margin, signatureY1);
  pdf.text('Dr.Devi Priya', pageWidth - margin - signWidth/2, signatureY + 14, { align: 'center' });
  pdf.text('HOD/CSE', pageWidth - margin - signWidth/2, signatureY + 22, { align: 'center' });

  // Add decorative border
  const borderMargin = 10;
  const borderWidth = 0.5;
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(borderWidth);
  pdf.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin);
};
