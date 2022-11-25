import { useEffect, useState } from "react";

import axios from "../../axios.config";
import useShowNotification from "./useShowNotification";
const useFetchDepartments = () => {
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { showNotification } = useShowNotification();
  const fetchDepartmentList = async () => {
    try {
      setFetching(true);
      const res = await axios.get("/get-department-list");
      setOptions(res.data.departmentsNameList);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
      showNotification({
        type: "error",
        message: "error happened when fetching departments",
      });
    }
  };
  useEffect(() => {
    fetchDepartmentList();
  }, []);
  return { options, fetching, fetchDepartmentList };
};

export default useFetchDepartments;
