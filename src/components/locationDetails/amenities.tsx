import * as React from "react";

type props = {
  amenities: any;
  title: any;
};
const Amenities = (data: props) => {
  const { amenities, title } = data;
console.log("Amenitites",amenities);

  return (
      <div className="service-sec light-bg services-section prem-design">
        <div className="container-custom ">
          <h2 className="sec-title text-center">{title}</h2>
          <div className="servicesList">
            {amenities.map((am: any) => {
              return (
                  <div className="block">
                    <div className="block-content amenitites-block">
                      <div className="icon">
                        <img src={am?.icon?.url} alt="" title="" />
                      </div>
                      {am}
                    </div>
                  </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default Amenities;
