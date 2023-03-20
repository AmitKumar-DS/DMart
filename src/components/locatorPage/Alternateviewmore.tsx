import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import * as React from 'react';
import { svgIcons } from "../../svg icons/svgIcon";
interface AlternateviewmoreProps {
  className: string,
  idName: string,
  buttonLabel: string,
}
export default function Alternateviewmore(props: AlternateviewmoreProps): JSX.Element | null {
  const { className, idName, buttonLabel } = props;  
  const searchAction = useSearchActions();
  const offset = useSearchState(state => state.vertical.offset) || 0;
  const ForAlternateresultoffset = useSearchState(state => state.vertical.offset) || 0;
  const limit = useSearchState(state => state.vertical.limit) || 20;
  let numResults:any = useSearchState(s => s.vertical.noResults?.allResultsForVertical.resultsCount) || 0;
 
  const executeSearchWithNewOffset = (newOffset: number) => {
    searchAction.setOffset(newOffset); 
    searchAction.executeVerticalQuery();
  }
  const maxPageCount = Math.ceil(numResults / limit);
  if (maxPageCount <= 1) {
    return null;
  }
  const pageNumber = (offset / limit) + 1; 
  return (
    <>  
      {pageNumber !== maxPageCount ?
            <div className="find-more more-location">              
              <button className={className} id={idName} onClick={() => executeSearchWithNewOffset(offset + limit)}>{svgIcons.ViewMore} {buttonLabel}</button>
            </div>
          :""} 
    </>
  );
}


