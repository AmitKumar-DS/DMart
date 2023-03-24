import * as React from "react";
import "../index.css";
import {
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import {
  SearchHeadlessProvider,
  useSearchActions,
} from "@yext/search-headless-react";
import Header from "../components/layouts/header";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {
  AnswerExperienceConfig,
  slugify,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../config/globalConfig";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import LocatorBread from "../components/locatorPage/LocatorBread";
import Banner from "../components/locationDetails/LocatorBanner";
import favicon from "../images/favicon.ico";
import { BaseUrl } from "../config/globalConfig";
import { JsonLd } from "react-schemaorg";
import Footer from "../components/layouts/footer";

export const config: TemplateConfig = {
  stream: {
    $id: "locatorSearch",
    filter: {
      entityIds: ["global-data"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "c_headerLogo",
      "c_headerMenu",
      // "c_findAPharmacy",
      // "c_locatorBannerImage",
      // "c_locatorTitleH1",
      // "c_metaTitle",
      // "c_metaDescription",
      // "c_canonicalURL",
      // "c_robotsTag",
      // "c_footerLogo",
      // "c_footerLinks",
      // "c_copyrightText",
      // "c_footerDescription",
      // "c_footerLogos",
      // "c_socialIcons",
      // "c_cookieHeading",
      // "c_cookiePolicyDescription"
    ],
    localization: {
      locales: ["en","fr"],
      primary: false,
    },
  },
};

var url = "";
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (!document.slug) {
    let slugString = document.id + " " + document.name;
    let slug = slugify(slugString);
    url = `${document.meta.locale}/index.html`;
  } else {
    url = `${document.meta.locale}/${document.slug.toString()}.html`;
  }
  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  // let metaDescription = document._site.c_metaDescription
  //   ? document._site.c_metaDescription
  //   : "Find your nearest Well Pharmacy and know more about Well's NHS prescription delivery service, store timings and services.";
  // let metaTitle = document._site.c_metaTitle
  //   ? document._site.c_metaTitle
  //   : "Find your Nearest Well Pharmacy | NHS prescriptions online delivery";

  return {
    title: "DMart",
    charset: "UTF-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=0",
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
          // content: `${metaDescription}`,
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
          // content: `${
          //   document._site.c_robotsTag
          //     ? document._site.c_robotsTag
          //     : "noindex, nofollow"
          // }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          // href: `${
          //   document.c_canonical
          //     ? document.c_canonical
          //     : BaseUrl
          // }`,
        },
      },
      // og tags
      {
        type: "meta",
        attributes: {
          property: "og:title",
          // content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          // content: `${metaDescription}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: BaseUrl,
        },
      },

      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${
            document.logo
              ? document.logo.image.url
              : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"
          }`,
        },
      },
      /// twitter tag
      {
        type: "meta",
        attributes: {
          property: "twitter:title",
          // content: `${metaTitle}`,
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
          content: BaseUrl,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          // content: `${metaDescription}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          // content: `${
          //   document.logo
          //     ? document.logo.image.url
          //     : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"
          // }`,
        },
      },
    ],
  };
};

const locatorSearch: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  __meta,
  document,
}) => {
  const { _site } = document;
  let templateData = { document: document, __meta: __meta };
  // let userMyLocationBlockMessage = _site.c_pleaseUnblockYourLocation;
  // let NoLocationsAvailable = _site.c_noLocationFoundText;

  // const providerOptions: google.maps.MapOptions = {
  //   disableDefaultUI: true,
  // };
  // console.log("Sites is", _site);

  return (
    <>
      {/* <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Well Pharmacy",
          url: "https://www.well.co.uk/",
          logo: `${
            document.logo
              ? document.logo.image.url
              : "https://a.mktgcdn.com/p/JS-wqqEJIMNa50_6p_3-320_haZmByRLBpMVMT9vXDE/115x41.png"
          }`,
        }}
      /> */}
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <Header
            wellLogo={_site?.c_headerLogo?.headerLogo}
            headerLinks={_site.c_headerMenu?.headerMenu}
            // findPharmacy={_site.c_findAPharmacy}
          />
          <LocatorBread />
          {/* <Banner
            locatorTitleH1={_site.c_locatorTitleH1}
            locatorBannerImage={_site.c_locatorBannerImage}
          /> */}
          <SearchHeadlessProvider
            experienceKey={AnswerExperienceConfig.experienceKey}
            locale={AnswerExperienceConfig.locale}
            apiKey={AnswerExperienceConfig.apiKey}
            verticalKey={AnswerExperienceConfig.verticalKey}
            experienceVersion={AnswerExperienceConfig.experienceVersion}
            sessionTrackingEnabled={
              AnswerExperienceConfig.sessionTrackingEnabled
            }
            endpoints={AnswerExperienceConfig.endpoints}
          >
            <SearchLayout
              userMyLocationBlockMessage={undefined}
              NoLocationsAvailable={undefined}
            />
          </SearchHeadlessProvider>
          <Footer
            footerLogo={_site.c_footerLogo?.footerLogo}
            footerLinks={_site.c_footermenu?.footerMenu2}
          />
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};
export default locatorSearch;
