import * as React from "react";
import { useEffect, useState } from "react";
import "@splidejs/react-splide/css";
import Modal from "react-modal";
import Service from "./Services";
import { svgIcons } from "../../svg icons/svgIcon";
import getDirectionUrl from "../commons/GetDirection";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "@yext/pages/components";
import Address from "../commons/Address";
import Phone from "../commons/phone";
import OpenCloseStatus from "../commons/OpenCloseStatus";
import { BaseUrl, slugify, defaultTimeZone } from "../../config/globalConfig";
import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";

const metersToKm = (meters: number) => {
  const km = meters / 1000;
  return km.toFixed(2);
};

type props = {
  prop: any;
  parents: any;
  baseUrl: any;
  coords: any;
  slug: any;
  timezone: any;
  nearByWellPharmaciesTitle: any;
  directionlabel: any;
  c_service_title: any;
  c_wellPharmacyServices: any;
  
};
const NearByLocation = (result: props) => {
  const [timezone, setTimeZone] = React.useState("");
  const [withoutHourClass, setWithoutHourClass] = React.useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [statePharmacyServices, setStatePharmacyServices] = useState(false);
  const [statePharmacyServicestitle, setStatePharmacyServicestitle] =
    useState(false);
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
  function openModal(c_pharmacyServices: any, c_pharmacyServicesTitle: any) {
    setStatePharmacyServices(c_pharmacyServices);
    setStatePharmacyServicestitle(c_pharmacyServicesTitle);
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

  const [data, setData] = useState([]);
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  useEffect(() => {
    let distance: any = [];
    let arr: any = [];
    distance.push(result.prop.response.distances);

    result?.prop?.response?.results?.map((i: any, index: any) => {
      arr.push({
        slug: i.data?.slug,
        address: i.data?.address,
        hours: i.data?.hours,
        mainPhone: i.data?.mainPhone,
        name: i.data?.name,
        yextDisplayCoordinate: i.data?.yextDisplayCoordinate,
        distance: i.distance,
        id: i.data.id,
        c_bookAnAppointment: i.data?.c_bookAnAppointment,
        c_facilities: i.data?.c_facilities,
        c_pharmacyServices: i.data?.c_pharmacyServices,
        c_pharmacyServicesTitle: i.data?.c_pharmacyServicesTitle,
        c_getDirections: i.data?.c_getDirections,
      });
    });

    setData(arr);
  }, [setData]);
  // const conversionDetails_direction = {
  //   cid: "e801ea67-1c6e-4815-baac-e61a111e9f77",
  //   cv: "1",
  // };
  // const conversionDetails_phone = {
  //   cid: "de598c07-b53c-407a-89f8-adc289ae9d62",
  //   cv: "2",
  // };

  return (
    <>
      <div className="nearby-sec">
        <div className="container-lg">
          <div className="w-full text-center">
            <h2 className="sec-title text-center">
              {result.nearByWellPharmaciesTitle
                ? result.nearByWellPharmaciesTitle
                : "Nearby Well Pharmacies"}
            </h2>
          </div>
          <Splide
            id="splide-nearby"
            options={{
              rewind: false,
              type: "slide",
              perPage: 3,
              perMove: 1,
              arrows: false,
              drag: false,
              pagination: false,
              lazyLoad: "nearby",
              breakpoints: {
                1279: {
                  perPage: 2,
                  drag: true,
                  pagination: true,
                  arrows: false,
                  type: "splide",
                },
                766.98: {
                  perPage: 1,
                },
              },
            }}
          >
            {data &&
              data.map((e: any, index: any) => {
                if (index > 0) {
                  var url = "";
                  if (!e.slug) {
                    let slugString = e?.id + " " + e?.name;
                    let slug = slugify(slugString);
                    url = `${slug}.html`;
                  } else {
                    url = `${e.slug.toString()}.html`;
                  }

                  var origin: any = null;
                  if (e.address.city) {
                    origin = e.address.city;
                  } else if (e.address.region) {
                    origin = e.address.region;
                  } else {
                    origin = e.address.country;
                  }

                  let addressString = "";

                  let addressLines = e.address?.line1 + ", " + e.address?.line2;

                  if (addressLines.length > 42) {
                    addressString += e.address?.line1 + ", <br />";
                    let addressLine =
                      e.address?.line2 + ", " + e.address?.city + ", ";
                    if (addressLine.length > 42) {
                      addressString +=
                        e.address?.line2 + ", " + e.address?.city + ",<br />";
                      addressString +=
                        e.address?.postalCode +
                        ", " +
                        regionNames.of(e.address?.countryCode);
                    } else {
                      addressString +=
                        e.address?.line2 +
                        ", " +
                        e.address?.city +
                        ", " +
                        e.address?.postalCode +
                        "<br />";
                      addressString += regionNames.of(e.address?.countryCode);
                    }
                  } else {
                    let line2 = "";
                    if (e.address?.line2 != undefined) {
                      line2 = ", " + e.address?.line2 + ", ";
                    }
                    addressString += e.address?.line1 + ", " + line2 + "<br />";
                    addressString +=
                      e.address?.city + ", " + e.address?.postalCode + "<br />";
                    addressString += regionNames.of(e.address?.countryCode);
                  }
                  const formattedPhone = formatPhoneNumber(e.mainPhone);
                  return (
                    <SplideSlide key={index}>
                      <div className="location near-location">
                        <div className="miles-with-title">
                          <h3 className="">
                            <a href={`${url}`}>{e.name}</a>
                          </h3>
                          <p className="miles">
                            {metersToKm(e.distance ?? 0)} Km
                          </p>
                        </div>

                        <Address address={e.address} />
                        {e.mainPhone ? (
                          <>
                            <div className="icon-row location-phone ">
                              <span className="icon">{svgIcons.phone}</span>
                              <Link
                                className="phone-number onhighLight"
                                data-ya-track="phone"
                                href={`tel:${e.mainPhone}`}
                                rel="noopener noreferrer"
                                eventName={`phone`}
                              >
                                {formattedPhone}
                              </Link>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {e.hours ? (
                          <>
                            {Object.keys(e.hours).length > 0 ? (
                              <>
                                <div className="OpenCloseStatus icon-row">
                                  <div className="icon">
                                    {svgIcons.openclosestatus}
                                  </div>
                                  <OpenCloseStatus
                                    timezone={
                                      timezone ? timezone : defaultTimeZone
                                    }
                                    hours={e.hours}
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
                        <div className="click-nbx">
                          <div> {e?.c_facilities && (
                            <div className="click icon-row single-line">
                              <div className="icon">
                                {svgIcons.clickAndcollect}
                              </div>
                              {e?.c_facilities}
                            </div>
                          )}</div>
                         
                          {e?.c_pharmacyServices &&
                          e?.c_pharmacyServicesTitle ? (
                            <div className="filterButton">
                              <button
                                className="current-location hide-mob link-line-text relative"
                                onClick={() =>
                                  openModal(
                                    e?.c_pharmacyServices,
                                    e?.c_pharmacyServicesTitle
                                  )
                                }
                              >
                                Pharmacy Services
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="buttons">
                          <div className="ctaBtn">
                            <Link
                              data-ya-track="getdirections"
                              eventName={`getdirections`}
                              className="direction button before-icon"
                              onClick={() => getDirectionUrl(e)}
                              href="javascript:void(0);"
                              rel="noopener noreferrer"
                              //conversionDetails={conversionDetails_direction}
                            >
                              {result.directionlabel ? (
                                <>
                                  {svgIcons.GetDirection}
                                  {e?.c_getDirections}
                                </>
                              ) : (
                                <>{svgIcons.GetDirection}Map & Direction</>
                              )}
                            </Link>
                          </div>

                          <div className="ctaBtn">
                            <Link
                              className="button before-icon"
                              href={`${url}`}
                            >
                              {svgIcons.viewdetails}
                              View Details
                            </Link>
                          </div>

                          {e?.c_bookAnAppointment?.link && e?.c_bookAnAppointment?.label &&(
                            <div className="ctaBtn pt-2.5 mx-auto">
                              <Link
                                className="onhighLight button before-icon"
                                href={e?.c_bookAnAppointment.link}
                              >
                                {svgIcons.BookAnAppointment}
                                {e?.c_bookAnAppointment.label}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </SplideSlide>
                  );
                }
              })}
          </Splide>
          <div className="pharmacy-serv">
            <a onClick={closeModal}> </a>
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
                pharmacyServices={statePharmacyServicestitle}
                service={statePharmacyServices}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
export default NearByLocation;
