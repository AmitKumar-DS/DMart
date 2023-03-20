import * as React from "react";
import logo from "../../images/Logo.png";
import { svgIcons } from "../../svg icons/svgIcon";

type props = {
  wellLogo: any;
  headerLinks: any;
  findPharmacy: any;
};

const Header = (props: any) => {
  const { wellLogo, headerLinks, findPharmacy } = props;

  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });

  const toggle = () => {
    document.getElementById("body").classList.toggle("menu-opened");
  };

  return (
      <header className="site-header">
        <div className="container-lg">
          <div className="navbar">
            <div className="mobile-menu-btn lg:hidden">
              <button type="button" onClick={toggle} name="toggle-button">
                <span></span>
                <span></span>
              </button>
            </div>
            <div className="logo">
              <a href="#" className="">
                <img
                  src={wellLogo?.url}
                  alt="Well pharmacy Logo"
                  title="Well"
                />
              </a>
            </div>
            <div className="mid-nav">
              {headerLinks?.map((e: any) => {
                return (
                  <>
                    <div className="menu-item">
                      <a href={e.link} className="">
                        {e.label}
                      </a>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="header-right-link">
              <a href={findPharmacy?.link} className="">
                {svgIcons.searchicon}
                <span>{findPharmacy?.label}</span>
              </a>
            </div>
          </div>
        </div>
      </header>
  );
};
export default Header;
