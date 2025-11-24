import React from 'react';

interface StarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const StarButton: React.FC<StarButtonProps> = ({ children, className, ...props }) => {
  // Standard star path for the sparkle effect
  const starPath = "M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z";
  
  const svgProps: React.SVGProps<SVGSVGElement> = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 784.11 815.53",
    shapeRendering: "geometricPrecision",
    textRendering: "geometricPrecision",
    imageRendering: "optimizeQuality",
    fillRule: "evenodd",
    clipRule: "evenodd"
  };

  return (
    <button className={`btn-star ${className || ''}`} {...props}>
       {children}
       <div className="star-1">
         <svg {...svgProps}>
          <path className="fil0" d={starPath}></path>
         </svg>
       </div>
       <div className="star-2">
         <svg {...svgProps}>
          <path className="fil0" d={starPath}></path>
         </svg>
       </div>
       <div className="star-3">
         <svg {...svgProps}>
          <path className="fil0" d={starPath}></path>
         </svg>
       </div>
       <div className="star-4">
         <svg {...svgProps}>
          <path className="fil0" d={starPath}></path>
         </svg>
       </div>
       <div className="star-5">
         <svg {...svgProps}>
          <path className="fil0" d={starPath}></path>
         </svg>
       </div>
       <div className="star-6">
         <svg {...svgProps}>
          <path className="fil0" d={starPath}></path>
         </svg>
       </div>
    </button>
  );
};

export default StarButton;