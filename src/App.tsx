import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { read, utils } from 'xlsx';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { FileUpload } from './components/FileUpload';
import { FilePreview } from './components/FilePreview';
import { Instructions } from './components/Instructions';
import { CertificateData } from './types';
import { generateCertificate } from './utils/certificate';

function App() {
  const [loading, setLoading] = useState(false);
  const [fileData, setFileData] = useState<CertificateData[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json<CertificateData>(worksheet);
      setFileData(jsonData);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please check the Excel format.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const zip = new JSZip();
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      for (const data of fileData) {
        generateCertificate(pdf, data);
        const pdfBlob = pdf.output('blob');
        zip.file(`${data.name}_certificate.pdf`, pdfBlob);
        pdf.addPage();
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificates.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating certificates:', error);
      alert('Error generating certificates.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFileData([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Certificate Generator</h1>
          <p className="text-gray-600">Generate beautiful certificates from Excel data</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <FileUpload onFileUpload={handleFileUpload} disabled={loading} />
            <Instructions />
          </div>

          <div className="space-y-6">
            {loading && (
              <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
                <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" />
                <span className="ml-2 text-gray-600">Processing...</span>
              </div>
            )}

            {!loading && fileData.length > 0 && (
              <FilePreview
                data={fileData}
                onGenerate={handleGenerate}
                onClear={handleClear}
                disabled={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;