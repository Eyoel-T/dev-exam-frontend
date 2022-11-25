import { useEffect, useState } from "react";

import axios from "../../axios.config";
import useShowNotification from "./useShowNotification";
const useFetchDepartments = () => {
  const [options, setOptions] = useState([]);
  const { showNotification } = useShowNotification();
  const fetchDepartmentList = async () => {
    try {
      const res = await axios.get("/get-department-list");
      setOptions(res.data.departmentsNameList);
    } catch (error) {
      console.log(error);
      showNotification({
        type: "error",
        message: "error happened when fetching departments",
      });
    }
  };
  useEffect(() => {
    fetchDepartmentList();
  }, []);
  return { options, fetchDepartmentList };
};

export default useFetchDepartments;
