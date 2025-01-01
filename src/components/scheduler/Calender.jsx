import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import default styling

// Sample event list
const myEventsList = [
  {
    title: 'Meeting',
    start: new Date(2025, 0, 2, 10, 0),
    end: new Date(2025, 0, 2, 11, 0),
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 0, 2, 12, 0),
    end: new Date(2025, 0, 2, 13, 0),
  },
];

const CalendarComponent = () => {
  const localizer = momentLocalizer(moment);

  return (
    <div className="p-5">
      <div className="bg-purple-100 rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100vh" }}
          className="p-2 rounded-md bg-violet-100 border border-purple-900 text-purple-900"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
