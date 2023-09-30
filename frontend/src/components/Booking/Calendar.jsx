import React, {useEffect, useState} from 'react';
import {eachDayOfInterval, endOfMonth, format, getDay, isSameDay, startOfMonth} from 'date-fns';
import monthIcon from '../../assets/images/time-details/month-icon.svg';


const Calendar = ({onDateChange}) => {
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(startOfMonth(now));
    const [selectedDay, setSelectedDay] = useState(now);
    const [days, setDays] = useState([]);

    useEffect(() => {
        const start = startOfMonth(selectedMonth);
        const end = endOfMonth(selectedMonth);
        const dayList = eachDayOfInterval({start, end});
        const firstDayOfWeekIndex = getDay(start) - 1;
        const placeholders = Array.from({length: firstDayOfWeekIndex}).fill(null);
        setDays([...placeholders, ...dayList]);
    }, [selectedMonth]);

    const handleDayClick = (day) => {
        if (day) {
            setSelectedDay(day);
            onDateChange(day);  // Call the callback function with the selected day
        }
    };

    const onPrevMonth = () => {
        const prevMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
        setSelectedMonth(prevMonth);
    };

    const onNextMonth = () => {
        const nextMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1);
        setSelectedMonth(nextMonth);
    };

    return (
        <>
            {selectedMonth && selectedDay && (
                <div className="calendar-container">
                    <div className="month-selector">
                        <button className="month-selector__button month-selector__button--prev"
                                onClick={onPrevMonth}></button>
                        <div className="month-selector__wrap--left">
                            <img
                                src={monthIcon}
                                alt="Calendar Icon"
                                className="month-selector__icon"
                            />
                            <div className="month-selector__text">{format(selectedMonth, 'MMMM')}</div>
                        </div>

                        <div className="month-selector__wrap--right">
                            <button className="month-selector__button month-selector__button--next"
                                    onClick={onNextMonth}></button>
                        </div>
                    </div>
                    <ul className="weekdays-selector">
                        {weekdays.map((day, index) => (
                            <li key={index} className="weekdays-selector__weekday">{day}</li>
                        ))}
                    </ul>

                    <ul className="days-selector">
                        {days.map((day, index) => (
                            <li
                                key={index}
                                className={
                                    day ?
                                        (isSameDay(selectedDay, day) ? "days-selector__day days-selector__day--active" : "days-selector__day") :
                                        "days-selector__day days-selector__day--placeholder"
                                }
                                onClick={() => handleDayClick(day)}
                            >
                                {day ? format(day, 'd') : ''}
                            </li>
                        ))}
                    </ul>
                </div>
            )

            }

        </>
    )
};

export default Calendar;