import * as React from "react";
import BreadCrumbs from "../components/layouts/BreadCrumb";
import favicon from "../images/favicon.png";
import hero from "../images/hero.jpg";
import "../index.css";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import { slugify, BaseUrl } from "../config/globalConfig";

import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "country",
    filter: {
      // savedFilterIds: ["dm_wellpharmacy-directory_address_countrycode"],
      entityTypes:["ce_country"],      
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "address",

      // "c_canonicalURL",
      // "c_metaDescription",
      // "c_metaTitle",
      // "c_robotsTag",

      "dm_directoryChildren.name",
      "dm_directoryChildren.id",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.meta.entityType",

      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.meta.entityType",

      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.meta.entityType",

      "dm_directoryParents.id",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      // "c_topHeading",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};
export const getPath: GetPath<TemplateProps> = ({ document }) => {

  let url = "";

  let slugString = document.id + " " + document.name;
  let slug = slugify(slugString);

  if (typeof document.slug == "undefined") {

    let slugStrings: any = [];
    if (typeof document.dm_directoryParents != "undefined") {
      document.dm_directoryParents?.map((e: any, index: number) => {

        if (e.meta.entityType.id != "ce_root") {
          if (typeof e.slug == "undefined") {
            slugStrings.push(slugify(e.name));
          } else {
            slugStrings.push(e.slug);
          }
        }

      });
    }

    if (slugStrings.length > 0) {
      url = `${slugStrings.join("/")}${slug}.html`;
    } else {
      url = `${slug}.html`;
    }

  } else {
    let slugStrings: any = [];

    if (typeof document.dm_directoryParents != "undefined") {
      document.dm_directoryParents?.map((e: any) => {

        if (e.meta.entityType.id != "ce_root") {
          if (typeof e.slug == "undefined") {
            slugStrings.push(slugify(e.name));
          } else {
            slugStrings.push(e.slug);
          }
        }

      });
    }

    if (slugStrings.length > 0) {
      url = `${slugStrings.join("/")}/${document.slug.toString()}.html`;
    } else {
      url = `${document.slug.toString()}.html`;
    }

  }

  return url;

};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,



}): HeadConfig => {

  let url = "";
  if (!document.slug) {
    let slugString = document.id + " " + document.name;
    let slug = slugify(slugString);
    url = `${slug}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }

  let metaDescription = "document.c_metaDescription"
    ? document.c_metaDescription
    : `Get the best health services, free prescription deliveries, and consultations in ${document.name}.`;
  let metaTitle = "document.c_metaTitle"
    ? document.c_metaTitle
    : `Find all Well Pharmacy Stores in ${document.name}`;



  return {
    title: metaTitle,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/png",
          href: favicon,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Well Pharma",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: `${document.c_robotsTag
            ? document.c_robotsTag
            : "noindex, nofollow"
            }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${document.c_canonical
            ? document.c_canonical
            : BaseUrl + "/" + url
            }`,
        },
      },

      //og tag
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: BaseUrl + "/" + url,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${document.logo ? document.logo.image.url : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"}`,
        },
      },
      //twitter tag
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:url",
          content: BaseUrl + "/" + url,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: `${document.logo ? document.logo.image.url : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"}`,
        },
      },
    ],
  };
};

const Country: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,

}) => {
  // const { dm_directoryChildren, address, dm_directoryParents, c_topHeading } = document;
  const { dm_directoryChildren, address, dm_directoryParents} = document;
  const { name, _site, slug } = document;

  let ce_cities: any = [];
  const childrenDivs = dm_directoryChildren ? dm_directoryChildren.map((entity: any) => {
    let detlslug;

    if (typeof entity.dm_directoryChildren != "undefined") {

      if (entity.meta.entityType.id !== 'ce_city') {        
      
        
        if (entity.dm_baseEntityCount == 1) {
          entity.dm_directoryChildren.map((res: any) => {

            let detlslug1 = "";

            if (!res.slug) {
              let slugString = res.id + " " + res.name;
              let slug = slugify(slugString);
              detlslug1 = `${slug}.html`;
            } else {
              detlslug1 = `${res.slug.toString()}.html`;
            }
            if (res.meta.entityType.id == 'ce_city') {
              detlslug1 = "gb/" + detlslug1;
            } else {
              detlslug1 = detlslug1;
            }

        

            res.dm_directoryChildren ? res.dm_directoryChildren.map((detl: any) => {

              if (!detl.slug) {
                let slugString = detl.id + " " + detl.name;
                let slug = slugify(slugString);
                detlslug1 = `${slug}.html`;
              } else {
                detlslug1 = `${detl.slug.toString()}.html`;
              }

              detlslug = detlslug1;

            }) : detlslug = detlslug1;


          })
        }
        else {
          detlslug = slug + "/" + entity.slug + ".html";
        }

        return (
          <li className=" storelocation-category">
            <a
              key={entity.slug}
              href={BaseUrl + "/" + detlslug}
            >
              {entity.name} ({entity.dm_baseEntityCount})
            </a>
          </li>
        )

      }else{
        ce_cities.push(entity);
      }

    }


  }) : null;

  
  /***
   * for city when not have region in locations
   * 
   */
  // console.log('ce_cities', ce_cities);

  const citiesList = ce_cities.map((city: any) => {

    let cityslug = "";

    if(city.dm_baseEntityCount == 1){

      city.dm_directoryChildren ? city.dm_directoryChildren.map((location: any) => {

        if (!location.slug) {
          let slugString = location.id + " " + location.name;
          let slug = slugify(slugString);
          cityslug = `${slug}.html`;
        } else {
          cityslug = `${location.slug.toString()}.html`;
        }
      }) : "";
    
    }else{  
      if (!city.slug) {
        let slugString = city.id + " " + city.name;
        let slug = slugify(slugString);
        cityslug = `${slug}.html`;
      } else {
        cityslug = `${city.slug.toString()}.html`;
      }
      if (city.meta.entityType.id == 'ce_city') {
        cityslug = "gb/" + cityslug;
      } 
   }

    return (
      <li className=" storelocation-category">
        <a
          key={city.slug}
          href={BaseUrl + "/" + cityslug}
        >
          {city.name} ({city.dm_baseEntityCount})
        </a>
      </li>
    )

  });

  return (
    <>


        <Header
          wellLogo={_site.c_headerLogo?.headerLogo}
          headerLinks={_site.c_headerMenu?.headerMenu}
          // findPharmacy={_site.c_findAPharmacy}
        />
      {/* <BreadCrumbs
        name={name}
        parents={dm_directoryParents}
        address={address}
      ></BreadCrumbs> */}

      <div className="hero">
        <img className="heroBanner" src={hero} alt="" />
        <div className="hero-content">
          <h1 className="small-heading"><strong> All Regions of {name}{" "}</strong></h1>
        </div>
      </div>

      <div className="content-list">
        <div className="container">
          <ul className="region-list">
            {childrenDivs}
          </ul>
          {/* {ce_cities.length > 0 ? (<><h2 className="sec-title text-center mt-5">{c_topHeading ? c_topHeading : "Well Pharmacy in the cities of "+name}</h2><ul className="city-list region-list"> {citiesList}</ul></>) : ""} */}
        </div>
      </div>

      <Footer
          footerLogo={_site.c_footerLogo?.footerLogo}
          footerLinks={_site.c_footermenu?.footerMenu2}
        />

    </>
  );
};

export default Country;
