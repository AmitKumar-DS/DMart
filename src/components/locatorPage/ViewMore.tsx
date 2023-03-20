import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import * as mapboxgl from "mapbox-gl";
import * as React from "react";
import { svgIcons } from "../../svg icons/svgIcon";

interface viewMoreProps {
  className: string;
  idName: string;
  buttonLabel: string;
  zoomLevel: number;
  setZoomLevel: any;
}

export default function ViewMore(props: viewMoreProps): JSX.Element | null {
  const { className, idName, buttonLabel } = props;
  const searchAction = useSearchActions();
  const [zoomname, setZoomname] = React.useState(9);
  const offset = useSearchState((state) => state.vertical.offset) || 0;
  const limit = useSearchState((state) => state.vertical.limit) || 10;
  const numResults =
    useSearchState((state) => state.vertical.resultsCount) || 0;

  const executeSearchWithNewOffset = (newOffset: number) => {
    searchAction.setOffset(newOffset);
    searchAction.executeVerticalQuery();
  };
  const maxPageCount = Math.ceil(numResults / limit);
  if (maxPageCount <= 1) {
    return null;
  }
  const pageNumber = offset / limit + 1;

  return (
    <>
      {pageNumber !== maxPageCount ? (
        <div className="find-more more-location">
          <button
            className={className}
            id={idName}
            onClick={() => {
              executeSearchWithNewOffset(offset + limit);
              // if (zoomname && props.zoomLevel < 6) {
              //   props.setZoomLevel(props.zoomLevel - 1);
              // }
              // setZoomname(6);
            }}
          >
            {svgIcons.ViewMore} {buttonLabel}
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
