import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

function Map({ currentPosition, trackedPosition }) {
  useEffect(() => {
    console.log("in child", trackedPosition);
  }, [trackedPosition]);
  return (
    <div className="h-full w-full relative flex-1">
      <div className="h-full w-full bg-teal-300 MAPContainer">
        <MapContainer
          center={[25.918309, 82.001597]}
          zoom={17}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {trackedPosition && <Marker position={trackedPosition} />}
          {currentPosition && <Marker position={currentPosition} />}
        </MapContainer>
      </div>
      <div>{`${trackedPosition}`}</div>
    </div>
  );
}

export default Map;
