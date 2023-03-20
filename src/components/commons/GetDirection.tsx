const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
export default function getDirectionUrl(entitiy: any) {
  var address_string = "";
  address_string =
    `${entitiy.address?.line1},` +
    `${entitiy.address?.line2},` +
    `${entitiy.address?.city},` +
    `${entitiy.address?.region},` +
    `${entitiy.address?.postalCode},` +
    `${entitiy.address?.countryCode}`;
  address_string = address_string.replace("undefined,", "");
  var origin: any = null;
  if (entitiy.address?.city) {
    origin = entitiy.address?.city;
  } else if (entitiy.address?.region) {
    origin = entitiy.address?.region;
  } else {
    origin = entitiy.address?.country;
  }
  if (navigator.geolocation) {
    const error = (error: any) => {
      var message_string =
        "Unable to determine your location. please share your location";
      if (confirm(message_string) != true) {
        var getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          address_string +
          "&origin=" +
          origin;

        window.open(getDirectionUrl, "_blank");
      } else {
        return false;
      }
    };
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let currentLatitude = position.coords.latitude;
        let currentLongitude = position.coords.longitude;
        let getDirectionUrl =
          "https://www.google.com/maps/dir/?api=1&destination=" +
          address_string +
          "&origin=" +
          currentLatitude +
          "," +
          currentLongitude;
        window.open(getDirectionUrl, "_blank");
      },
      error,
      {
        timeout: 10000,
      }
    );
  }
}
