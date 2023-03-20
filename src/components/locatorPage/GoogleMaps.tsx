import { Wrapper } from "@googlemaps/react-wrapper";
import { useSearchState, Result } from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  twMerge,
  useComposedCssClasses,
} from "..//../hooks/useComposedCssClasses";
import useFetchResults from "../../hooks/useFetchResults";
import Address from "../commons/Address";
import { Link } from "@yext/pages/components";
import Phone from "../commons/phone";
import Mapicon from "..//../images/map1.svg";
import UserMarker from "../../images/map-center.png";
import MapiconHover from "..//../images/map-pin-hover.svg";
import Hours from "../commons/hours";
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import OpenCloseStatus from "..//../components/commons/OpenCloseStatus";
import { svgIcons } from "../../svg icons/svgIcon";
import clustericon from "../../images/culster.png";
import getDirectionUrl from "../commons/GetDirection";
import { slugify, defaultTimeZone } from "../../config/globalConfig";
import $ from "jquery";
import { Marker } from "mapbox-gl";

/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string;
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  showEmptyMap: boolean;
  zoomLevel: number;
  setZoomLevel: any;
  check: boolean;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
  refLcation: any;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;
let mapMarkerClusterer: { clearMarkers: () => void } | null = null;

const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer: "w-full  h-[80vh] md:h-[calc(100vh_-_0px)] top-0 z-[99]",
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
let location:any;
export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <div>
      <Wrapper apiKey={props.apiKey}>
        <UnwrappedGoogleMaps {...props} />
      </Wrapper>
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  showEmptyMap,
  zoomLevel,
  setZoomLevel,
  providerOptions,
  customCssClasses,
  check,
  refLcation,
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [downinfo, setDownInfo] = useState(true);
  var isHover = true;
  let searchZoom: number | Number | null | undefined = null;
  let currentMapZoom: Number | undefined = 0;
  let stopAnimation = false;
  let center: any = {
    lat: Number,
    lng: Number,
  };
  const locationResults = useFetchResults() || [];
  const alternateResult =
    useSearchState(
      (s) => s.vertical.noResults?.allResultsForVertical.results
    ) || [];

  // const locationResults = useSearchState(s => s.vertical.results) || [];
  locationResults.map((result: any, i: Number) => {
    if (i == 0) {
      center = {
        lat: result.rawData.yextDisplayCoordinate
          ? result.rawData.yextDisplayCoordinate.latitude
          : result.rawData.displayCoordinate.latitude,
        lng: result.rawData.yextDisplayCoordinate
          ? result.rawData.yextDisplayCoordinate.longitude
          : result.rawData.displayCoordinate.longitude,
      };
    }
  });

  // openInfoWindow = false;
  // const locationBias = useSearchState((s) => s.vertical.results) || [];

  // const userlat = useSearchState(s => s.location.locationBias) || [];

  const [hover, setHover] = useState(true);
  var openInfoWindow = false;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;
  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, "hidden");
  }
  let pinStyles = {
    fill: "#4e9c34", //default google red
    stroke: "#4e9c34",
    text: "white",
    fill_selected: "#2c702e",
    stroke_selected: "#4e9c34",
    text_selected: "white",
  };

  /** Marker icon*/
  let marker_icon = {
    url: Mapicon,
    fillColor: pinStyles.fill,
    scale: 0.8,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };

  /** Marker Hover icon*/
  let marker_hover_icon = {
    url: MapiconHover,
    fillColor: pinStyles.fill,
    scale: 0.8,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(21, 22),
  };

  // if (!infoWindow) {
  //   infoWindow = new google.maps.InfoWindow();
  // }

  const bounds = new google.maps.LatLngBounds();
  const markerPins = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  const infoWindow = useRef(new google.maps.InfoWindow());
  deleteMarkers();
  userdeleteMarkers();

  const userlat = useSearchState((s) => s.location.locationBias) || [];
  const iplat = userlat.latitude;
  const iplong = userlat.longitude;
  const position = {
    lat: parseFloat(iplat),
    lng: parseFloat(iplong),
  };

  const Usermarker1 = new google.maps.Marker({
    position,
    map,
    icon: UserMarker,
  });
  usermarker.current.push(Usermarker1);

  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
  } catch (e) {}
  if (locationResults.length > 0) {
    for (const result of locationResults) {
      const position = getPosition(result);
      const marker = new google.maps.Marker({
        position,
        map,
        icon: marker_icon,
      });
        
      location = new google.maps.LatLng(position.lat, position.lng);
      markerPins.current.push(marker);
      // console.log(locationResults.length, "marker")
    }
  } else {
    for (const result of alternateResult) {
      const position = getPosition(result);
      const marker = new google.maps.Marker({
        position,
        map,
        icon: marker_icon,
      });

      location = new google.maps.LatLng(position.lat, position.lng);
      markerPins.current.push(marker);
      bounds.extend(location);
    }
  }
  /** Cluster color */
  if (markerPins.current.length > 0) {
    let markers = markerPins.current;
    mapMarkerClusterer = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ markers, position: position }) => {
          return new google.maps.Marker({
            position: {
              lat: position.lat(),
              lng: position.lng(),
            },
            icon: clustericon,
            label: {
              text: String(markers?.length),
              color: "#014C6B",
              fontWeight: "500",
            },
            //  animation: google.maps.Animation.DROP,
          });
        },
      },
    });
  }

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          //center,
          zoom,
          styles: [
            {
              featureType: "administrative",
              elementType: "all",
              stylers: [
                {
                  visibility: "simplified",
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
          ],
          ...providerOptions,
        })
      );
    } else if (markerPins.current.length > 0 && map && check && hover) {
      // console.log('enter')
      if(markerPins.current.length > 50){
        bounds.extend(location);
        setZoomLevel(6);
      }
      setTimeout(function () {
        map.setCenter(center);
        map.panTo(position);
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(location);
        bounds.extend(position);
        map?.fitBounds(bounds);
        map?.setCenter(center);
        map.setZoom(zoomLevel);
      }, 1000);
    } 
    /** Binding Grid Listing click */
    onGridClick(markerPins, marker_hover_icon, marker_icon);
    onGridHover(markerPins, marker_hover_icon, marker_icon);
  }, [center, map, providerOptions, zoom]);

  /** Open info window Click event*/
  for (let i = 0; i < markerPins.current.length; i++) {
    markerPins.current[i].addListener("click", () => {
      setHover(false);       
      /*for (let m = 0; m < markerPins.current.length; m++) {
        markerPins.current[m].setIcon(marker_icon);
      }*/
      let sss = document.querySelectorAll(".result");
      for (let s = 0; s < sss.length; s++) {
        if(s != i ){
          sss[s].classList.remove("fixed-hover");
          sss[s].classList.remove("active");
          markerPins.current[s].setIcon(marker_icon);
        }
      }

      
      // if (!openInfoWindow) {
      markerPins.current[i].setIcon(marker_hover_icon);        
      locationResults.map((result, index) => {
        if (i == index) {
          let resultelement = document.querySelectorAll(
            `.result-list-inner-${index + 1}`
          );
          for (let index = 0; index < resultelement.length; index++) {
            resultelement[index].classList.add("active", "fixed-hover");
          }
          let position = getPosition(locationResults[index]);
          InfowindowContents(i, result);
          scrollToRow(index);
        }
        setTimeout(() => {
          map?.setZoom(13);
        }, 1000);
        var bounds = new google.maps.LatLngBounds();
                bounds.extend(center);
                map?.fitBounds(bounds);
                map?.setCenter(center);
        openInfoWindow = true;
        infoWindow.current.open(map, markerPins.current[i]);
      });
    });

    markerPins.current[i].addListener("mouseover", () => {
      if (hover) {
        markerPins.current[i].setIcon(marker_hover_icon);
        addActiveGrid(i);
      }
    });
    markerPins.current[i].addListener("mouseout", () => {
      if (hover) {
        markerPins.current[i].setIcon(marker_icon);
      }
      if (hover) {
        removeActiveGrid(i);
      }
    });
  }
  /** info window Close event*/
  if (infoWindow.current != null) {
    infoWindow.current.addListener("closeclick", () => {
      setHover(true);
      openInfoWindow = false;
      infoWindow.current.close();
      locationResults.map((result, index) => {
        let resultelement = document.querySelectorAll(
          `.result-list-inner-${index + 1}`
        );
        for (let index = 0; index < resultelement.length; index++) {
          resultelement[index].classList.remove("active", "fixed-hover");
        }
      });
      map?.setZoom(10);
    });
  }

  function sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  /** Active and Remove Grid */
  
  function addActiveGrid(index: number) {
 //   e.preventDefault()
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document.querySelectorAll(".result")[index].classList.add("active");
  }
  function removeActiveGrid(index: any) {
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document.querySelectorAll(".result")[index].classList.remove("active");
  }

  /** Function Grid Hover*/
  function onGridHover(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any
  ) {
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].addEventListener("mouseover", (e) => {
        if (hover) {
          markerPins.current[index].setIcon(marker_hover_icon);

          addActiveGrid(index);
        }
      });
      elements[index].addEventListener("mouseout", () => {
        if (hover) {
          // if(!info){
          if (elements[index].classList.contains("fixed-hover")) {
            markerPins.current[index].setIcon(marker_hover_icon);
          } else {
            markerPins.current[index].setIcon(marker_icon);
          }

          removeActiveGrid(index);
        }
      });
    }
  }

  /** Function Grid Click*/
  function onGridClick(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any
  ) {
    let elements = document.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      if (!elements[index].classList.contains("markerEventBinded")) {
        elements[index].classList.add("markerEventBinded");
        elements[index].addEventListener("click", (e) => {
          if (!(e.target as HTMLElement).classList.contains("onhighLight")) {
            if (index > 0) {
              markerPins.current[index - 1].setIcon(marker_icon);
            }
            $(".result").removeClass("fixed-hover");
            locationResults.map((result, i) => {
              if (i == index) {
                setHover(false);
                isHover = false;
                if (!openInfoWindow) {
                  markerPins.current[index].setIcon(marker_hover_icon);
                }
                document
                  .querySelectorAll(".result")
                  [index].classList.add("fixed-hover");
                addActiveGrid(index);
                setTimeout(() => {
                  map?.setZoom(6);
                }, 900);
                // map?.setZoom(9);
                // let position = {
                //   lat: result.rawData.yextDisplayCoordinate
                //     ? result.rawData.yextDisplayCoordinate.latitude
                //     : result.rawData.displayCoordinate.latitude,
                //   lng: result.rawData.yextDisplayCoordinate
                //     ? result.rawData.yextDisplayCoordinate.longitude
                //     : result.rawData.displayCoordinate.longitude,
                // };
                let position = getPosition(locationResults[index]);
                var bounds = new google.maps.LatLngBounds();
               
                bounds.extend(position);
                map?.fitBounds(bounds);
                // map?.setZoom(14);
                //bounds.extend(center);
                 
                // map?.setCenter(center);
                // map?.panTo(position)

                InfowindowContents(i, result);
                infoWindow.current.open(map, markerPins.current[index]);
              }
            });
          }
        });
      }
    }
  }

  /**
   *
   * @param meters
   * @returns Distance in Miles
   */
  const metersToKm = (meters: number) => {
    const km = meters / 1000;
    return km.toFixed(2);
  };

  // const hours = (result: any) => {
  //   return <Hours hours={result} />;
  // };

  /** Function InfowindowContents returns Html*/
  function InfowindowContents(i: Number, result: any): void {    
    var url = "";
    if (!result.rawData.slug) {
      let slugString = result?.id + " " + result?.name;
      let slug = slugify(slugString);
      url = `${slug}.html`;
    } else {
      url = `${result.rawData.slug.toString()}.html`;
    }

    const MarkerContent = (
      <div className="markerContent">
        <div className="miles-with-title">
          <h3 className="nameData">
            <a href={`${url}`}>{result.name} </a>
          </h3>
          <p className="miles">{metersToKm(result.distance ?? 0)} Km</p>
        </div>
        <Link
          data-ya-track="getdirections"
          eventName={`getdirections`}
          className="addressmob"
          href="javascript:void(0);"
          id="some-button"
          rel="noopener noreferrer"
        >
          <Address address={result.rawData.address} />
        </Link>
        <Phone phone={result.rawData.mainPhone} />
        {/* <div>{hours(result.rawData.hours)} </div> */}

        {result?.rawData?.hours ? (
          <>
            {Object.keys(result?.rawData?.hours).length > 1 ? (
              <>
                <div className="icon-row openStatus">
                  <span className="icon">{svgIcons.openclosestatus}</span>
                  <OpenCloseStatus
                    hours={result?.rawData?.hours}
                    timezone={
                      result.rawData.timezone
                        ? result.rawData.timezone
                        : defaultTimeZone
                    }
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        <div className="map-buttons md:hidden text-center">
          <Link
            data-ya-track="getdirections"
            eventName={`getdirections`}
            className="direction button before-icon"
            onClick={() => getDirectionUrl(result.rawData)}
            href="javascript:void(0);"
            id="some-button1"
            rel="noopener noreferrer"
            //conversionDetails={conversionDetails_direction}
          >
            <>{svgIcons.GetDirection} Directions </>
          </Link>
          <Link
            className="button before-icon ml-2"
            href={`tel:${result.rawData.mainPhone}`}
          >
            {svgIcons.phone} Call
          </Link>
        </div>
      </div>
    );
    function mobiledirection() {
      getDirectionUrl(result.rawData);
    }
    google.maps.event.addListener(infoWindow.current, "domready", (e: any) => {
      const someButton = document.getElementById("some-button");
      someButton?.addEventListener("click", mobiledirection);
    });

    google.maps.event.addListener(infoWindow.current, "domready", (e: any) => {
      const someButton = document.getElementById("some-button1");
      someButton?.addEventListener("click", mobiledirection);
    });

    let string = renderToString(MarkerContent);
    infoWindow.current.setContent(string);
  }

  function deleteMarkers(): void {
    for (let i = 0; i < markerPins.current.length; i++) {
      markerPins.current[i].setMap(null);
    }
    markerPins.current = [];
  }

  function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }

  return (
    <>
      <div className={containerCssClass} ref={ref} />
    </>
  );
}

// TEMPORARY FIX
/* eslint-disable @typescript-eslint/no-explicit-any */
function getPosition(result: Result) {
  const lat = (result.rawData as any).yextDisplayCoordinate.latitude;
  const lng = (result.rawData as any).yextDisplayCoordinate.longitude;
  return { lat, lng };
}

// export function scrollToRow(index: any) {
//   let result = [].slice.call(document.querySelectorAll(".result") || [])[0];
//   let offset = 0;
//   if (typeof [].slice.call(document.querySelectorAll(".result") || [])[index] != 'undefined') {
//     offset = [].slice.call(document.querySelectorAll(".result") || [])[index].offsetTop - result.offsetTop;
//     [].slice.call(document.querySelectorAll(".result-list") || []).forEach(function (el) { el.scrollTop = offset; });
//   }
// }
export function scrollToRow(index: any) {
  let result: any = [].slice.call(
    document.querySelectorAll(`.result`) || []
  )[0];
  let offset: any = [].slice.call(document.querySelectorAll(`.result`) || [])[
    index
  ];

  let o = offset.offsetTop - result.offsetTop;

  [].slice
    .call(document.querySelectorAll(".scrollbar-container") || [])
    .forEach(function (el: any) {
      el.scrollTop = o;
    });
}
