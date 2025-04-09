import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching,setIsFetching]=useState(false);
  const [availableOlaces,setAvailablePlaces]= useState([]);
  useEffect(()=>{
   async function fetchdata(){
    setIsFetching(true);
    const response=await fetch('http://localhost:3000/places');
    const resData= await response.json();
    setAvailablePlaces(resData.places);
    setIsFetching(false);
    }
    fetchdata();
  },[]);
 
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
