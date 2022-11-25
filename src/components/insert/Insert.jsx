import "./insert.scss";
import { Button, Input, Switch, Select } from "antd";
import { useState } from "react";
import { useRef } from "react";
import axios from "../../axios.config";
import useShowNotification from "../hooks/useShowNotification";
import useFetchDepartments from "../hooks/useFetchDepartments";
import { Spin } from "antd";

const Insert = () => {
  const [inputs, setInputs] = useState({
    departmentName: "",
    departmentDescription: "",
    managingDepartment: "",
    parent: false,
  });
  const [loading, setLoading] = useState(false);

  /* Destructuring the object returned by the hooks. */
  const { options, fetchDepartmentList, fetching } = useFetchDepartments();
  const { showNotification } = useShowNotification();

  const updateInputs = (inputKey, value) => {
    setInputs((prev) => {
      return {
        ...prev,
        [inputKey]: value,
      };
    });
  };

  const insertDepartment = async () => {
    try {
      setLoading(true);
      await axios.post("/insert-department", {
        departmentName: inputs.departmentName,
        departmentDescription: inputs.departmentDescription,
        managingDepartment: inputs.managingDepartment,
        parent: inputs.parent,
      });
      setLoading(false);
      showNotification({ type: "success", message: "department inserted" });
      setInputs({
        departmentName: "",
        departmentDescription: "",
        managingDepartment: "",
        parent: false,
      });
      fetchDepartmentList();
    } catch (err) {
      console.log(err);
      setLoading(false);
      showNotification({
        type: "error",
        message: err?.response?.data.message || err?.response?.data,
      });
    }
  };

  return (
    <form className="insert">
      {(loading || fetching) && <Spin />}
      <div className="formItem">
        <span>Department Name</span>

        <Input
          style={{ width: 300 }}
          onChange={(e) => {
            updateInputs("departmentName", e.target.value);
          }}
          value={inputs.departmentName}
        />
      </div>
      <div className="formItem">
        <span>Department Description</span>
        <Input
          style={{ width: 300 }}
          onChange={(e) => {
            updateInputs("departmentDescription", e.target.value);
          }}
          value={inputs.departmentDescription}
        />
      </div>
      <div className="formItem">
        <span>Managing Department</span>
        <Select
          style={{
            width: 300,
          }}
          onChange={(value) => {
            updateInputs("managingDepartment", value);
          }}
          options={options.length !== 0 ? options : [{ value: "none" }]}
          value={inputs.managingDepartment}
        />
      </div>
      <div className="formItem">
        <span>parent</span>

        <Switch
          defaultChecked
          onChange={(value) => updateInputs("parent", value)}
          checked={inputs.parent}
          style={{ width: 300 }}
        />
      </div>

      <Button
        style={{ width: "510px", marginTop: "20px" }}
        type="primary"
        onClick={insertDepartment}
      >
        Insert
      </Button>
    </form>
  );
};

export default Insert;
