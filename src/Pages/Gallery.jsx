import React, { useState } from 'react';
import PropTypes from 'prop-types';

 

export const Gallery = ({ images }) => {
  console.log(images);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const handleCloseDialog = () => {
    setIsZoomed(false);
  };


  return (
    <div className="gallery-container">
      <button onClick={handlePrevImage}>Anterior</button>
      <img
        src={images[selectedImageIndex]}
        alt={`Imagen ${selectedImageIndex + 1}`}
        onClick={handleImageClick}
      />
      <button onClick={handleNextImage}>Siguiente</button>

      {isZoomed && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseDialog}>&times;</span>
            <img src={images[selectedImageIndex]} alt={`Imagen ${selectedImageIndex + 1}`} />
          </div>
        </div>
      )}
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
}

