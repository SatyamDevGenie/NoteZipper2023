import React from 'react';

const Textarea = ({
  label,
  error,
  className = '',
  required = false,
  rows = 4,
  ...props
}) => {
  const textareaClasses = `
    w-full px-4 py-3 border rounded-lg bg-theme-input text-theme transition-colors duration-200 resize-none
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    ${error 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
      : 'border-theme'
    }
    ${className}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-theme-muted">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea 
        className={textareaClasses} 
        rows={rows}
        {...props} 
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Textarea;