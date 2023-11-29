// App.js
import { useRef, useState } from "react";

const Api_key = "4e9114a5484f4ef3924b15855e2461d0";

const App = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    // Weather types and their corresponding icons
    // ... (unchanged)
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod === 404 || data.cod === 400) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        } else {
          setShowWeather(
            WeatherTypes.filter(
              (weather) => weather.type === data.weather[0].main
            )
          );
          setApiData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-xl border-b p-1 border-gray-900 font-semibold uppercase flex-1"
          />
          <button onClick={fetchWeather}>
           
            <svg xmlns="http://www.w3.org/2000/svg"  alt="Search"
              className="w-8" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </div>
        <div className={`overflow-hidden transition-height ${showWeather ? "h-[15rem]" : "h-0"}`}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="Loading"
                className="w-14 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-6 mt-10">
                {apiData && (
                  <p className="text-xl font-semibold">
                    {apiData?.name + "," + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={showWeather[0]?.img}
                  alt={showWeather[0]?.type}
                  className="w-52 mx-auto"
                />
                <h3 className="text-2xl font-bold text-green-800">
                  {showWeather[0]?.type}
                </h3>
                {apiData && (
                  <div className="flex items-center justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                      alt="Temperature"
                      className="h-9 mt-1 text-green-200"
                    />
                    <h2 className="text-4xl font-extrabold text-green-600">
                      {apiData?.main?.temp}&#176;C
                    </h2>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
