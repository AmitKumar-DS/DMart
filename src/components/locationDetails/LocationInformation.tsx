import * as React from "react";
import CustomMap from "./CustomMap";
import getDirectionUrl from "../commons/GetDirection";
import Storeinfo from "./Storeinformation";
import OpenCloseStatus from "..//../components/commons/OpenCloseStatus";
import { Link, useAnalytics } from "@yext/pages/components";
import { svgIcons } from "../../svg icons/svgIcon";
import Holidayhour from "./holidayHours";
import Address from "../commons/Address";
import Phone from "../commons/phone";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { slugify1, defaultTimeZone } from "../../config/globalConfig";
import Hours from "../commons/hours";

type props = {
  prop: any;
  coords: any;
  address: any;
  phone: any;
  timezone: any;
  hours: any;
  c_storeNo: any;
  c_regionNo: any;
  storeInformationHeading: any;
  hoursHeading: any;
  getDirection: any;
  tellUsIfTheseDetailsAreWrong: any;
  additionalHoursText: any;
  clickAndCollect: any;
};
const LocationInformation = (data: props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

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

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  function handleCloseModal() {
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

  const [time, setTime] = React.useState({});
  const [coordinates, setCoordinate] = React.useState({});
  const [timezone, setTimeZone] = React.useState("");
  const [withoutHourClass, setWithoutHourClass] = React.useState("");
  const [closingTime, setClosingTime] = React.useState("");
  const [currentLocationLatLng, setCurrentLocationLatLng] =
    React.useState(null);
  const [isShow, setIsShow] = React.useState(false);
  var array: any = [];
  React.useEffect(() => {
    const date = new Date();
    let Day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${Day}`;
    data?.prop?.holidayHours &&
      data?.prop?.holidayHours.map((i: any) => {
        let d1 = new Date(`${currentDate}`);
        let d2 = new Date(`${i.date}`);
        if (d2.getTime() >= d1.getTime()) {
          array.push(i);
        }
      });
    if (array.length > 0) {
      setIsShow(true);
    }
    setTime(data.prop);
    setCoordinate(data.coords);

    setTimeZone(data.timezone);
    if (!data.prop) {
      setWithoutHourClass("withoutHours");
    }
  }, [setCurrentLocationLatLng]);
  const conversionDetails = {
    cid: "e1cd62c2-74f9-4d8a-ade1-b8e9001c4df4",
    cv: "1",
  };
  const conversionDetails_phone = {
    cid: "17620319-c59b-4719-9732-eaaf0ff35a3a",
    cv: "2",
  };
 
  return (
    <>
      <div className="location-detail-sec">
        <div className="container-lg">
          <div className="boxes">
            <div className="box store-info">
              <div className="inner-box">
                <h4 className="box-title">
                  {data.storeInformationHeading
                    ? data.storeInformationHeading
                    : "Store Information"}
                </h4>
                <Address address={data.address}></Address>
                <Phone phone={data.phone} />

                {data.hours ? (
                  <>
                    {Object.keys(data.hours).length > 0 ? (
                      <>
                        <div className="icon-row single-line">
                          <div className="icon">{svgIcons.openclosestatus}</div>
                          <OpenCloseStatus
                            timezone={timezone ? timezone : defaultTimeZone}
                            hours={data.hours}
                          ></OpenCloseStatus>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
                {data.clickAndCollect ? (
                  <div className="click icon-row single-line">
                    <div className="icon">{svgIcons.clickAndcollect}</div>
                    {slugify1(data.clickAndCollect[0])}
                  </div>
                ) : (
                  " "
                )}
                <div className="icon-row direction-button">
                  <Link
                    data-ya-track="getdirections"
                    eventName={`getdirections`}
                    className="direction button before-icon"
                    onClick={() => getDirectionUrl(data)}
                    href="javascript:void(0);"
                    rel="noopener noreferrer"
                    //conversionDetails={conversionDetails_direction}
                  >
                    {data.getDirection ? (
                      <>
                        {svgIcons.GetDirection}
                        {data.getDirection}
                      </>
                    ) : (
                      <>{svgIcons.GetDirection}Map & Direction</>
                    )}
                  </Link>
                </div>
                <Storeinfo
                  storeNo={data?.c_storeNo}
                  regionNo={data?.c_regionNo}
                />
              </div>
            </div>

            {data?.prop ? (
              <>
                {Object.keys(data?.hours).length > 0 ? (
                  <>
                    <>
                      <div className="box store-timing">
                        <div className="inner-box">
                          <h4 className="box-title">
                            {data?.hoursHeading
                              ? data?.hoursHeading
                              : "Opening Hours"}
                          </h4>
                          <div className="daylist">
                            <Hours
                              hours={data.hours}
                              timezone={timezone ? timezone : defaultTimeZone}
                              additionalHoursText={data.additionalHoursText}
                            />
                            {data?.prop?.holidayHours && isShow && !data?.prop?.reopenDate && (
                              <>
                                <button
                                  className="current-location pharmacy-serv-head hide-mob link-line-text"
                                  onClick={openModal}
                                >
                                  Holiday Hours
                                </button>
                              </>
                            )}
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
                                <svg
                                  xmlns="http:www.w3.org/2000/svg"
                                  width="20.953"
                                  height="20.953"
                                  viewBox="0 0 20.953 20.953"
                                >
                                  <path
                                    id="Icon_ionic-md-close"
                                    data-name="Icon ionic-md-close"
                                    d="M28.477,9.619l-2.1-2.1L18,15.9,9.619,7.523l-2.1,2.1L15.9,18,7.523,26.381l2.1,2.1L18,20.1l8.381,8.381,2.1-2.1L20.1,18Z"
                                    transform="translate(-7.523 -7.523)"
                                    fill="#B1B1B1"
                                  />
                                </svg>
                              </a>

                              <h3 className="holiday-title">
                                Holiday Hours Calendar
                              </h3>
                              <div className="pop-up-holyhrs heading">
                                <div>Date</div>

                                <div>Day</div>
                                <div> Opening Hours</div>
                              </div>

                              <Holidayhour hours={data.hours.holidayHours} />
                            </Modal>
                          </div>

                          <div className="ctaBtn pt-3 md:pt-10 pl-2">
                            {data.tellUsIfTheseDetailsAreWrong?.link && data.tellUsIfTheseDetailsAreWrong?.label && (
                              <Link
                                className="link-line-text relative"
                                href={`mailto:${data.tellUsIfTheseDetailsAreWrong.link}`}
                              >
                                {data.tellUsIfTheseDetailsAreWrong.label}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {data?.prop ? (
              <>
                {Object.keys(data?.hours).length > 0 ? (
                  <>
                    <div className="box map-info">
                      <div className="inner-box">
                        <CustomMap prop={coordinates} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="box map-info without-hours">
                      <div className="inner-box">
                        <CustomMap prop={coordinates} />
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="box map-info without-hours">
                  <div className="inner-box">
                    <CustomMap prop={coordinates} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default LocationInformation;
