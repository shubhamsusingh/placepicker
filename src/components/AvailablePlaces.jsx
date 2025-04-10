import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availableOlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchdata() {
      setIsFetching(true);
      try {
        
    const places  = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortePlaces = sortPlacesByDistance(
            places,
            position.coords.altitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortePlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }
    fetchdata();
  }, []);

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availableOlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
