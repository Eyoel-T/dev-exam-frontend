import "./update.scss";
import { AutoComplete, Button, Input, Select, Switch } from "antd";
import axios from "../../axios.config";
import { useEffect, useState } from "react";
import useFetchDepartments from "../hooks/useFetchDepartments";

import { Spin } from "antd";
import useShowNotification from "../hooks/useShowNotification";
const Update = () => {
  /* Destructuring the object returned by the useFetchDepartments hook. */
  const { fetching, options, fetchDepartmentList } = useFetchDepartments();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useShowNotification();

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const updateSelectedDepartment = (inputKey, value) => {
    setSelectedDepartment((prev) => {
      return {
        ...prev,
        [inputKey]: value,
      };
    });
  };

  const updateDepartment = async () => {
    try {
      setLoading(true);
      await axios.put("/update-department", selectedDepartment);
      setLoading(false);
      showNotification({ type: "success", message: "department updated" });
      setSelectedDepartment(null);
      fetchDepartmentList();
    } catch (error) {
      console.log(error);
      setLoading(false);
      showNotification({
        type: "error",
        message: error?.response?.data.message || error?.response?.data,
      });
    }
  };

  const fetchSelectedDepartment = async (selected) => {
    try {
      setLoading(true);
      const res = await axios.get("/get-department/" + selected);
      setSelectedDepartment(res.data.department);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      showNotification({
        type: "error",
        message: err?.response?.data.message || err?.response?.data,
      });
    }
  };

  return (
    <div className="update">
      {(loading || fetching) && <Spin />}

      {selectedDepartment === null && (
        <Select
          style={{
            width: 450,
          }}
          onChange={(departmentName) => {
            fetchSelectedDepartment(departmentName);
          }}
          options={options}
        />
      )}

      {selectedDepartment && (
        <form className="updateForm">
          <div className="formItem">
            <span>Department Name</span>
            <Input
              style={{ width: 300 }}
              onChange={(e) => {
                updateSelectedDepartment("departmentName", e.target.value);
              }}
              value={selectedDepartment.departmentName}
            />
          </div>
          <div className="formItem">
            <span>Description</span>
            <Input
              style={{ width: 300 }}
              onChange={(e) => {
                updateSelectedDepartment(
                  "departmentDescription",
                  e.target.value
                );
              }}
              value={selectedDepartment.departmentDescription}
            />
          </div>
          <div className="formItem">
            <span>Managing Department</span>
            <Select
              style={{
                width: 300,
              }}
              defaultValue={selectedDepartment.managingDepartment}
              onChange={(value) => {
                updateSelectedDepartment("managingDepartment", value);
              }}
              options={options.length !== 0 ? options : [{ value: "none" }]}
              disabled={selectedDepartment.parent}
            />
          </div>

          <Button
            style={{ width: "500px", marginTop: "20px" }}
            type="primary"
            onClick={updateDepartment}
          >
            update
          </Button>
          <Button
            style={{ width: "500px", marginTop: "20px" }}
            type="primary"
            danger
            onClick={() => setSelectedDepartment(null)}
          >
            cancel
          </Button>
        </form>
      )}
    </div>
  );
};

export default Update;
