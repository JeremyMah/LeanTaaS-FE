import React, {useState, useEffect} from 'react';
import Header from './Header';
import InputForm from './InputForm';
import ImageGallery from './ImageGallery';
import {fetchInfo, fetchPhotos} from '../api/Utils'

const CuriosityApp = () => {
  const [roverDetails, setRoverDetails] = useState({});
  const [photos, setPhotos] = useState([]);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //On Mount, Initialize Rover information and get photos for sol 1
  useEffect(()=> {
    const initData = async () => {
      const res = await fetchInfo();
      if(res && res.data) {
        setRoverDetails(res.data.rover);
      }
      handleSolChange(1);
    }
    initData();
  }, []);

  //Gets photos taken on a given sol
  const handleSolChange = async (sol) => {
    if(isFinite(parseInt(sol))) {
      setLoading(true);
      try {
        const res = await fetchPhotos(parseInt(sol));
        if(res && res.data) {
          setPhotos(res.data.photos);
          setLoading(false);
        }
      }
      catch(e) {
        setPhotos([]);
        setLoading(false);
      }
    }
    else {
      await fetchPhotos(1);
      setPhotos([]);
      setLoading(false);
    }
  }

  //Updates when cameras are selected or removed
  const handleCamerasChange = (cameras) => {
    setSelectedCameras(cameras);
  }

  return (
    <div className="app">
      <Header roverDetails={roverDetails} title="Curiosity Images" />
      <InputForm roverDetails={roverDetails} onSolChange={handleSolChange} onCamerasChange={handleCamerasChange} selectOptions={roverDetails.cameras}/>
      <ImageGallery roverDetails={roverDetails} photos={photos} selectedCameras={selectedCameras} isLoading={isLoading} />
    </div>
  );
}

export default CuriosityApp;