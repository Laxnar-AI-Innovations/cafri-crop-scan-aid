
import React from 'react';

interface BoundingBoxProps {
  bbox: [number, number, number, number]; // [x1, y1, x2, y2]
  label: string;
  confidence: number;
  imageWidth: number;
  imageHeight: number;
}

const BoundingBox: React.FC<BoundingBoxProps> = ({ 
  bbox, 
  label, 
  confidence, 
  imageWidth, 
  imageHeight 
}) => {
  const [x1, y1, x2, y2] = bbox;

  // Scale the bounding box coordinates to match the displayed image size
  const boxStyle = {
    left: `${(x1 / imageWidth) * 100}%`,
    top: `${(y1 / imageHeight) * 100}%`,
    width: `${((x2 - x1) / imageWidth) * 100}%`,
    height: `${((y2 - y1) / imageHeight) * 100}%`
  };

  return (
    <>
      <div 
        className="absolute border-2 border-cafri-red pointer-events-none"
        style={boxStyle}
      />
      <div 
        className="absolute bg-cafri-red text-white text-xs px-1 py-0.5 rounded"
        style={{ left: boxStyle.left, top: `calc(${boxStyle.top} - 20px)` }}
      >
        {label.replace('___', ' ')} ({Math.round(confidence * 100)}%)
      </div>
    </>
  );
};

export default BoundingBox;
