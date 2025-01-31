import React, { useState } from 'react';
import close from "../assets/close.svg";
import { Toaster, toast } from 'sonner';

const Timer = () => {
    const [timeList, setTimeList] = useState([]);
    const [inputHours, setInputHours] = useState("");
    const [inputMinutes, setInputMinutes] = useState("");
    const [inputSeconds, setInputSeconds] = useState("");

    const timeToSeconds = (hh, mm, ss) => {
        return hh * 3600 + mm * 60 + ss;
    };

    const secondsToTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const addTime = () => {
        const hh = parseInt(inputHours) || 0;
        const mm = parseInt(inputMinutes) || 0;
        const ss = parseInt(inputSeconds) || 0;

        if (hh >= 0 && mm >= 0 && mm < 60 && ss >= 0 && ss < 60) {
            const formattedTime = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
            setTimeList([...timeList, formattedTime]);
            setInputHours("");
            setInputMinutes("");
            setInputSeconds("");
        } else {
            toast("Invalid time format");
        }

        // Validation checks
        if (hh < 0 || hh > 24 || mm < 0 || mm >= 60 || ss < 0 || ss >= 60) {
            toast.error("Invalid time format! Hours must be 0-24, Minutes & Seconds must be 0-59.");
            return;
        }
    };

    const removeTime = (index) => {
        setTimeList(timeList.filter((_, i) => i !== index));
    };

    const totalSeconds = timeList.reduce((sum, time) => {
        const [hh, mm, ss] = time.split(":").map(Number);
        return sum + timeToSeconds(hh, mm, ss);
    }, 0);

    const totalTime = secondsToTime(totalSeconds);
    const totalHours = Math.floor(totalSeconds / 3600);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 font-istok_Web">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Time Calculator</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                    <input
                        type="number"
                        placeholder="HH"
                        value={inputHours}
                        onChange={(e) => setInputHours(e.target.value)}
                        className="w-16 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="MM"
                        value={inputMinutes}
                        onChange={(e) => setInputMinutes(e.target.value)}
                        className="w-16 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="SS"
                        value={inputSeconds}
                        onChange={(e) => setInputSeconds(e.target.value)}
                        className="w-16 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={addTime}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-xl text-white font-semibold shadow-md"
                    >
                        Add Time
                    </button>
                </div>
                <h3 className="text-xl font-semibold mb-2">Time Slab</h3>
                <ul className="flex flex-col items-center bg-gray-700 p-4 rounded-lg max-h-40 overflow-auto w-full flex-grow-0">
                    {timeList.length > 0 ? (
                        timeList.map((time, index) => (
                            <li key={index} className="flex justify-between items-center w-full px-4 py-2">
                                {time}
                                <button onClick={() => removeTime(index)}>
                                    <img src={close} className='w-5' />
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-400">No time added yet</p>
                    )}
                </ul>
                <div className="flex items-center justify-center text-xl font-bold mt-4 p-5 bg-gray-700 rounded-lg w-full gap-4">
                    <span>Total Time</span>
                    <span className='bg-gray-500 p-2 ml-2 rounded-md'>{totalTime}</span>
                </div>
                {totalHours >= 8 ? (
                    <div className='m-4 p-2 text-xl text-green-400'>Congrats you can logout 💨</div>
                ) : (
                    <div className='m-4 p-2 text-xl text-yellow-400'>
                        Remaining Time: {secondsToTime(8 * 3600 - totalSeconds)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Timer;

