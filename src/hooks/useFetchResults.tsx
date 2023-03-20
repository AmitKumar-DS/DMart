import { useState, useEffect } from "react";
import { useSearchState } from "@yext/search-headless-react";

let mapLocations:any = [];
const useFetchResults = () => {  
  const locationResults = useSearchState(s => s.vertical.results) || [];
  // const resultsCount:any = useSearchState(s => s.vertical.resultsCount) || 0;
  // const limit:any = useSearchState(s => s.vertical.limit) || 0;
  const offset:any = useSearchState(s => s.vertical.offset) || 0;
  
  if(offset == 0){
    mapLocations = [];
  }

  if(locationResults.length > 0){
    for (let i = 0; i < locationResults.length; i++) {
      const location = locationResults[i];
    
      let pushStatus = true;
      if(mapLocations.length > 0){
        for (let m = 0; m < mapLocations.length; m++) {
          const existLocation = mapLocations[m];
          if(location.id == existLocation.id){
            pushStatus = false;
          }
        }
      }
      if(pushStatus){
         mapLocations.push(location);
      }    
    }
  }
    
  let mapLocationsResults = mapLocations;  

  return mapLocationsResults;
};

export default useFetchResults;
