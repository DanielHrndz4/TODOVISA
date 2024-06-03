import React from "react";
import GoogleMapReact from 'google-map-react';
import { Slide, Fade } from "react-awesome-reveal"

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function YourComponent() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    <div className="w-full flex flex-col pb-8 m-auto text-black">
      <div className="w-full pb-8 px-6">
        <div className="pb-4">
          <h1 className="text-3xl">Horarios de atención</h1>
        </div>
        <div className="grid grid-cols-1">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>

        </div>
      </div>

      <Fade bottom>
        <div className="w-full h-full flex flex-col mx-auto text-black">
          <h1 className="text-3xl font-bold text-center pb-8">Nuestra ubicación</h1>
          <div style={{ height: '300px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div>
      </Fade>
    </div>
  );
}
