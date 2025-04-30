import React from "react";
import CalendarMobile from "./mobile/CalendarMobile";
import CalendarDesktop from "./desktop/CalendarDesktop";

const Calendar = () => {
  return (
    <>
      <div className="max-md:block hidden">
        <CalendarMobile />
      </div>
      <div className="max-md:hidden block">
        <CalendarDesktop />
      </div>
    </>
  );
};

export default Calendar;
