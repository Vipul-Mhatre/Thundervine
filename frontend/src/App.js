import React from 'react';
import { useState } from 'react'
import { NavBar } from './components/nav'
import { WeatherCard } from './components/weather-card'
import { ChevronDown } from "lucide-react"
import './App.css'

function App() {
  return (
    <div className="App">
      <main className="min-h-screen bg-[#1A2C35] bg-cover p-5">
      <NavBar />

      <div className="container mt-20 text-center">
        <h1 className="text-4xl font-bold text-white max-w-3xl mx-auto">
        "Measure today, sustain tomorrow: Track, reduce, and breathe easy with our <span className="text-[#4A7A8C]">Thundervine</span> CO2 Emission website!
        </h1>

        <div className="mt-16 flex flex-col gap-8">
          {/* <div className="flex gap-4 items-center justify-center">
            <input
              placeholder="Search Here"
              className="max-w-xs bg-[#1A2C35]/50 border-0 text-white placeholder:text-gray-400"
            />
            <button variant="ghost" className="text-white">
              Filters
            </button>
            <button variant="secondary" className="bg-[#1A2C35]/50 text-white border-0">
              Coldest
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button variant="secondary" className="bg-[#1A2C35]/50 text-white border-0">
              10°C - 20°C
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button variant="secondary" className="bg-[#1A2C35]/50 text-white border-0">
              Rainy
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </div> */}

          <div className="grid grid-cols-3 gap-6">
            <WeatherCard city="Tehran" temperature={35} windSpeed={11} time="19:52" condition="Cloudy" />
            <WeatherCard city="Qom" temperature={41} windSpeed={5} time="19:52" condition="Sunny" />
            <WeatherCard city="Gilan" temperature={23} windSpeed={23} time="19:52" condition="Rainy" />
          </div>
        </div>
      </div>
    </main>
      
    </div>
  );
}


export default App;