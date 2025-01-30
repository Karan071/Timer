import React, {useState} from 'react'

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
            alert("Invalid time input! Ensure HH >= 0, 0 <= MM < 60, and 0 <= SS < 60.");
        }
    };

    const totalSeconds = timeList.reduce((sum, time) => {
        const [hh, mm, ss] = time.split(":").map(Number);
        return sum + timeToSeconds(hh, mm, ss);
    }, 0);

    const totalTime = secondsToTime(totalSeconds);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Time Counter</h2>
                <div className="flex gap-2 mb-4">
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
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md"
                    >
                        Add Time
                    </button>
                </div>
                <h3 className="text-lg font-semibold mb-2">Time List:</h3>
                <ul className="bg-gray-700 p-4 rounded-lg max-h-40 overflow-auto">
                    {timeList.length > 0 ? (
                        timeList.map((time, index) => (
                            <li key={index} className="py-1">{time}</li>
                        ))
                    ) : (
                        <p className="text-gray-400">No time added yet</p>
                    )}
                </ul>
                <h2 className="text-xl font-bold mt-4">Total Time: {totalTime}</h2>
            </div>
        </div>
    );
}

export default Timer
