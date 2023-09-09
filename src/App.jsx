import React, { useEffect, useState } from "react";
import searchIcon from "/images/icon-search.svg"
import Maps from "./components/Map";
import InfoSegment from "./components/InfoSegment";

async function getLocation(ipAddress) {
  const url = ipAddress
    ? `https://ipapi.co/${ipAddress}/json/`
    : "https://ipapi.co/json/";
  const res = await fetch(url);
  return res.json();
}

function App() {
  const [inputIP, setInputIP] = useState(null);
  const [ipData, setIpData] = useState({
    ipAddress: "-",
    location: "-",
    timezone: "-",
    isp: "-",
    latitude: 0,
    longitude: 0,
  });
  const [error, setError] = useState({
    status: false,
    reason: null,
  });

  const fetchData = async () => {
    const data = await getLocation();
    console.log(data);
    return handleIpData(data);
  };
  const handleChange = (e) => {
    setInputIP(e.target.value);
  };
  const handleIpData = (data) => {
    const timezone = data.utc_offset;

    return setIpData({
      ipAddress: data.ip,
      location: data.city + ", " + data.country_code + " " + data.asn,
      timezone: timezone.slice(0, 3) + ":" + timezone.slice(3),
      isp: data.org,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getLocation(inputIP);
    if (data.error) {
      return setError({
        status: data.error,
        reason: data.reason,
      });
    }
    setError({
      status: false,
      reason: null,
    });
    return handleIpData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="h-[40%] bg-mobile md:bg-desktop bg-no-repeat bg-cover flex flex-col items-center px-8 relative ">
        <p className="py-8 text-3xl md:text-4xl font-medium text-black">
          IP Address Tracker
        </p>
        <form className="w-full md:w-1/2 relative rounded-2xl overflow-hidden">
          <input
            type="text"
            name="ip"
            placeholder="Search for any IP address or domain"
            value={inputIP}
            className="py-5 px-7 text-xl w-full outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-black hover:bg-neutral-700 absolute right-0 h-full px-8"
            onClick={handleSubmit}
          >
            <img src={searchIcon} alt="submit button" className="h-7 w-7" />
          </button>
        </form>
      </div>
      <div className="flex-grow w-screen relative">
        <div className="grid grid-flow-row md:grid-cols-4 md:w-3/4 rounded-2xl justify-center py-4 bg-white absolute top-0 left-0 right-0 md:left-1/2 md:right-autox -translate-y-1/2 md:-translate-x-1/2 z-50 mx-8 md:mx-0">
          {!error.status && (
            <>
              <InfoSegment title={"IP ADDRESS"} value={ipData.ipAddress} />
              <InfoSegment title={"LOCATION"} value={ipData.location} />
              <InfoSegment
                title={"TIMEZONE"}
                value={"UTC " + ipData.timezone}
              />
              <InfoSegment title={"ISP"} value={ipData.isp} />
            </>
          )}
          {error.status && <InfoSegment title={"Error"} value={error.reason} />}
        </div>
        <Maps lat={ipData.latitude} long={ipData.longitude} />
      </div>
    </div>
  );
}

export default App;
