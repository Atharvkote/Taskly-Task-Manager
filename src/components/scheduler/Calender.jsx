import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import default styling

const CalendarComponent = ({ status }) => {
  // Ensure dates are parsed correctly
  const myEventsList = status.map((item) => ({
    title: item.todo,
    start: new Date(item.starting_date),
    end: new Date(item.due_date),
    priority: item.priority, // Add priority for color coding
  }));

  const localizer = momentLocalizer(moment);

  // Function to set event styles based on priority
  const eventStyleGetter = (event) => {
    let backgroundColor;

    switch (event.priority) {
      case 'high':
        backgroundColor = '#FF6347'; // Red
        break;
      case 'medium':
        backgroundColor = '#FFD700'; // Yellow
        break;
      case 'low':
        backgroundColor = '#32CD32'; // Green
        break;
      default:
        backgroundColor = '#ADD8E6'; // Light blue for unspecified priority
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        color: 'white',
        border: 'none',
        padding: '5px',
      },
    };
  };

  return (
    <div className="p-5">
      <div className="bg-purple-100 rounded-lg shadow-lg">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100vh' }}
          className="p-2 rounded-md bg-violet-100 border border-purple-900 text-purple-900"
          eventPropGetter={eventStyleGetter} // Add style getter for events
        />
      </div>
    </div>
  );
};

CalendarComponent.propTypes = {
  status: PropTypes.arrayOf(
    PropTypes.shape({
      todo: PropTypes.string.isRequired,
      starting_date: PropTypes.string.isRequired, // or PropTypes.instanceOf(Date) if passed as Date
      due_date: PropTypes.string.isRequired, // or PropTypes.instanceOf(Date)
      priority: PropTypes.oneOf(['high', 'medium', 'low']).isRequired, // Ensure valid priority
    })
  ).isRequired,
};

export default CalendarComponent;
