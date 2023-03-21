import * as React from "react";
import { Link } from "@yext/pages/components";
import { svgIcons } from "../../svg icons/svgIcon";
import nhs from "../../images/nhs-england-logo.png";
import wellimage from "../../images/makewellimage.jpg";
import RtfConverter from "@yext/rtf-converter";

type MakeWell = {
  makeWellYourPharmacyTitle: any;
  makeWellYourPharmacyDescription: any;
  makeWellYourPharmacySpecialities: any;
  makeWellYourPharmacyCTA: any;
  makeWellYourPharmacyImage: any;
  NHSLogo: any;
};
const MakeWellPharmacy = (props: MakeWell) => {
  const {
    makeWellYourPharmacyTitle,
    makeWellYourPharmacyDescription,
    makeWellYourPharmacySpecialities,
    makeWellYourPharmacyCTA,
    makeWellYourPharmacyImage,
    NHSLogo,
  } = props;

  if (makeWellYourPharmacyDescription) {
    var val = RtfConverter.toHTML(makeWellYourPharmacyDescription);
  }

  return (
    <>
      <>
        {makeWellYourPharmacyTitle && (
          <div className="bg-[#fff] w-full py-5 pt-0 md:pt-6 md:mb-20">
            <div className="relative container-lg px-12">
              <div className="flex relative flex-wrap flex-col-reverse">
                <div className="well-card-main">
                  <div className="plus-icon">{svgIcons.MakewellDMarticon}</div>
                  <div className="well-card-inner">
                    <h2 className="sec-title text-center">
                      {makeWellYourPharmacyTitle}
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: val ? val : "" }} />
                    <ul className="makeList">
                      {makeWellYourPharmacySpecialities?.map((list: any) => {
                        return (
                         <li>{list}</li>
                        );
                      })}
                    </ul>
                    
                      <div className="flex flex-wrap w-full items-end mt-5">
                      {makeWellYourPharmacyCTA?.link && makeWellYourPharmacyCTA?.label &&(
                          <Link
                            href={makeWellYourPharmacyCTA.link}
                            className="button !text-base !py-2 !px-7"
                          >
                            {makeWellYourPharmacyCTA.label}
                          </Link>
                        )}

                        <img
                          className="ml-auto mt-5 md:mt-0"
                          alt=""
                          src={NHSLogo?.url ? NHSLogo?.url : nhs}
                          width="200"
                        ></img>
                      </div>             
                  </div>
                </div>
                <div className="w-full md:w-[calc(100%_-_10rem)] lg:w-[calc(100%_-_21.563rem)] ml-auto">
                  <img
                    className="max-w-full w-full xl:h-[40.75rem] object-cover rounded-xl"
                    alt=""
                    src={
                      makeWellYourPharmacyImage?.url
                        ? makeWellYourPharmacyImage?.url
                        : wellimage
                    }
                  ></img>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default MakeWellPharmacy;
