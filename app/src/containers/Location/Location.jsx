import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import { isNull } from "lodash";
import cx from "classnames";
import gClasses from "../../Common.module.scss";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon,
  iconUrl: markerIcon,
});
export default function Location(props) {
  const state = useSelector((state) => state.companies);
  const position = state?.selectedCompany?.position;
  if (isNull(position[0]) || isNull(position[1])) {
    return <div className={cx(gClasses.NoData)}>No Data</div>;
  }
  return (
    <div>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        style={{ height: 346, position: "initial" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>
      </MapContainer>
    </div>
  );
}
