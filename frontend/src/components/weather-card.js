import { Cloud, CloudSun, Sun, CloudLightning } from "lucide-react"
import './weather-card.css'


export function WeatherCard({ city, temperature, windSpeed, time, condition }) {
  
  

  return (
    <div className="weather-card border-0 p-6 text-white">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">{city}</h2>
            <p className="text-4xl font-bold mt-2">{temperature}°C</p>
          </div>
          
        </div>
        <div className="space-y-2 text-gray-300">
          <p>wind speed : {windSpeed} km</p>
          <p>Tuesday : {time}</p>
          <p>{condition}</p>
        </div>
      </div>
    </div>
  )
}

