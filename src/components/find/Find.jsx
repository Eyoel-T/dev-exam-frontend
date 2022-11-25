import "./find.scss";

import { DownOutlined } from "@ant-design/icons";
import axios from "../../axios.config";
import { useEffect, useState } from "react";
import { Button, Input, Select, Switch, Tree } from "antd";
import useFetchDepartments from "../hooks/useFetchDepartments";
import useShowLoadingSpinner from "../hooks/useShowLoadingSpinner";
import { Spin } from "antd";

const Find = () => {
  /* Destructuring the object returned by the hook. */
  const { options, fetchDepartmentList } = useFetchDepartments();
  const { loading, setLoading } = useShowLoadingSpinner();

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showStructure, setShowStructure] = useState(false);

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
    <div className="find">
      {loading && <Spin />}
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
        <div className="detailContainer">
          <div className="detail">
            <span>Department Name</span>
            <Input
              style={{
                width: 300,
                color: "#4096ff",
                fontSize: "18px",
                fontFamily: "poppins",
              }}
              value={selectedDepartment.departmentName}
              disabled
            />
          </div>
          <div className="detail">
            <span>Description</span>
            <Input
              style={{
                width: 300,
                color: "#4096ff",
                fontSize: "18px",
                fontFamily: "poppins",
              }}
              value={selectedDepartment.departmentDescription}
              disabled
            />
          </div>
          <div className="detail">
            <span>Managing Department</span>
            <Input
              style={{
                width: 300,
                color: "#4096ff",
                fontSize: "18px",
                fontFamily: "poppins",
              }}
              value={selectedDepartment.managingDepartment}
              disabled
            />
          </div>
          <div className="detail">
            <span>parent</span>

            <Switch
              defaultChecked
              style={{ width: 300 }}
              checked={selectedDepartment.parent}
              disabled
            />
          </div>

          <Button
            style={{ width: "500px", marginTop: "20px", marginBottom: "20px" }}
            type="primary"
            onClick={() => setShowStructure(!showStructure)}
          >
            click here to display departments under its management
          </Button>
          {showStructure && (
            <Tree
              showLine
              switcherIcon={<DownOutlined />}
              defaultExpandedKeys={["0-0-0"]}
              treeData={[selectedDepartment]}
              defaultExpandAll={true}
              fieldNames={{
                title: "departmentName",
                key: "_id",
              }}
            />
          )}

          <Button
            style={{ width: "500px", marginTop: "20px" }}
            type="primary"
            danger
            onClick={() => {
              setSelectedDepartment(null);
              setShowStructure(false);
            }}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default Find;
