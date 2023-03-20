import * as React from "react";
import { useEffect, useRef, useState } from "react";



type Hours = {
  title?: string;
  hours: Hours;
  children?: React.ReactNode;
  additionalHoursText?: any;
  timezone?: any;
  reopenDate?: any;
};

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
};

type OpenIntervals = {
  start: string;
  end: string;
};

/**
 * todayIndex is a constant which stores the value of Day
 */
const todayIndex = new Date().getDay();

/**
 * Dynamically creates a sort order based on today's day.
 * it returns Day
 */

function getSorterForCurrentDay(): { [key: string]: number } {
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = [];
  for (let i = 0; i < dayIndexes.length; i++) {
    let dayIndex = dayIndexes[i];
    if (dayIndex - todayIndex >= 0) {
      dayIndex = dayIndex - todayIndex;
    } else {
      dayIndex = dayIndex + 7 - todayIndex;
    }
    updatedDayIndexes[i] = dayIndex;
  }

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/**
 * creates a sortbyday function used for sorting for current day.
 * @param week
 * @returns weeks
 */

function sortByDay(week: Week): Week {
  const tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[getSorterForCurrentDay()[k]] = { key: k, value: v };
  }

  const orderedWeek: Week = {};
  tmp.forEach((obj) => {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
}

/**
 *  creates a renderHours Constant
 * @param week
 * @returns html elememt (day)
 */
const renderHours = (week: Week) => {
  const dayDom: JSX.Element[] = [];
  var i = 0;
  for (const [k, v] of Object.entries(sortByDay(week))) {
    let a;
    let s;
    var dayDate = new Date();

    function join(t: any, a: any, s: any) {
      function format(m: any) {
        let f = new Intl.DateTimeFormat("en", m);
        return f.format(t);
      }
      return a.map(format).join(s);
    }
    function formatDate(date: any) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }
    if (i > 0) {
      dayDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000);
    }
    a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
    s = join(dayDate, a, " ");
    dayDate = s;
    dayDom.push(
      <DayRow
        key={k}
        dayDate={dayDate}
        dayName={k}
        day={v}
        isToday={isDayToday(k)}
        holidayhours={week.holidayHours}
      />
    );
    i++;
  }
  return <tbody className="font-normal">{dayDom}</tbody>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

/**
 * creates a Function ConvertTo12HourFormat Constant
 * @param time
 * @param includeMeridiem
 * @returns 12 hour format timing with AM PM
 */
function convertTo12HourFormat(time: string, includeMeridiem: boolean): string {
  const timeParts = time.split(":");
  let hour = Number(timeParts[0]);
  const minutesString = timeParts[1];
  hour = hour % 24 || 24; // Adjust hours
  return hour.toString() + ":" + minutesString;
}

type DayRow = {
  dayName: string;
  day: Day;
  isToday?: boolean;
  dayDate: any;
  holidayhours: any;
};

/**
 * Create DayRow for Hours feild
 * @param props
 * @returns html elements (current day,dayname, open intervals)
 */

const DayRow = (props: DayRow) => {
  const { dayName, day, isToday, dayDate, holidayhours } = props;
  const [myDataAccordintToMe, setMyDataAccordintToMe] = React.useState({});
  let a, s, holidayDate: any;
  function join(t: any, a: any, s: any) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  const holidayarray: any[] = [];
  const holidayopenintervals: any[] = [];
  const keysFromData = holidayhours
    ? holidayhours.map((holiday: any, index: Number) => {
        a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
        s = join(new Date(holiday.date), a, " ");
        holidayDate = s;
        holidayarray.push(holiday);
        return holidayDate;
      })
    : null;
  React.useEffect(() => {
    if (keysFromData) {
      var keysFromDataUnique = keysFromData.filter(
        (value: any, index: any, self: any) => {
          return self.indexOf(value) === index;
        }
      );
      var dataAccordintToMe = {};
      for (let index = 0; index < keysFromDataUnique.length; index++) {
        const element = keysFromDataUnique[index];
        dataAccordintToMe[element] = holidayarray.filter((fe: any) => {
          let adate = [
            { day: "numeric" },
            { month: "long" },
            { year: "numeric" },
          ];
          let matchdate = join(new Date(fe.date), adate, " ");
          return matchdate == element;
        });
      }
      setMyDataAccordintToMe(dataAccordintToMe);
    }
  }, []);

  let Status = false;
  for (var key in myDataAccordintToMe) {
    if (key.includes(dayDate)) {
      Status = true;
      holidayopenintervals.push(myDataAccordintToMe[key]);
    }
  }
  return (
    <tr className={isToday ? "currentDay" : ""}>
      {Status ? (
        <td className="capitalize text-left pl-1 pr-4 dayName">
          <span>
            <b className="checked"></b>
            {dayName} <b className="block text-sm font-normal">(Holiday)</b>
          </span>
        </td>
      ) : (
        <td className="capitalize text-left pl-1 pr-4 dayName">
          <span>
            <b className="checked"></b>
            {dayName}
          </span>
        </td>
      )}

      {!day.isClosed && (
        <td className="dayTime pr-1">
          {Status
            ? holidayopenintervals &&
              holidayopenintervals?.map((res: any) => {
                return res?.map((openint: any) => {
                  return (
                    <>
                      {openint.isClosed ? (
                        <div className="pr-1">
                          <span className="time-hours">Closed</span>
                        </div>
                      ) : (
                        openint?.openIntervals &&
                        openint?.openIntervals?.map((res: any) => {
                          return (
                            <div className="time-hours">
                              <span className="time-open-hours">
                                {res?.start}
                              </span>
                              <span className="dash">-</span>
                              <span className="time-close-hours">
                                {res?.end}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </>
                  );
                });
              })
            : day?.openIntervals?.map((res: any, index: Number) => {
                return (
                  <span className="time-hours">
                    <span className="time-open-hours">{res?.start}</span>
                    <span className="dash">-</span>
                    <span className="time-close-hours">{res?.end}</span>
                  </span>
                );
              })}
        </td>
      )}
      {day.isClosed && (
 Status ?
 <td className="capitalize text-left pl-1 pr-4">
   <span>
     {holidayopenintervals?.map((res: any) => {
       return (res?.map((openint: any) => {
         return (openint?.openIntervals?.map((res: any) => {
           return (
             <>
              <span className="time-hours">
               <span className="time-open-hours">{res?.start}</span><span className="dash">-</span><span className="time-close-hours">{res?.end}</span>
               </span>
             </>
           )
         }))
       }))
     })}
   </span>
 </td> :
       <td className="pr-1">
          <span className="time-hours">Closed</span>
        </td>
      )}
    </tr>
  );
};

/**
 * Hours component
 * @param props
 * @returns html elements (holiday hours with popup and opening hours)
 */
const Hours = (props: Hours) => {
  const [dateTime, setDateTime] = useState("");
  useEffect(() => {
    const id = setInterval(() => setDateTime(`${date}/${month}/${year}`), 30);
    const d = new Date(hours.reopenDate);
    let date: any = d.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    var month = d.toLocaleString('default', { month: 'long' });
    let year = d.getFullYear();
   
    return () => {
        clearInterval(id);
    }
}, []);
  const { title, hours} = props;
  const titleString = title ? (
    <div className="text-xl font-semibold mb-4">{title}</div>
  ) : (
    ""
  );

  return (
    <div>
      {titleString}
      <table>
        <thead className="sr-only">
          <tr>
            <th>Day of the Week</th>
            <th>Hours</th>
          </tr>
        </thead>
        {props?.hours && props?.hours.reopenDate ? (
          <tbody>
            <tr>
              <td>
                {props?.additionalHoursText} <br />
                The Store will reopen at {`${dateTime}`}
              </td>
            </tr>
          </tbody>
        ) : (
          <>{renderHours(hours)}</>
        )}
      </table>
    </div>
  );
};
export default Hours;
