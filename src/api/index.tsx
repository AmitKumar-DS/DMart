import {
    baseApiUrl,
    radius,
    liveAPIKey,
    entityTypes,
    savedFilterId,
    limit,
  } from "../config/globalConfig";
  
  var WebApi = {
    getRequest: function (entities: any) {
      const url = `${baseApiUrl}entities/geosearch?radius=${radius}&location=${
        entities && entities.latitude
      },${
        entities && entities.longitude
      }&api_key=${liveAPIKey}&v=20181201&resolvePlaceholders=true&entityTypes=${entityTypes}&savedFilterId=${savedFilterId}&limit=${limit}&fields=googlePlaceId,slug,address,addressHidden,hours,name,geocodedCoordinate,isoRegionCode,localPhone,mainPhone,timezone,yextDisplayCoordinate,meta,timeZoneUtcOffset,what3WordsAddress,closed`;
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          return data.response.entities;
        })
        .catch((error) => {});
    },
  };
  
  export default WebApi;