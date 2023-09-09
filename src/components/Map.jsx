import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ChangeView from "./ChangeView";

const Maps = ({ center, lat, long }) => {
//   const initialPosition = [0, 0];
  return (
    <MapContainer
      center={[lat, long]}
      zoom={16}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <ChangeView center={[lat, long]} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, long]}>
        <Popup>A pretty CSS3 popup.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Maps;
