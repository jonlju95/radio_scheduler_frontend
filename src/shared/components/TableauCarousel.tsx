import {HiChevronLeft, HiChevronRight} from "react-icons/hi2";
import {useState} from "react";
import dayAbbreviations from "../utils/mappers/dayAbbreviations.ts";
import monthAbbreviations from "../utils/mappers/monthAbbreviations.ts";

const TableauCarousel = () => {
    const [dateList, setDateList] = useState<Date[]>(() => {
        const today = new Date();
        const dateList: Date[] = [];

        for (let i = -6; i <= 6; i++) {
            dateList.push(new Date(new Date().setDate(today.getDate() + i)));
        }

        return dateList;
    });

    const goForward = () => {
        setDateList(prev => {
            const lastDate = prev[prev.length - 1];
            const next = new Date(lastDate);
            next.setDate(lastDate.getDate() + 1);

            return [...prev.slice(1), next];
        });
    }

    const goBackward = () => {
        setDateList(prev => {
            const firstDate = prev[0];
            const previous = new Date(firstDate);
            previous.setDate(firstDate.getDate() - 1);

            return [previous, ...prev.slice(0, prev.length - 1)];
        });
    }

    const goToDate = (date: Date) => {
        setDateList(() => {
            const dateList: Date[] = [];

            for (let i = -6; i <= 6; i++) {
                dateList.push(new Date(new Date().setDate(date.getDate() + i)));
            }

            return [...dateList];
        });
    }

    return (
        <div className={"flex justify-between items-center py-4 px-32 h-16 fixed inset-x-0 top-20 bg-surface-200-800"}>
            <HiChevronLeft className={"w-8 h-8 flex items-center justify-center bg-surface-50-950 border" +
                " border-surface-100-900 rounded-3xl cursor-pointer shadow-sm p-1.5"}
                           onClick={() => goBackward()}/>
            {dateList.map((date, index) => (
                <p key={date.toDateString()}
                   className={`${index === 6 ? 'font-bold' : 'hover:font-bold hover:cursor-pointer'} min-w-24 text-center`}
                   onClick={() => goToDate(date)}>
                    {dayAbbreviations[date.getDay()]} {date.getDate()} {monthAbbreviations[date.getMonth()]}</p>
            ))}
            <HiChevronRight className={"w-8 h-8 flex items-center justify-center bg-surface-50-950 border" +
                " border-surface-100-900 rounded-3xl cursor-pointer shadow-sm p-1.5"}
                            onClick={() => goForward()}/>
        </div>
    );
};

export default TableauCarousel;