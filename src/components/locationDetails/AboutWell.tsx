import * as React from "react";
import { Link } from "@yext/pages/components";
import RtfConverter from "@yext/rtf-converter";
type AboutSection = {
  storeDescriptionTitle: any;
  storeDescriptionImage: any;
  storeDescriptionText: any;
  storeDescriptionCTA: any;
};
const About = (props: AboutSection) => {
  const {
    storeDescriptionTitle,
    storeDescriptionImage,
    storeDescriptionText,
    storeDescriptionCTA,
  } = props;
  if (storeDescriptionText) {
    var Desc = RtfConverter.toHTML(storeDescriptionText);
  }
  return (
    <>
      {storeDescriptionTitle && (
        <div className="container-lg bg-[#fff]  md:py-5 md:pt-6 ">
          <h2 className="sec-title !mb-5 block lg:hidden text-center">
            {storeDescriptionTitle}
          </h2>
          <div className="ab-sec">
            <div className="flex flex-wrap">
              {storeDescriptionImage ? (
                <div className="w-full lg:w-1/2 xl:w-[43%] h-[268px] md:h-[340px] lg:h-[416px] one">
                  <img
                    className="max-w-full rounded-xl w-full h-full"
                    alt=""
                    src={storeDescriptionImage?.url}
                  ></img>
                </div>
              ) : (
                ""
              )}

              <div
                className={
                  storeDescriptionImage
                    ? "w-full lg:w-1/2 xl:w-[57%] pt-6 lg:pt-0 lg:pl-10"
                    : "w-full lg:w-1/2 xl:w-3/5 pt-0 lg:pl-10 only-content"
                }
              >
                <h2 className="sec-title !mb-5 hidden lg:block">
                  {storeDescriptionTitle}
                </h2>     
                  <div className="leading-7 text-base text-gray-700 about-content"
                    dangerouslySetInnerHTML={{ __html: Desc ? Desc : "" }}
                  ></div>
              
                <div className="space-x-5">
                {storeDescriptionCTA?.link && storeDescriptionCTA?.label &&(
                  <Link
                    href={storeDescriptionCTA.link}
                    className="button mt-5 lg:mt-10 !text-base"
                  >
                    {storeDescriptionCTA.label}
                  </Link>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
