import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "..//../types/search/locations";
import Hours from "../commons/hours";
import Address from "..//../components/commons/Address";
import getDirectionUrl from "../commons/GetDirection";
import Service from "../locationDetails/Services";
import { Link } from "@yext/pages/components";
import Modal from "react-modal";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import OpenCloseStatus from "..//../components/commons/OpenCloseStatus";
import Phone from "../commons/phone";
import { svgIcons } from "../../svg icons/svgIcon";
import { Data } from "@react-google-maps/api";
import { slugify, defaultTimeZone  } from "../../config/globalConfig";

/**
 * 
 * @param meters 
 * @returns Distance in km
 */
const metersToKms = (meters: number) => {
  const km = meters / 1000;
  return km.toFixed(2);
};

const LocationCard: CardComponent<Location> = ({ result }) => {
  const {
    address,
    id,
    hours,
    mainPhone,
    c_pharmacyServices,
    c_pharmacyServicesTitle,
    c_getDirections,
    c_bookAnAppointment,
    c_facilities,
  } = result.rawData;
  const [time, setTime] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const [withoutHourClass, setWithoutHourClass] = React.useState("");
  const formattedPhone = formatPhoneNumber(mainPhone);
  const [modalIsOpen, setIsOpen] = useState(false);
  React.useEffect(() => {
    setTime(result.rawData);
    setTimeZone(result.rawData.timezone);
    if (!result.rawData) {
      setWithoutHourClass("withoutHours");
    }
    // getCurrentLocationLatLng();
  });


  /**
   * Function to convert Date format in dd-mm-yy
   */
  let a;
  let s;
  let dateNewFormat;
  function join(t: any, a: any, s: any) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  if (hours?.reopenDate) {
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(new Date(hours?.reopenDate), a, " ");
    dateNewFormat = s;
  }

  /**
   * Modal PopUp Custom Styles 
   */
  let subtitle: any;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function handleCloseModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }
  const [timeStatus, setTimeStatus] = useState("");
  const onOpenHide = () => {
    if (timeStatus == "") {
      setTimeStatus("active");
    } else {
      setTimeStatus("");
    }
  };





  /**
   Note-  Url returns Slug
   * If slug is available then url returns Slug otherwise it returns id-name
   */
  var url = "";
  if (!result.rawData.slug) {
    let slugString = result.rawData?.id ;
    let slug = slugify(slugString);
    url = `${slug}`;
  } else {
    url = `${result.rawData.slug.toString()}`;
  }
  
console.log("testurl",url);
  /**
   * LocationCard component which returns the HTML of Locator Page Listing.
   */
  return (
    <div
      className={`location result-list-inner-${result.index} result onhighLight`}
       //data-id={`result-${result.id || result.index}`}
    >
      <div className="miles-with-title">
        <h3 className="onhighLight">
          <Link href={`${url}`}>{result.rawData.name} </Link>
        </h3>
        <p className="miles">{metersToKms(result.distance ?? 0)} Km</p>
      </div>

      <Address address={address} />
      {mainPhone ? <Phone phone={mainPhone} /> : ""}
      {hours ? (
        <>
          {Object.keys(result.rawData.hours).length > 0 ? (
            <>
              <div className="OpenCloseStatus icon-row">
                <div className="icon">{svgIcons.openclosestatus}</div>
                {hours && hours?.reopenDate ?
                <div>
                  <OpenCloseStatus
                        timezone={timezone ? timezone : defaultTimeZone}
                        hours={hours}
                  />
                    The Store will reopen at {dateNewFormat}
                </div>
                        
                :
                <a
                className={timeStatus + "onhighLight "}
                href="javascript:void(0);"
                onClick={onOpenHide}
              >
                <OpenCloseStatus
                timezone={timezone ? timezone : defaultTimeZone}
                hours={hours}
        />
          </a>}

                <div className={timeStatus + " daylist"}>
                  <Hours hours={hours ? hours : {}} 
                   timezone={timezone ? timezone : {}}/>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
     
        </>
      ) : (
        <></>
      )}
      <div className="click-nbx">
        <div>
        {result.rawData.c_facilities ? (
          <div className="click icon-row single-line">
            <div className="icon">{svgIcons.clickAndcollect}</div>
            {result.rawData.c_facilities}
          </div>
        ) : (
          " "
        )}
        </div>
        {c_pharmacyServicesTitle && c_pharmacyServices ? (
          <div className="filterButton">
            <button
              className="current-location hide-mob link-line-text relative onhighLight"
              onClick={openModal}
            >
              Pharmacy Services
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="pharmacy-serv onhighLight">
        <a onClick={closeModal}></a>
        <Modal
          onRequestClose={handleCloseModal}
          shouldCloseOnOverlayClick={true}
          isOpen={modalIsOpen}
          style={customStyles}
        >
          <a
            onClick={closeModal}
            type="button"
            id="closeButton"
            data-modal-toggle="allergens-pdf"
            className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
          >
            {svgIcons.Modelpopup}
          </a>

          <Service
            pharmacyServices={c_pharmacyServicesTitle}
            service={c_pharmacyServices}
          />
        </Modal>
      </div>

      <div className="buttons">
        <div className="ctaBtn">
          <Link
            data-ya-track="getdirections"
            eventName={`getdirections`}
            className="onhighLight direction button before-icon"
            onClick={() => getDirectionUrl(result.rawData)}
            href="javascript:void(0);"
            rel="noopener noreferrer"
            //conversionDetails={conversionDetails_direction}
          >
            {c_getDirections ? (
              <>
                {svgIcons.GetDirection}
                {c_getDirections}
              </>
            ) : (
              <>{svgIcons.GetDirection} Map & Direction </>
            )}
          </Link>
        </div>
        <div className="ctaBtn">
          <Link className="onhighLight button before-icon" href={url}>
            {svgIcons.viewdetails}
            View More Info
          </Link>
        </div>

        {c_bookAnAppointment?.link && c_bookAnAppointment?.label && (
          <div className="ctaBtn pt-2.5 mx-auto">
            <Link className="onhighLight button before-icon" href={c_bookAnAppointment.link}>       
                  {svgIcons.BookAnAppointment}
                  {c_bookAnAppointment.label}     
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
