import { useState } from 'react'
import './App.css'

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [Age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const calculateAge = () => {
    if (!day || !month || !year) return;
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  return (
    <>
      <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4 border'>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
          <div className="flex gap-3 mb-4">
            <input 
              type="number"
              placeholder='Day'
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-1/3 p-3 border rounded-lg text-center text-lg"
            />
            <input 
              type="number"
              placeholder='Month'
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-1/3 p-3 border rounded-lg text-center text-lg"
            />
            <input 
              type="number"
              placeholder='Year'
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-1/3 p-3 border rounded-lg text-center text-lg"
            />
          </div>
          <button
            onClick={calculateAge}
            className="bg-black text-white px-5 py-2 rounded-lg w-full hover:bg-gray-800"
          >
            Calculate Age
          </button>
          {Age && (
            <div className="mt-6 text-center text-3xl font-bold">
              <p className="text-purple-600">{Age.years} <span className="text-black">years</span></p>
              <p className="text-purple-600">{Age.months} <span className="text-black">months</span></p>
              <p className="text-purple-600">{Age.days} <span className="text-black">days</span></p>
            </div>
          )}
        </div>
        <h1 className='text-red'>App</h1>
      </div>
    </>
  )
}

export default App
