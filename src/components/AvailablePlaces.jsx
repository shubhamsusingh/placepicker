import { useState } from 'react';
import Places from './Places.jsx';
import { useEffect } from 'react';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching,setIsFetching]=useState(false);
  const [availableOlaces,setAvailablePlaces]= useState([]);
  const [error,setError]=useState();
  useEffect(()=>{
   async function fetchdata(){
    setIsFetching(true);
    try {
      const response=await fetch('http://localhost:3000/places');
      const resData= await response.json();

      if(!response.ok){
        throw new Error('Failed to fetch places');
      }
      setAvailablePlaces(resData.places);
    } catch (error) {
      setError(error);
      // throw error;
    }
    
    
    setIsFetching(false);
    }
    fetchdata();
  },[]);
 
  if(error){
    return <Error title="An error occured!" message={error.message}/>
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
