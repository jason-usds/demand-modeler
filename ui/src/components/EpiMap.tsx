import React, { useContext, useEffect, useState } from "react";
import { ActionType, AppContext } from "../app/AppStore";
import ReactMapGL, { Layer, Source, PointerEvent } from "react-map-gl";
import { range } from "d3-array";
import { scaleQuantile } from "d3-scale";
import { getContiesForState } from "../utils/utils";

const dataLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "percentile",
      stops: [
        [0, "#3288bd"],
        [1, "#66c2a5"],
        [2, "#abdda4"],
        [3, "#e6f598"],
        [4, "#ffffbf"],
        [5, "#fee08b"],
        [6, "#fdae61"],
        [7, "#f46d43"],
        [8, "#d53e4f"]
      ]
    },
    "fill-opacity": 0.8,
    "fill-outline-color": "white"
  }
};

function updatePercentiles(
  featureCollection: GeoJSON.FeatureCollection,
  accessor: (f: GeoJSON.Feature) => number
): GeoJSON.FeatureCollection {
  const { features } = featureCollection;
  const scale = scaleQuantile()
    .domain(features.map(accessor))
    .range(range(10));
  return {
    type: "FeatureCollection",
    features: features.map(f => {
      const value = accessor(f);
      const properties = {
        ...f.properties,
        value,
        percentile: scale(value)
      };
      return { ...f, properties };
    })
  };
}

interface Props {
  stat: "confirmed" | "dead";
}

const EpiMap: React.FunctionComponent<Props> = props => {
  const [data, setData] = useState<GeoJSON.FeatureCollection>({
    type: "FeatureCollection",
    features: []
  });

  const {
    dispatch,
    state,
    state: { covidTimeSeries, selection }
  } = useContext(AppContext);

  const transformFeatures = (): GeoJSON.Feature[] => {
    const states =
      selection.state === undefined
        ? Object.values(covidTimeSeries[selection.date].states)
        : getContiesForState(covidTimeSeries, selection.date, selection.state);
    return states.map(value => {
      return {
        type: "Feature",
        geometry: value.Geo as any, // TODO: add check to see if Geo is loaded
        properties: {
          confirmed: value.Confirmed,
          dead: value.Dead,
          name: `${value.Name}`
        }
      };
    });
  };

  const accessor = (f: GeoJSON.Feature): number => {
    if (props.stat === "confirmed") {
      return f.properties?.confirmed;
    } else {
      return f.properties?.dead;
    }
  };

  useEffect(() => {
    const newData: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: transformFeatures()
    };
    setData(updatePercentiles(newData, accessor));
  }, [covidTimeSeries, selection]);

  return (
    <ReactMapGL
      {...state.mapView}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={v => {
        v.width = 400; //window.innerWidth;
        dispatch({ type: ActionType.UPDATE_MAPVIEW, payload: v });
      }}
    >
      <Source id="data" type="geojson" data={data}>
        <Layer {...dataLayer} />
      </Source>
    </ReactMapGL>
  );
};

export default EpiMap;
