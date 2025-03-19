import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export function FileUpload({ onFileUpload, disabled }: FileUploadProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
      <label className="flex flex-col items-center cursor-pointer">
        <Upload className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-sm text-gray-500 font-medium">Upload Excel File</span>
        <span className="text-xs text-gray-400 mt-1">Click or drag and drop</span>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={onFileUpload}
          className="hidden"
          disabled={disabled}
        />
      </label>
    </div>
  );
}