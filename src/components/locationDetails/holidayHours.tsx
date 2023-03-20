import * as React from "react";
/**
 * Create HolidayHour for holiday feild
 * @param props
 * @returns html for holiday hours feild
 */
type Holidayhour = {
  isClosed: boolean;
};
const Holidayhour = (props: any) => {
  const date = new Date();
  let Day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${Day}`;
  let array: any = [];
  props.hours.map((i: any) => {
    let d1 = new Date(`${currentDate}`);
    let d2 = new Date(`${i.date}`);
    if (d2.getTime() >= d1.getTime()) {
      array.push(i);
    }
  });
  return (
    <>
      {array.map((res: any, index: Number) => {
        const weeks = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const d = new Date(res.date);
        let day = d.getDay();
        let date: any = d.getDate();
        if (date < 10) {
          date = "0" + date;
        }
        let month: any = d.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let year = d.getFullYear();

        return (
          <>
            <div className="pop-up-holyhrs">
              <div>{`${date}/${month}/${year}`}</div>
              <div>{weeks[day]}</div>
              {!res.isClosed && (
                <div className="">
                  {res.openIntervals?.map(
                    (openinterval: any, index: Number) => {
                      return (
                        <>
                          <div>
                            <span className="op-time">
                              {openinterval?.start}
                            </span>
                            <span className="spac-bx"> - </span>
                            <span className="cl-time">{openinterval?.end}</span>
                          </div>
                        </>
                      );
                    }
                  )}
                </div>
              )}
              {res.isClosed && <div>Closed</div>}
            </div>
          </>
        );
      })}
    </>
  );
};
export default Holidayhour;
