"use Client"

import axios from "axios";
import React, {useContext, createContext, useState, useEffect}  from "react";




const GlobalContext = createContext();
const GlobalContextUpdate = createContext();


export const GlobalContextProvider = ({children})=>{
    const [forecast, setForecast] = useState({})
    const [airQuality, setAirQuality] = useState({});






    const fetchForecast = async ()=>{
        try{
            const res = await axios.get("api/weather")
            console.log("res-weather:" , res.data)
            setForecast(res.data);
        } catch(error){
            console.log(error.message)
        }
    }





  // Air Quality
  const fetchAirQuality = async () => {
    try {
      const res = await axios.get("api/pollution");
      console.log("resAirPollution", res.data)
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air quality data: ", error.message);
    }
  };




    useEffect(()=>{
        fetchForecast();
        fetchAirQuality();
    },[])


    
    return(
        <GlobalContext.Provider value={{
            forecast,
            airQuality
            }}>
            <GlobalContextUpdate.Provider>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    )
};


export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = ()=> useContext(GlobalContextUpdate)