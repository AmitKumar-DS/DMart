import * as React from "react";
import { svgIcons } from "../../svg icons/svgIcon";
import { formatPhoneNumber } from "react-phone-number-input";
const Phone = (props: any) => {
  const { phone } = props;
  const formattedPhone = formatPhoneNumber(phone);
  return (
    <>
      {phone && (
        <div className="icon-row location-phone ">
          <span className="onhighLight icon">{svgIcons.phone}</span>
          <a
            className="phone-number onhighLight"
            data-ya-track="phone"
            href={`tel:${phone}`}
            rel="noopener noreferrer"
          >
            {formattedPhone}
          </a>
        </div>
      )}
    </>
  );
};
export default Phone;
