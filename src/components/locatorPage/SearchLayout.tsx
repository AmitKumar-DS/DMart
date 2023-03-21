import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import * as React from "react";
import $ from "jquery";
import LoadingSpinner from "../commons/LoadingSpinner";
import {
  StandardFacets,
} from "@yext/search-ui-react";
import FilterSearch from "./FilterSearch";
import LocationCard from "./LocationCard";
import { GoogleMaps } from "./GoogleMaps";
import {
  AnswerExperienceConfig,
  googleMapsConfig,
  limit,
} from "..//../config/globalConfig";
import Geocode from "react-geocode";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import useFetchResults from "../../hooks/useFetchResults";
import { svgIcons } from "../../svg icons/svgIcon";
import ViewMore from "./ViewMore";
import ResultsCount from "./ResultsCount";
import Alternateviewmore from "./Alternateviewmore";
import VerticalResults from "../VerticalResults";

var mapzoom = 8;
const SearchLayout = (props:any): JSX.Element => {
  const [isLoading, setIsloading] = React.useState(true);
  const [zoomlevel , setZoomlevel] = React.useState(8);
  const [centerLatitude, setCenterLatitude] = useState(
    googleMapsConfig.centerLatitude
  );
  const [centerLongitude, setCenterLongitude] = useState(
    googleMapsConfig.centerLongitude
  );
  const locationResults = useFetchResults() || [];
  const alternateResult = useSearchState(s => s.vertical.noResults?.allResultsForVertical.results) || [];
  const [optiontext, setOptiontext] = useState("");
  const [check, setCheck] = useState(false);
  const [inputvalue, setInputValue] = React.useState("");
  const [allowlocation, setallowLocation]=React.useState("");
  const[userShareLocation,setUserShareLocation]=useState(false);  
  const [offset, setOffset] = React.useState(0);
  const searchActions = useSearchActions();
  const [optionclick, setOptionClick] = useState(true);
  var searchKey: any;
  var firstTimeRunners = true;
  const FirstLoad = () => {
    setCheck(true);
    if (navigator.geolocation) {
    }
    searchActions.setUserLocation({
      latitude: googleMapsConfig.centerLatitude,
      longitude: googleMapsConfig.centerLongitude,
    });
    searchActions.setVerticalLimit(limit);
    searchActions.setOffset(0);
    searchActions.executeVerticalQuery();
    mapzoom=6
    setTimeout(() => {
      setIsloading(false);
     $('body').removeClass("overflow-hidden")
    }, 3100);
  };

  let userMyLocationBlockMessage = props.userMyLocationBlockMessage;
  let NoLocationsAvailable= props.NoLocationsAvailable;


  const onClick = () => {
  setZoomlevel(3)
    setInputValue('');
  
    if (navigator.geolocation) {
      const error = (error: any) => {
        if (error.code == 1) {
          setallowLocation(userMyLocationBlockMessage);
        } else {
          setallowLocation(userMyLocationBlockMessage);
        }
        setUserShareLocation(false);
      }
      navigator.geolocation.getCurrentPosition(function (position) {
      Geocode.setApiKey(googleMapsConfig.googleMapsApiKey);
      Geocode.fromLatLng(position.coords.latitude,position.coords.longitude).then(
        (response:any) => {
          if (response.results[0]) {           
            setInputValue(response.results[0].formatted_address);      
            document.getElementsByClassName('FilterSearchInput')[0].setAttribute("value", response.results[0].formatted_address);            
            setallowLocation('');             
            searchActions.setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }   
        },
        (error: any) => {
          console.error(error);
          setCheck(false);
        }
      );
            setCenterLatitude(position.coords.latitude);
            setCenterLongitude(position.coords.longitude);
      
            searchActions.setUserLocation({latitude: position.coords.latitude,longitude: position.coords.longitude });
            searchActions.setVertical(AnswerExperienceConfig.verticalKey);
           // searchActions.setQuery(response.results[0].formatted_address);
            searchActions.setOffset(0);
            searchActions.setVerticalLimit(limit);
            searchActions.executeVerticalQuery();      
      }, error, {
        timeout: 10000,
      });
    }
  }


  const getParents = (elem: any) => {
    while (
      elem.parentNode &&
      elem.parentNode.nodeName.toLowerCase() != 'body'
    ) {
      elem = elem.parentNode;
      if (elem.classList.contains("options")) {
        return true;
      }
    }
    return false;
  };
  const Findinput = () => {
   
    let searchKey = document.getElementsByClassName('FilterSearchInput');
    let Search = (searchKey[0].value);
    searchActions.setOffset(0);
if(Search.length)
{
   setInputValue('');
    getCoordinates(Search);
}
  }
  const handleInputValue = () => {
    setInputValue('');
  }
  const handleSetUserShareLocation = (value:any, userShareStatus:boolean) => {
    // console.log('handleSetUserShareLocation', value, userShareStatus);
    setInputValue(value);
    if(!userShareStatus){
      setCenterLatitude(googleMapsConfig.centerLatitude);
      setCenterLongitude(googleMapsConfig.centerLongitude);
    }
  }

  useEffect(() => {
    if (firstTimeRunners) {
      firstTimeRunners = false;
      FirstLoad();
    }
  
    if (isLoading) {
      $('body').addClass("overflow-hidden")
    }
  }, []);


  function getCoordinates(address: String) {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "london &key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "OK") {
          data.results.map((res: any) => {
            const userlatitude = res.geometry.location.lat;
            const userlongitude = res.geometry.location.lng;
            let params = { latitude: userlatitude, longitude: userlongitude };
            setCenterLatitude(userlatitude);
            setCenterLongitude(userlongitude);
         //   searchActions.setUserLocation(params);
            searchActions.setQuery(address);
            searchActions.executeVerticalQuery();
          });
        } else {
          searchActions.setUserLocation({
            latitude: centerLatitude,
            longitude: centerLongitude,
          });
          searchActions.setQuery(address);
          searchActions.executeVerticalQuery();
        }
      });
  }
  // const noresult =() =>{
  //   noresultmessage=("No Location Found")
  //   searchActions.setQuery('');
  //   searchActions.executeVerticalQuery();
  // }

  const addClass = () => {
    document.body.setAttribute("class", "mapView");
    setActive("");
  };
  const loader =
  isLoading ? <LoadingSpinner /> : '';
  return (
    <>
    {loader}
      <div className="locator-full-width place-content-center">
        <div className="locator-container">
          <div className="search-block">

          {allowlocation.length > 0 ?
          <div className="for-allow">{allowlocation}</div>
          : ''}

            <div className="location-with-filter">
              <h3 className="title">Enter a town or postcode</h3>

              {/* Use My Location button */}
              <button
                className="ghost-button before-icon"
                title="Search using your current location!"
                id="useLocation"
                onClick={onClick}
              >               
                {svgIcons.useMyLocation}
                Use My Location
              </button>
            </div>
           
            {/* Search Input by name,address  */}
            <div className="search-form">
              <FilterSearch
                customCssClasses={{
                  filterSearchContainer: "mb-0",
                  inputElement: "FilterSearchInput",
                  optionsContainer: "options"
                }}
                inputvalue={inputvalue}
                searchOnSelect={true}
                searchFields={[
                  {
                    entityType: "location",
                    fieldApiName: "name",
                  },
                  // {
                  //   entityType: "location",
                  //   fieldApiName: "address.line1",
                  // },
                  // {
                  //   entityType: "location",
                  //   fieldApiName: "address.line2",
                  // },
                  // {
                  //   entityType: "location",
                  //   fieldApiName: "address.city",
                  // },
                  // {
                  //   entityType: "location",
                  //   fieldApiName: "address.postalCode",
                  // },
                ]}
                handleInputValue={handleInputValue}  
                 handleSetUserShareLocation={handleSetUserShareLocation}
              />

              {/* Covid Filter  */}
              <StandardFacets
                customCssClasses={{container: "filter-items" }}
                defaultExpanded={true}
              ></StandardFacets>
        
           {/* Search icon Button  */}
              <button
                className="button"
                aria-label="Search bar icon"
                id="search-location-button"
                onClick={Findinput}
              >
                {svgIcons.Searchbaricon}
              </button>
            </div>
          </div>

           {/* Map view and List View CTA in mobile responsive  */}
          <div className="mobile-btns">
            <a
              className="button before-icon listBtn"
              href="javascript:void(0);"
              onClick={() => {
                document.body.classList.remove("mapView");
              }}
            >
              {svgIcons.listView} Pharmacy List
            </a>
            <a
              className="button before-icon mapBtn"
              href="javascript:void(0);"
              onClick={addClass}
            >
              {svgIcons.mapView} Map View
            </a>
          </div>


          {/* Map Section  */}
          <div className="map-section">
            <GoogleMaps
              apiKey={googleMapsConfig.googleMapsApiKey}
              centerLatitude={centerLatitude}
              centerLongitude={centerLongitude}
              defaultZoom={8}
              zoomLevel={zoomlevel}
              setZoomLevel= {setZoomlevel}
              showEmptyMap={true}
              check={check}
            />
            <ViewMore
                className={"button view-more before-icon"}
                idName={"mobile-view-more-button"}     
                buttonLabel={"Load More"}
                
              />
          </div>
          {alternateResult && alternateResult.length > 0 ? (
          <p className="pt-2 pb-3 text-lg text-center no-lc-err-msg">{NoLocationsAvailable}</p>
          ):(
         <></>
          )}

           {/* Result listing Section  */}
          <div className="result-listing">
            <ResultsCount
              //customCssClasses={{ resultsCountContainer: "result-count" }}
            />
            <PerfectScrollbar className="result-list">
              {locationResults && locationResults.length > 0 ? (
                <div className="scrollbar-custom">
                  <VerticalResults
                    displayAllOnNoResults={false}
                    CardComponent={LocationCard}
                    locationResults={locationResults}
                  />
                  
                </div>
              ) : (
               
                  <div className="scrollbar-custom no-data-list">
                    <VerticalResults
                      displayAllOnNoResults={false}
                      CardComponent={LocationCard}
                      locationResults={alternateResult}      
                    />
                  </div>
               
              )}
                {locationResults && locationResults.length > 0 ?
            <ViewMore className={"button view-more before-icon"} idName={"listing-view-more-button"} buttonLabel={"Load More"} setZoomLevel={setZoomlevel}/>
            :
            <Alternateviewmore className={"button view-more before-icon"} idName={"alternate-view-more-button"} buttonLabel={"Load More"}/>
            }
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchLayout;
