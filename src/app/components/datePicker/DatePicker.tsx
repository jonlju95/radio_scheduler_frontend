import {useState} from "react";
import {HiChevronLeft, HiChevronRight} from "react-icons/hi2";

type DatePickerProps = {
    onSelect: (date: Date) => void;
}

const monthNames = [
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
]

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
        <div className={"flex flex-col gap-3 w-full"}>
            <div className={"flex justify-between"}>
                <h4>{selectedMonth.getFullYear()} - {monthNames[selectedMonth.getMonth()]}</h4>
                <div className={"flex h-12"}>
                    <HiChevronLeft className={"me-12 cursor-pointer h-full w-full"}
                                   onClick={() => setSelectedMonth(new Date(year, selectedMonth.getMonth() - 1, selectedMonth.getDate()))}/>
                    <HiChevronRight className={"cursor-pointer h-full w-full"}
                                    onClick={() => setSelectedMonth(new Date(year, selectedMonth.getMonth() + 1, selectedMonth.getDate()))}/>
                </div>
            </div>
            <div className={"grid grid-cols-7 auto-rows-auto gap-1"}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day}
                         className={"h-8 flex items-center justify-center text-primary-500 font-bold mb-4"}>{day}</div>
                ))}
                {days.map((date) => {
                    const isCurrentMonth = date.getMonth() === month;
                    const isToday =
                        date.toDateString() === new Date().toDateString();
                    return (
                        <div key={date.toISOString()}
                             className={`flex items-center justify-center h-24 aspect-square 
                             rounded-[3rem] cursor-pointer transition-colors duration-75 
                             ease-in m-auto ${isCurrentMonth ? "hover:bg-secondary-500" +
                                 " hover:border hover:border-solid border-secondary-600" :
                                 "text-surface-500"} ${isToday ? "border border-solid border-secondary-600 font-semibold" : ""}`}
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