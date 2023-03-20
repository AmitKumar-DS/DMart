import * as React from "react";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../../svg icons/svgIcon";

type props = {
  service: any;
  pharmacyServices: any;
  ctaforpharmacyservices: any;
};
const Service = (data: props) => {
  const { service } = data;

  return (
    <>
      {data?.pharmacyServices ? (
        <div className="service-sec light-bg">
          <div className="container-custom">
            <h2 className="sec-title text-center">{data.pharmacyServices}</h2>
            <div className="servicesList service-mid ">
              {service?.map((data: any) => {
                return (
                  <>
                    <div className="block">
                      <div className="block-content">
                        {svgIcons.pharmacyService} {data.split("_").join(" ")}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="ctaBtn text-center mt-5">
              {data?.ctaforpharmacyservices?.link && data?.ctaforpharmacyservices?.label &&(
                <Link
                  href={data.ctaforpharmacyservices.link}
                  className="button before-icon"
                >
                      {svgIcons.BookAnAppointment}
                      {data.ctaforpharmacyservices.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Service;
