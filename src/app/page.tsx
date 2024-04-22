"use client";
import React from "react";
import Image from "next/image";
import Svg1 from "../../public/icons8-weather.svg";
import Heart from "../../public/images/loveee (1).png";
import SearchIcon from "../../public/images/search.png";
import Highest from "../../public/images/icons8-sunrise-100.png";
import Location from "../../public/images/pointer.png";
import Lowestest from "../../public/images/lowest.png";
import { useState, useEffect } from "react";
import { Modal,Button } from "flowbite-react";

import { currentWeather,fiveDayFore,cityApi } from "./DataServices/DataService";
import { ICurrentWeather,I5DayForecast,ICity } from "./Interfaces/interface";




export default function Home() {

 // let localStorageData = getLocalStorage();

  // I am declaring  the modal and attching a bool statement so wehn button is clicked is opens and closes
  const [openModal, setOpenModal] = useState(false);
  //setting city to emppty string
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState(null);
  //why do you set it to null here
  const [currentLoc, setCurrentLoc] = useState<ICurrentWeather | null>(null);
  // setting the five day inferface to the five day  
  const [fiveDay, setFiveDay] = useState<I5DayForecast>();
  // setting string to 
  const [search, setSearch] = useState<string>("");

  const handleFav = () => {
   localStorage.setItem('Favorites', JSON.stringify(currentLoc!.name));

  }
  function getLocalStorage(){
    // get all of the values that are stored in Favorites in local storage
    let localStorageData = localStorage.getItem('Favorites');
    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}

 
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
//getting the days but creating a function that stores days into date 
  const getDays = (date: string) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayFunc = new Date(date).getDay();
    return days[dayFunc];
  };
  const getFirst = (list: any[]): any[] => {
    const firstForecasts: any[] = [];
    let prevDay = "";

    list.forEach((day: any) => {
      const dayOfWeek = new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
      });
      if (dayOfWeek !== prevDay) {
        firstForecasts.push(day);
        prevDay = dayOfWeek;
      }
    });

    return firstForecasts;
  };

  const fetchData = async (latitude: number, longitude: number) => {
    const data = await currentWeather(latitude, longitude);
    const dataFive = await fiveDayFore(latitude, longitude);

    setCurrentLoc(data);
    setFiveDay(dataFive);

    console.log(data);
    console.log(dataFive);
  };

  const current = async () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchData(latitude, longitude);
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = async (cityName: string) => {
    const cities: ICity[] = await cityApi(cityName);

    if (cities.length > 0) {
      const city: ICity = cities[0];
      const getCurrent = await currentWeather(city.lat, city.lon);
      const getFive = await fiveDayFore(city.lat, city.lon);

      setCurrentLoc(getCurrent);
      setFiveDay(getFive);
    } else {
      console.log("No Matching Cities Found!");
    }
  };

  useEffect(() => {
    let localStorageData = localStorage.getItem('Favorites');
    current();
  }, []);

  return (
    
    <div>
      <div>
   
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
        {/* {localStorageData} */}
       
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
       
        </Modal.Footer>
      </Modal>
      </div>
      <div className="overflow-hidden min-h-screen w-full Bg   flex flex-col  md:items-center">
        <div className="py-10 px-10 flex flex-row flex-wrap ">
          <h1 className="px-0 lg:text-2xl">Search City: </h1>
          <form>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  {
                    handleSearch(search);
                  }
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              className="searchBar pl-8 "
              type="search"
              aria-label="Search"
            ></input>
            <Image
              alt="search Icon"
              className="wrapper flex p-0 md:ml-16 pt-1 justify-start"
              src={SearchIcon}
              height={30}
              width={30}
            />
          </form>

          <h1 className="lg:text-3xl text:white pl-3  mt-5 md:mt-0 md:pl-16">
            {formattedDate}{" "}
          </h1>
          <div className="  text-end">
            <h1 className="  text-end pr-0 lg:text-2xl mt-5 md:mt-0 md:pt-0">
              {" "}
              Favorites
            </h1>
          </div>
<h1 onClick={() => setOpenModal(true)}>click here to see modal</h1>
          <button onClick={handleFav} className="mt-5 md:mt-0 ">
            {" "}
          
            <Image alt="heart Icon" src={Heart} height={30} width={30} />
          </button>
        </div>

       
       
        <div className="boxBg  mt-32 rounded-lg flex justify-center   text-center">
          <div className="grid grid-cols-5 text-white mt-5 pr-7 ">
            {getFirst(fiveDay?.list || []).map(
              (day: any, index: number) =>
                index !== 0 && (
                  <div key={index} className=" rounded-2xl w-24 md:w-48  p-2">
                    <p className="text-center text-based font-bold pr-3">
                      {" "}
                      {getDays(day.dt_txt)}{" "}
                    </p>

                    <div className="flex justify-center">
                      <img
                        className=""
                        src={
                          "https://openweathermap.org/img/wn/" +
                          day.weather[0].icon +
                          "@2x.png"
                        }
                      />
                    </div>

                    <p className="text-center text-2xl">
                      {" "}
                      {Math.round(day.main.temp_max)}°{" "}
                    </p>
                    <div className="flex justify-center">
                      <Image
                        className=" "
                        alt="WeatherIcon"
                        src={Lowestest}
                        height={48}
                      />
                    </div>
                    <p className="text-center text-2xl">
                      {" "}
                      {Math.round(day.main.temp_min)}°{" "}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
