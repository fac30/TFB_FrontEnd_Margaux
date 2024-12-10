import React from 'react';
import './OutfitMakerComponent.css'; // Import the CSS file

const OutfitMakerComponent: React.FC = () => {
  return (
    <div className="outfit-maker-container">
      <h1 className="outfit-maker-title">Outfit Maker</h1>
      <button className="outfit-button">Create Outfit</button>
      <button className="outfit-button">View Saved Outfits</button>
      {/* Add more buttons or functionality as needed */}
    </div>
  );
};

export default OutfitMakerComponent;
