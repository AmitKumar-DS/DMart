import * as React from "react";

type props = {
  amenities: any; 
};
const Amenities = (data: props) => {
  const {amenities} = data;
  // console.log("Amenitites", amenities);

  return (
    <div className="service-sec light-bg services-section">
      <div className="container-custom ">
        <h2 className="sec-title text-center">All Amenities</h2>
        <div className="service-inner-wrapper">
        <div className="servicesList">
          {amenities.map((am: any) => {         

            return (              
              <div className="block">
                <div className="block-content amenitites-block">
                  <div className="icon">
                    <img src={am?.amenitiesLogo?.url} alt="" title="" />
                  </div>
                  {am?.amenitiesTitle}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
