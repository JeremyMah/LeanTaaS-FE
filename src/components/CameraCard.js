import React from 'react';
import './CameraCard.css';

const CameraCard = (props) => {
  const {cameraDetail} = props;
  return (
    <div className="camera-card">
      <h3>{cameraDetail.fullName}</h3>
      <div> Photos: {cameraDetail.photos} </div>
      {cameraDetail.samplePhotoURL ? (
          <div>
            Sample photo:
            <img src={cameraDetail.samplePhotoURL} alt={`${cameraDetail.fullName} on Mars`} />
          </div>)
        : null}
    </div>
  );
}

export default CameraCard;