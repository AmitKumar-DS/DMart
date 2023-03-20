/**
 * This is an Address Component
 * @param props
 * @returns Html elements of Address Component..
 */

import * as React from "react";
import { svgIcons } from "../../svg icons/svgIcon";
import { regionNames } from "../../config/globalConfig";
const Address = (props: any) => {
  const { address } = props;
  return (
    <h4 className="icon-row location-address">
      <span className="icon">{svgIcons.address}</span>
      <span className="">{address?.line1}</span> <br />
      {address?.line2 && (
        <span className="">
          {address?.line2} <br/>
        </span>
      )}
      <span className="">
        {address?.city}, {address?.region}
      </span>
      <br/>
      {
        <span className="">
          {regionNames.of(address?.countryCode)}, {address?.postalCode}
        </span>
      }
    </h4>
  );
};
export default Address;
