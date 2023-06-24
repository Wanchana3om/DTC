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
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setsearch] = useState("");
  const [sortDirection, setSortDirection] = useState(true);
  const [limitPage, setLimitPage] = useState(false);
  const { logout } = useAuth();

  const handleOnFlyTo = (value) => {
    if (mapRef.current) {
      mapRef.current.flyTo(value, 15, {
        duration: 5,
      });
    }
  };
  console.log(totalPages);

  const nextPage = () => {
    setPage(Math.min(page + 1, totalPages));
  };

  const backPage = () => {
    setPage(Math.max(page - 1, 1));
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:9875/points?page=${page}&per_page=${perPage}`
      );
      setPoints(result.data.data);
      setPerPage(result.data.per_page);
      setTotal(result.data.total);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      alert("Failed to fetch data");
      return Promise.reject(error);
    }
  };

  const fetchSort = async () => {
    try {
      const result = await axios.get(
        `http://localhost:9875/points?page=${page}&per_page=${perPage}&sort_column=lm_tname&sort_direction=${
          sortDirection ? "asc" : "desc"
        }`
      );
      setPoints(result.data.data);
      setTotal(result.data.total);
      setPerPage(result.data.per_page);
    } catch (error) {
      alert("Failed to fetch data");
      return Promise.reject(error);
    }
  };

  const fetchSearh = async () => {
    try {
      const result = await axios.get(
        `http://localhost:9875/points?page=${page}&per_page=${perPage}&search=${search}`
      );
      setPoints(result.data.data);
      setPerPage(result.data.per_page);
      setTotal(result.data.total);
    } catch (error) {
      alert("Failed to fetch data");
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    fetchSearh();
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  const handleSort = () => {
    setSortDirection(!sortDirection);
    fetchSort();
  };

  const handleLimitPage = () => {
    setLimitPage(!limitPage);
  };

  return (
    <>
      <section className="w-full h-full py-[115px] bg-[#020b1f] flex justify-center items-center relative">
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
            <div className="shadow-2xl border-[1px] border-gray-300 rounded-[20px] my-8 ml-8 mr-4  ">
              <MapContainer
                ref={mapRef}
                style={{
                  height: "100%",
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
                  borderRadius: "20px"
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
            
            <div className=" rounded-[20px] my-8 mr-8 ml-4 shadow-2xl shadow-gray-500 flex flex-col justify-between ">
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
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full py-6 bg-[#04002c] flex">
                <div className="w-[15%] flex justify-center items-center">
                  <p className="text-white">id</p>{" "}
                </div>
                <div
                  onClick={handleSort}
                  className="w-[25%] flex justify-center items-center"
                >
                  <p className="text-white cursor-pointer">LM_TNAME</p>{" "}
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
                {points.map((data, index) => (
                  <div key={index} className="w-full py-4 flex border-t-[1px] ">
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
              <div className="flex font-[300] text-sm justify-between w-full py-4 text-white items-center gap-6 bg-[#04002c] rounded-br-[20px] rounded-bl-[20px]">
                <div className="pl-7">Page: {page}</div>
                <div className="flex justify-center items-center gap-7">

                <div onClick={handleLimitPage} className="flex relative  cursor-pointer">
                  {" "}
                  Rows per page:
                  <p className="ml-1"> {points.length}</p>
                  {limitPage ? (
                    <div className="flex flex-col justify-around items-center border-[1px] border-gray-300 bg-white absolute w-9 bottom-0 right-0 rounded-md">
                      <div
                        onClick={() => {
                          setPerPage(7);
                          handleLimitPage();
                        }}
                        className="w-full text-black  hover:bg-gray-200 cursor-pointer border-b-[1px] flex justify-center rounded-tr-md rounded-tl-md py-1"
                      >
                        7
                      </div>
                      <div
                        onClick={() => {
                          setPerPage(10);
                          handleLimitPage();
                        }}
                        className="w-full text-black hover:bg-gray-200 cursor-pointer border-b-[1px] flex justify-center  py-1"
                      >
                        10
                      </div>
                      <div
                        onClick={() => {
                          setPerPage(15);
                          handleLimitPage();
                        }}
                        className="w-full text-black hover:bg-gray-200 cursor-pointer  flex justify-center rounded-br-md rounded-bl-md  py-1"
                      >
                        15
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  {points.length} of {total}
                </div>
                <div className="mr-5 flex">
                  <div onClick={backPage}>
                    <img
                      src="/icons8-back-50.png"
                      className="w-[15px] mr-7 cursor-pointer"
                    />
                  </div>
                  <div onClick={nextPage}>
                    <img
                      src="/icons8-forward-50.png"
                      className="w-[15px] cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MapPage;
