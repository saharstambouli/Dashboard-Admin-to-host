// import React, { useState } from 'react';
// import './Calendar.css'; // Import the custom CSS

// const Calendar = ({ rents, onAddRent, onClose }) => {
//   const [selectedDate, setSelectedDate] = useState('');

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (selectedDate) {
//       onAddRent({ date: selectedDate });
//       setSelectedDate('');
//     }
//   };

//   return (
//     <div className="calendar-container">
//       <h3 className="calendar-title">Rents</h3>
//       <ul className="rents-list">
//         {rents.map((rent, index) => (
//           <li key={index} className="rent-item">{new Date(rent.startDate).toLocaleDateString()}Start Date</li>,
//           <li key={index} className="rent-item">{new Date(rent.endDate).toLocaleDateString()}End Date</li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit} className="add-rent-form">
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={handleDateChange}
//           className="date-input"
//         />
//         <button type="submit" className="add-rent-button">
//           Add Rent
//         </button>
//       </form>
//       <button onClick={onClose} className="close-button">
//         Close Calendar
//       </button>
//     </div>
//   );
// };

// export default Calendar;
import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ rents, onAddRent, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getDaysInMonth = (year, month) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
      days.push(new Date(day));
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isReserved = (date) => {
    return rents.some((rent) => {
      const start = new Date(rent.startDate);
      const end = new Date(rent.endDate);
      return date >= start && date <= end;
    });
  };

  const handleDateClick = (date) => {
    if (isReserved(date)) return;

    if (!startDate) {
      setStartDate(date);
    } else if (!endDate) {
      if (date >= startDate) {
        setEndDate(date);
        onAddRent({
          startDate: startDate.toISOString().split('T')[0],
          endDate: date.toISOString().split('T')[0],
        });
        setStartDate(null);
        setEndDate(null);
      } else {
        alert('La date de fin doit être après la date de début.');
      }
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day.toISOString()}
            className={`calendar-day ${isReserved(day) ? 'reserved' : ''} ${
              startDate && day.toDateString() === startDate.toDateString() ? 'selected' : ''
            } ${endDate && day.toDateString() === endDate.toDateString() ? 'selected' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
      <button onClick={onClose} className="close-button">Close Calendar</button>
    </div>
  );
};

export default Calendar;
