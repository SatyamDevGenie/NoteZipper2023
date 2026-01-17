import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  ...props 
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: '',
  };

  const baseClasses = `
    bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-200
    ${hover ? 'hover:shadow-lg hover:-translate-y-1' : ''}
    ${paddingClasses[padding]}
    ${className}
  `;

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;