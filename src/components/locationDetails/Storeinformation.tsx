import * as React from "react";
type storeinfo = {
  storeNo: any;
  regionNo: any;
};
const Storeinfo = (props: storeinfo) => {
  const { storeNo, regionNo } = props;
  return (
    <>
      <div className="store-license">
        {regionNo ? (
          <div className="store-info-row">
            <span className="label">Region No.:</span>
            <span className="numbers">{regionNo}</span>
          </div>
        ) : (
          <></>
        )}
        {storeNo ? (
          <div className="store-info-row">
            <span className="label">Store No.:</span>
            <span className="numbers">{storeNo}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Storeinfo;
