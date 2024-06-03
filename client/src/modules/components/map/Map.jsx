import React from "react";
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Slide, Fade } from "react-awesome-reveal";

export default function MapComponent() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const position = {
    lat: 10.99835602,
    lng: 77.01502627
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
            <APIProvider apiKey={'AIzaSyCkW8tRmEUc7bTe9UKossrKpVb-kmxQ18g'}>
              <Map defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
                <Marker position={position} />
              </Map>
            </APIProvider>
          </div>
        </div>
      </Fade>
    </div>
  );
}
