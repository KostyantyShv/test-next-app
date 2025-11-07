import React from "react";
import CalendarMobile from "./mobile/CalendarMobile";
import CalendarDesktop from "./desktop/CalendarDesktop";

const Calendar = () => {
  return (
    <>
      <div className="max-md:block hidden max-md:mt-16">
        <CalendarMobile />
      </div>
      <div className="max-md:hidden block">
        <CalendarDesktop />
      </div>
    </>
  );
};

export default Calendar;
