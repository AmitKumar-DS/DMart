import * as React from "react";
import hero from "../../images/LocatorBanner.png";

type props = {
  locatorBannerImage: any;
  locatorTitleH1: any;
};
const Banner = (props: any) => {
  const { locatorBannerImage, locatorTitleH1 } = props;
  return (
    <>
      <div className="hero mx-auto">
        <img
          className="heroBanner"
          src={
            locatorBannerImage?.image?.url
              ? locatorBannerImage?.image?.url
              : hero
          }
          alt="Well Pharmacy Banner"
        />
        <div className="hero-content">
          <h1>
            {locatorTitleH1 ? locatorTitleH1 : " Your Nearest Well Pharmacy "}
          </h1>
        </div>
      </div>
    </>
  );
};
export default Banner;
