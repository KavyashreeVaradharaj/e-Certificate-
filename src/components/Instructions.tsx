import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';

export function Instructions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Excel Format Requirements</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-2">Required Columns:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><span className="font-medium">name:</span> Participant's full name</li>
              <li><span className="font-medium">title:</span> Course/Event name</li>
              <li><span className="font-medium">date:</span> Event date (DD/MM/YYYY)</li>
              <li><span className="font-medium">organization:</span> Issuing organization (optional)</li>
              <li><span className="font-medium">accomplishment:</span> Specific achievement (optional)</li>
            </ul>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p>💡 Tip: Make sure your Excel file has the correct column names and data format.</p>
        </div>
      </div>
    </div>
  );
}