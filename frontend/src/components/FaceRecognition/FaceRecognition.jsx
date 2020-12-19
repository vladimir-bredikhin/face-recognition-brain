import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgSrc, imgRef, faceBoxes }) => {
  return imgSrc ? (
    <div className="center ma mt3 relative" style={{ width: "800px" }}>
      <img ref={imgRef} id="predictedImg" src={imgSrc} alt="Predicted" />
      {faceBoxes
        ? faceBoxes.map((faceBox, idx) => (
            <div className="face-box" style={{ ...faceBox }} key={idx}></div>
          ))
        : null}
    </div>
  ) : null;
};

export default FaceRecognition;
