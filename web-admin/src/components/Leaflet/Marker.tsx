import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { CoordinateData } from "../../Types/types";

export type LeafletMapProps<T> = {
  location: T | null;
  setLocation?: React.Dispatch<React.SetStateAction<T | null>>;
  draggable: boolean;
};

export const LeafletMap = <T extends CoordinateData>({
  location,
  setLocation,
  draggable,
}: LeafletMapProps<T>) => {
  const map = useMap();

  useEffect(() => {
    if (location !== null) {
      const zoom = draggable ? 17 : 10;
      map.flyTo(location.coord, zoom);
    }
  }, [map, location]);

  return (
    <>
      {location !== null && (
        <Marker
          position={location.coord}
          draggable={draggable}
          eventHandlers={{
            dragend: (e) => {
              if (draggable && setLocation) {
                setLocation({
                  ...(location as any),
                  coord: e.target.getLatLng(),
                });
              }
            },
          }}
        >
          <Popup>{location.label}</Popup>
        </Marker>
      )}
    </>
  );
};
