import React from 'react';
import { Check, Download, FileSpreadsheet, Trash2 } from 'lucide-react';
import { CertificateData } from '../types';

interface FilePreviewProps {
  data: CertificateData[];
  onGenerate: () => void;
  onClear: () => void;
  disabled: boolean;
}

export function FilePreview({ data, onGenerate, onClear, disabled }: FilePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold">File Preview</h2>
          </div>
          <button
            onClick={onClear}
            className="text-red-500 hover:text-red-600 p-1"
            title="Clear data"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Total Certificates:</span>
            <span className="font-semibold">{data.length}</span>
          </div>
          <div className="max-h-48 overflow-y-auto border rounded-lg">
            {data.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 text-sm hover:bg-gray-50 border-b last:border-b-0"
              >
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
                <span className="text-gray-400 text-xs ml-auto flex-shrink-0">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={onGenerate}
          disabled={disabled}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Download className="w-5 h-5" />
          Generate Certificates
        </button>
      </div>
    </div>
  );
}