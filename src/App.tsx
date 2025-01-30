import { useState } from 'react'
import './App.css'

const App = () => {
  type AgeType = {
    years: number | string;
    months: number | string;
    days: number | string;
  };

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [Age, setAge] = useState<AgeType>({
    years: "--",
    months: "--",
    days: "--",
  });

  // Error states
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");

  const calculateAge = () => {
    // Reset error messages
    setDayError("");
    setMonthError("");
    setYearError("");

    let hasError = false;

    // Basic range checks
    if (!day || +day < 1 || +day > 31) {
      setDayError("Must be a valid day");
      hasError = true;
    }
    if (!month || +month < 1 || +month > 12) {
      setMonthError("Must be a valid month");
      hasError = true;
    }
    // If the user enters a future year (or equal to this year but not a valid past date), mark error
    // We'll do a more precise check after constructing Date as well
    if (!year || +year > new Date().getFullYear()) {
      setYearError("Must be in the past");
      hasError = true;
    }

    // don't continue if basic checks failed :(
    if (hasError) return;

    // Construct the date
    const birthDate = new Date(+year, +month - 1, +day);
    const today = new Date();

    // Check if the constructed Date object matches the input values (catches invalid dates like Feb 30)
    if (
      birthDate.getDate() !== +day ||
      birthDate.getMonth() !== (+month - 1) ||
      birthDate.getFullYear() !== +year
    ) {
      setDayError("Must be a valid date");
      return;
    }

    // Ensure date is in the past
    if (birthDate.getTime() > today.getTime()) {
      setYearError("Must be in the past");
      return;
    }

    // Calculate age
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      // Get last day of the previous month
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setAge({
      years: ageYears,
      months: ageMonths,
      days: ageDays,
    });
  };

  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4 border'>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg" style={{ borderBottomRightRadius: '120px' }}>
          <div className="flex gap-3 mb-4 mr-16">
            {/* DAY */}
            <div className='flex-1'>
              <p className={`font-semibold text-xs ${dayError ? 'text-lightRed' : 'text-smokeyGrey'}`}>DAY</p>
              <input 
                type="number"
                placeholder='DD'
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className={`w-full p-3 border rounded-lg text-center text-lg font-semibold ${
                  dayError ? 'border-lightRed' : ''
                }`}
              />
              {dayError && <p className="text-lightRed text-[10px] mt-1">{dayError}</p>}
            </div>
            {/* MONTH */}
            <div className='flex-1'>
              <p className={`font-semibold text-xs ${monthError ? 'text-lightRed' : 'text-smokeyGrey'}`}>MONTH</p>
              <input 
                type="number"
                placeholder='MM'
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={`w-full p-3 border rounded-lg text-center text-lg font-semibold ${
                  monthError ? 'border-lightRed' : ''
                }`}
              />
              {monthError && <p className="text-lightRed text-[10px] mt-1">{monthError}</p>}
            </div>
            {/* YEAR */}
            <div className='flex-1'>
              <p className={`font-semibold text-xs ${yearError ? 'text-lightRed' : 'text-smokeyGrey'}`}>YEAR</p>
              <input 
                type="number"
                placeholder='YYYY'
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`w-full p-3 border rounded-lg text-center text-lg font-semibold ${
                  yearError ? 'border-lightRed' : ''
                }`}
              />
              {yearError && <p className="text-lightRed text-[10px] mt-1">{yearError}</p>}
            </div>
          </div>
          {/* <button
            onClick={calculateAge}
            className="bg-black text-white px-5 py-2 rounded-lg w-full hover:bg-gray-800"
          >
            Calculate Age
          </button> */}
          {/* Calculate Button */}
          <div className="flex">
            <hr className="my-auto border-t-2 border-gray-300 w-full" />
            <button onClick={calculateAge} className='bg-purple p-2 rounded-full flex justify-center items-center w-12 h-12 flex-none'>
              <img src="/icon-arrow.svg" alt="Arrow Icon" className="w-6 h-6" />
            </button>
          </div>
            {/* RESULTS */}
            <div className="mt-6 text-6xl font-extrabold">
                <p className="text-purple">
                  {String(Age.years).padStart(2, "0")} <span className="text-black">{+Age.years > 1 ? 'years' : 'year'}</span>
                </p>
                <p className="text-purple">
                  {String(Age.months).padStart(2, "0")} <span className="text-black">{+Age.months > 1 ? 'months' : 'month'}</span>
                </p>
                <p className="text-purple">
                  {String(Age.days).padStart(2, "0")} <span className="text-black">{+Age.days > 1 ? 'days' : 'day'}</span>
                </p>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
