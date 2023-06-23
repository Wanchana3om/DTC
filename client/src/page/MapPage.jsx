import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useState, useRef } from "react";
import axios from "axios";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

function MapPage() {
  const mapRef = useRef();
  const [points, setPoints] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const { logout } = useAuth();
  const [originalPoints, setOriginalPoints] = useState([]);

  const sortData = () => {
    let sortedData = [];

    if (sortAscending) {
      sortedData = [...filteredPoints].sort((a, b) => {
        const nameA = a.lm_tname.toLowerCase();
        const nameB = b.lm_tname.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      sortedData = [...originalPoints];
    }

    setFilteredPoints(sortedData);
    setSortAscending(!sortAscending);
  };

  const resetFilter = () => {
    setFilteredPoints(originalPoints);
  };

  useEffect(() => {
    const filterPoints = () => {
      if (searchQuery.trim() === "") {
        setFilteredPoints(points);
      } else {
        const filteredData = points.filter((data) =>
          data.lm_tname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPoints(filteredData);
      }
    };

    filterPoints();
  }, [searchQuery, points]);

  const handleOnFlyTo = (value) => {
    if (mapRef.current) {
      mapRef.current.flyTo(value, 15, {
        duration: 2,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:9875/points");
        setPoints(result.data);
        setOriginalPoints(result.data);
      } catch (error) {
        alert("failed to fetchData");
        return Promise.reject(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="w-screen h-screen bg-[#020b1f] flex justify-center items-center relative">
        <div
          onClick={() => {
            logout();
          }}
          className="absolute top-[30px] right-[20px] bg-red-600 py-2 px-3 rounded-md active:bg-[#850f09] duration-100 hover:bg-[#ff6868] transition-all cursor-pointer"
        >
          <p className="font-[600] text-white">LOGOUT</p>
        </div>
        <div className="w-[90%] h-[80%] bg-white  flex justify-between items-center rounded-xl shadow-2xl ">
          <div className="w-full h-full grid grid-cols-2  ">
            <div className=" rounded-lg my-8 ml-8 mr-4 ">
              <MapContainer
                ref={mapRef}
                style={{
                  height: "100%",
                }}
                center={[13, 100]}
                zoom={5}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>
            <div className=" rounded-lg my-8 mr-8 ml-4 shadow-2xl flex flex-col justify-between ">
              <div className="flex justify-between mt-2 items-center">
                <h1 className="text-[50px]  font-bold ml-5">
                  TABLE <span className="text-[#3d11aa]">AIRPORT</span>{" "}
                </h1>

                <div className="mr-5">
                  <label htmlFor="search" className="text-sm text-gray-500">
                    Search
                  </label>
                  <div className="w-[250px]">
                    <input
                      type="text"
                      className="w-full border-[1px] border-gray-500 rounded-md py-2 px-3"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full h-14 bg-[#04002c] flex">
                <div className="w-[15%] flex justify-center items-center">
                  <p onClick={resetFilter} className="text-white">
                    id
                  </p>{" "}
                </div>
                <div className="w-[25%] flex justify-center items-center">
                  <p onClick={sortData} className="text-white cursor-pointer">
                    LM_TNAME
                  </p>{" "}
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  <p className="text-white">LAT</p>{" "}
                </div>
                <div className="w-[20%] flex justify-center items-center">
                  <p className="text-white">LON</p>{" "}
                </div>
                <div className="w-[20%] flex justify-center items-center mr-5">
                  <p className="text-white">ACTION</p>{" "}
                </div>
              </div>

              <div className=" w-full h-[500px] overflow-y-auto scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300 ">
                {filteredPoints.map((data, index) => (
                  <div key={index} className="w-full h-20 flex border-t-[1px] ">
                    <div className="w-[15%] flex justify-center items-center">
                      <p className="text-gray-500">{data._id}</p>{" "}
                    </div>
                    <div className="w-[25%] flex justify-start items-center">
                      <p className="text-gray-500">{data.lm_tname}</p>{" "}
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                      <p className="text-gray-500">{data.lat}</p>{" "}
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                      <p className="text-gray-500">{data.lon}</p>{" "}
                    </div>
                    <div className="w-[20%] flex justify-center items-center">
                      <button
                        onClick={() => handleOnFlyTo([data.lat, data.lon])}
                        className=" bg-[#085ddc] w-[60%] text-white rounded-md font-semibold py-2 px-3  active:bg-[#085ddc] duration-100 hover:bg-[#0644a1] transition-all"
                      >
                        ZOOM
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-full h-14 bg-[#04002c] rounded-br-xl rounded-bl-xlrounded-br-xl rounded-bl-xl "></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MapPage;
