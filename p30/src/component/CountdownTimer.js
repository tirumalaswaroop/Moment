import React, { useState, useEffect } from "react";
import moment from "moment";

let CountdownTimer = () => {
  let [targetDate, setTargetDate] = useState(moment());
  let [timeRemaining, setTimeRemaining] = useState({});
  let [status, setStatus] = useState("present");

  useEffect(() => {
    let calculateTimeRemaining = () => {
      let now = moment();
      let distance = targetDate.diff(now);

      if (distance < 0) {
        setStatus("past");
        setTimeRemaining({
          years: now.diff(targetDate, "years"),
          months: now.diff(targetDate, "months") % 12,
          days: now.diff(targetDate, "days") % 30,
          hours: now.diff(targetDate, "hours") % 24,
          minutes: now.diff(targetDate, "minutes") % 60,
          seconds: now.diff(targetDate, "seconds") % 60,
          milliseconds: now.diff(targetDate, "milliseconds") % 1000,
        });
      } else if (distance === 0) {
        setStatus("present");
      } else {
        setStatus("future");
        setTimeRemaining({
          years: targetDate.diff(now, "years"),
          months: targetDate.diff(now, "months") % 12,
          days: targetDate.diff(now, "days") % 30,
          hours: targetDate.diff(now, "hours") % 24,
          minutes: targetDate.diff(now, "minutes") % 60,
          seconds: targetDate.diff(now, "seconds") % 60,
          milliseconds: targetDate.diff(now, "milliseconds") % 1000,
        });
      }
    };

    const timerId = setInterval(calculateTimeRemaining, 100);
    calculateTimeRemaining();

    return () => clearInterval(timerId);
  }, [targetDate]);

  const handleDateChange = (e) => {
    setTargetDate(moment(e.target.value));
  };

  return (
    <div>
      <div className="clockInput">
        <input
        className="time"
          type="datetime-local"
          value={targetDate.format("YYYY-MM-DDTHH:mm")}
          onChange={handleDateChange}
        />
      </div>
      <div className="container">
        {status === "past" && (
          <>
            <div className="clockColumn">
              <p>-{timeRemaining.years}</p>
              <p className="clockLabel">Years</p>
            </div>
            <div className="clockColumn">
              <p>-{timeRemaining.months}</p>
              <p className="clockLabel">Months</p>
            </div>
            <div className="clockColumn">
              <p>-{timeRemaining.days}</p>
              <p className="clockLabel">Days</p>
            </div>
            <div className="clockColumn">
              <p>-{timeRemaining.hours}</p>
              <p className="clockLabel">Hours</p>
            </div>
            <div className="clockColumn">
              <p>-{timeRemaining.minutes}</p>
              <p className="clockLabel">Minutes</p>
            </div>
            <div className="clockColumn">
              <p>-{timeRemaining.seconds}</p>
              <p className="clockLabel">Seconds</p>
            </div>
            <div className="clockColumn">
              <p>-{timeRemaining.milliseconds}</p>
              <p className="clockLabel">Milliseconds</p>
            </div>
          </>
        )}
        {status === "present" && (
          <div>
            <p>Current Time: {moment().format("YYYY-MM-DD HH:mm:ss.SSS")}</p>
          </div>
        )}
        {status === "future" && (
          <>
            <div className="clockColumn">
              <p>{timeRemaining.years}</p>
              <p className="clockLabel">Years</p>
            </div>
            <div className="clockColumn">
              <p>{timeRemaining.months}</p>
              <p className="clockLabel">Months</p>
            </div>
            <div className="clockColumn">
              <p>{timeRemaining.days}</p>
              <p className="clockLabel">Days</p>
            </div>
            <div className="clockColumn">
              <p>{timeRemaining.hours}</p>
              <p className="clockLabel">Hours</p>
            </div>
            <div className="clockColumn">
              <p>{timeRemaining.minutes}</p>
              <p className="clockLabel">Minutes</p>
            </div>
            <div className="clockColumn">
              <p>{timeRemaining.seconds}</p>
              <p className="clockLabel">Seconds</p>
            </div>
            <div className="clockColumn">
              <p>{timeRemaining.milliseconds}</p>
              <p className="clockLabel">Milliseconds</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
