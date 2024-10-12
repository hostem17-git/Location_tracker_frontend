import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
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
          <Marker position={[25.918309, 82.001597]} />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
