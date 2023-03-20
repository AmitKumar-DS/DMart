import * as React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Link } from "@yext/pages/components";
import logo1 from "../../images/FooterLogo.png";
import RtfConverter from "@yext/rtf-converter";

type props = {
  footerLogo: any;
  footerLinks: any;
  footerDescription: any;
  footerLogos: any;
  copyrightText: any;
  socialicon: any;
  cookieHeading: any;
  cookiePolicyDescription: any;
  acceptAllCookies: any;
  customiseCookiePreferences: any;
};
const Footer = (props: any) => {
  const {
    footerLogos,
    copyrightText,
    footerLogo,
    footerLinks,
    footerDescription,
    socialicon,
    cookieHeading,
    cookiePolicyDescription,
  } = props;
  if (footerDescription) {
    var footer = RtfConverter.toHTML(footerDescription);
  }
  if (cookiePolicyDescription) {
    var Description = RtfConverter.toHTML(cookiePolicyDescription);
  }  
  return (
    <>
      <div className="subfooter-sec ">
        <div className="container-lg  ">
          <div className="subfooter-inner">
            <div className="footer-logo">
              <img
                src={footerLogo?.url || logo1}
                alt="Footer Logo"
                title="Footer Logo"
                loading="lazy"
              />
            </div>

            <div className="subfooter-links">
              <ul>
                {footerLinks.slice(0, 5).map((e: any) => {
                  return (
                    <li>
                      <Link href={e.link}>{e.label}</Link>
                    </li>
                  );
                })}
              </ul>

              <ul>
                {footerLinks.slice(5, 10).map((e: any, index: any) => {
                  return (
                    <li key={index}>
                      <Link href={e.link}>{e.label}</Link>
                    </li>
                  );
                })}
              </ul>

              <ul>
                {footerLinks.slice(10, 14).map((e: any, index: any) => {
                  return (
                    <li key={index}>
                      <Link href={e.link}>{e.label}</Link>
                    </li>
                  );
                })}
              </ul>             
            </div>
          </div>
          <hr></hr>
          <div className="copyright-content">
            <div
              dangerouslySetInnerHTML={{ __html: footer ? footer : "" }}
            ></div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="container-lg">
          <div className="footer_links">
            <div className="column">
              <p>{copyrightText}</p>
            </div>
            <div className="flex footer-company flex-row">
              {footerLogos?.map((e: any) => {
                return (
                  <Link href={e.clickthroughUrl}>
                    <div className="block">
                      <img
                        src={e.image.url}
                        alt="footerlogos"
                        title="footer-icons"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <CookieConsent
          buttonText={"Accept all cookies"}
          buttonStyle={{
            marginLeft: "100px",
          }}
        >
          <div className="text-xl font-bold pb-1">{cookieHeading}</div>
          <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: Description ? Description : "" }}
          ></div>
        </CookieConsent>
      </footer>
    </>
  );
};
export default Footer;
