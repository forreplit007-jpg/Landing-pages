import React from 'react';

interface SlideButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mainText: string;
  hoverText: string;
  bgColor?: string;
  textColor?: string;
  shadowColor?: string;
}

const SlideButton: React.FC<SlideButtonProps> = ({
  mainText,
  hoverText,
  bgColor = '#1875FF',
  textColor = 'white',
  shadowColor = '#1875FF',
  style,
  className,
  ...props
}) => {
  const customStyle = {
    '--btn-bg': bgColor,
    '--btn-text': textColor,
    '--btn-shadow': shadowColor,
    ...style,
  } as React.CSSProperties;

  return (
    <button
      className={`btn-slide focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${className || ''}`}
      style={customStyle}
      {...props}
    >
      <span data-hover={hoverText}>{mainText}</span>
    </button>
  );
};

export default SlideButton;