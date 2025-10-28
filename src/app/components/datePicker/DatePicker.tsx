import './DatePicker.css';
import {useState} from "react";

type DatePickerProps = {
    onSelect: (date: Date) => void;
}

enum monthNames {
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
}

const getCalendarDays = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const weekStart = (startDay + 6) % 7;

    const prevMonthDays = [];
    for (let i = weekStart - 1; i >= 0; i--) {
        prevMonthDays.push(new Date(year, month, -i));
    }

    const thisMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
        thisMonthDays.push(new Date(year, month, i));
    }

    const totalCells = Math.ceil((prevMonthDays.length + daysInMonth) / 7) * 7;
    const nextMonthDays = [];
    for (let i = 1; prevMonthDays.length + thisMonthDays.length + nextMonthDays.length < totalCells; i++) {
        nextMonthDays.push(new Date(year, month + 1, i));
    }

    return [...prevMonthDays, ...thisMonthDays, ...nextMonthDays]
}

const DatePicker = ({onSelect}: DatePickerProps) => {
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date(Date.now()));

    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    const days = getCalendarDays(year, month);

    const handleSelect = (date: Date) => {
        onSelect(date);
    }

    return (
        <div className={"datePicker"}>
            <div className={"dateActions"}>
                <h4>{selectedMonth.getFullYear()} - {monthNames[selectedMonth.getMonth()]}</h4>
                <div className={"svgContainer"}>
                    <svg
                        onClick={() => {
                            setSelectedMonth(new Date(year, selectedMonth.getMonth() - 1, selectedMonth.getDate()));
                        }}
                        viewBox="-4 -4 32 32"
                        id="chevron"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 6.1428817,1.0000087 17.857157,12 6.1428817,22.999991"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            id="path1"/>
                    </svg>
                    <svg
                        onClick={() => {
                            setSelectedMonth(new Date(year, selectedMonth.getMonth() + 1, selectedMonth.getDate()));
                        }}
                        viewBox="-4 -4 32 32"
                        id="chevron"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M 6.1428817,1.0000087 17.857157,12 6.1428817,22.999991"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            id="path1"/>
                    </svg>
                </div>
            </div>
            <div className={"calendarGrid"}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className={"dayLabel"}>{day}</div>
                ))}

                {days.map((date) => {
                    const isCurrentMonth = date.getMonth() === month;
                    const isToday =
                        date.toDateString() === new Date().toDateString();
                    return (
                        <div key={date.toISOString()}
                             className={`dayCell ${isCurrentMonth ? "current" : "other"} ${isToday ? "today" : ""}`}
                             onClick={() => handleSelect(date)}>
                            {date.getDate()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DatePicker;