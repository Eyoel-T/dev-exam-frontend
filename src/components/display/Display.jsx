import "./display.scss";
import axios from "../../axios.config";
import { Tree, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useShowNotification from "../hooks/useShowNotification";

import { Spin } from "antd";
const Display = () => {
  const [structure, setStructure] = useState(null);
  const { showNotification } = useShowNotification();
  const [loading, setLoading] = useState(false);

  const deleteAllDepartment = async () => {
    try {
      setLoading(true);
      const res = await axios.delete("/delete-all-department");
      setLoading(false);
      showNotification({
        type: "success",
        message: "All department has been deleted.",
      });
      setStructure(null);
    } catch (error) {
      setLoading(false);
      showNotification({
        type: "error",
        message:
          err?.response?.data.message ||
          err?.response?.data ||
          "error happened",
      });
    }
  };
  useEffect(() => {
    const fetchStructure = async () => {
      try {
        setLoading(true);
        const res = await axios.get("get-structure");
        setStructure([res.data.structure]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        showNotification({
          type: "error",
          message:
            error?.response?.data.message ||
            error?.response?.data ||
            "error happened",
        });
      }
    };

    fetchStructure();
  }, []);

  return (
    <div className="display">
      {loading && <Spin />}
      {structure && (
        <>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={["0-0-0"]}
            treeData={structure}
            defaultExpandAll={true}
            fieldNames={{
              title: "departmentName",
              key: "_id",
            }}
          />
          <Button
            style={{ width: "510px", marginTop: "40px" }}
            type="primary"
            danger
            onClick={deleteAllDepartment}
          >
            Delete everything and start from scratch.
          </Button>
        </>
      )}
    </div>
  );
};

export default Display;
