import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const usePoints = () => {

    const [points, setPoints] = useState([]);
    const [originalPoints, setOriginalPoints] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

const fetchData = async (input) => {
    const { searchQuery, page } = input;
    try {
        const params = new URLSearchParams();
      params.append("searchQuery", searchQuery);
      params.append("page", page);
      const result = await axios.get(`http://localhost:9875/points?${params.toString()}`);
      setPoints(result.data);
      setOriginalPoints(result.data);
    //   setTotalPages(result.data.total_pages);
    } catch (error) {
      alert("failed to fetchData");
      return Promise.reject(error);
    }
  };

  return {
    totalPages,
    fetchData,
    points,
    originalPoints
  };
};

export default usePoints;