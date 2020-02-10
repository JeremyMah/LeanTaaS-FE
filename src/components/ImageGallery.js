import React from 'react';
import './ImageGallery.css';
import CameraCard from './CameraCard';

const ImageGallery = (props) => {
  const {roverDetails, photos, selectedCameras, isLoading} = props;

  //Iterate through photos and calculate information by camera. Returns a CameraCard for each selected camera.
  const renderCameraCards = () => {
    let cameraDetails = {};
    if(selectedCameras && selectedCameras.length === 0) {
      return (        
        <h1 className="text">No Cameras Selected</h1>
      );
    }
    if(roverDetails && roverDetails.cameras && roverDetails.cameras.length > 0) {
      roverDetails.cameras.forEach(camera=> {
        cameraDetails[camera.name] = {name: camera.name,
                                      fullName: camera.full_name,
                                      photos: 0,
                                      samplePhotoURL: null};
      });
      if(photos && photos.length > 0) {
        photos.forEach(photo=> {
          let cameraDetail = cameraDetails[photo.camera.name];
          cameraDetail.photos++;
          if(!cameraDetail.samplePhotoURL) {
            cameraDetail.samplePhotoURL = photo.img_src;
          }
        });
      }
      return selectedCameras.map( camera=> <CameraCard key={`${camera}-card`} cameraDetail={cameraDetails[camera]} />);
    }
    return null;
  }

  return (
    <div className="image-gallery">
      {isLoading ?
        <h1 className="text">Loading...</h1>
       : renderCameraCards()}
    </div>
  );
}

export default ImageGallery;