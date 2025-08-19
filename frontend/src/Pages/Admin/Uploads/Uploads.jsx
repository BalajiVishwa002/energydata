import React, { useEffect, useRef, useState } from "react";
import "./Uploads.css";
import TextBox from "../../../Components/TextBox/TextBox";
import { FaFile } from "react-icons/fa";
import API from "../../../ApiCal";
import { URLS } from "../../../Utils";
import { toast } from "react-toastify";
import Datat from "react-data-table-component";
import { Bars } from "react-loader-spinner";

const Uploads = () => {
  const [file, setfile] = useState("");
  const [error, seterror] = useState({});
  const [summary, setsummary] = useState({
    uploads: 0,
    avg: 0,
  });
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const reffile = useRef(null);

  const handleFile = (e) => {
    const { name, value, files } = e.target;
    const validextension = ["csv"];
    if (files) {
      const file = files[0];
      const extension = file.name.split(".").pop().toLowerCase();
      if (validextension.includes(extension)) {
        setfile(file);
      } else {
        seterror((prev) => ({ ...prev, file: "Only CSV format accepted" }));
      }
    }
  };

  const handlesubmit = async () => {
    try {
      setloading(true);
      if (!file) {
        seterror((prev) => ({ ...prev, file: "Please select the file" }));
        return;
      } else {
        seterror({});
        const form = new FormData();
        form.append("file", file);
        const response = await API.post(URLS.uploadfile, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status == 200) {
          console.log(response.data);
          if (reffile.current) {
            reffile.current.value = "";
          }
          getUploadedData();
          toast.success(response.data.msg);
        }
      }
    } catch (err) {
      toast.warn(err.message);
    } finally {
      setloading(false);
    }
  };

  const getUploadedData = async () => {
    const response = await API.get(URLS.fetchUsers);
    setdata(response.data);
  };

  const dashboarddata = async () => {
    const response = await API.get(URLS.summary);
    if (response.status == 200) {
      setsummary(response.data);
    }
  };

  const fetchall = async () => {
    await Promise.all([getUploadedData(), dashboarddata()]);
  };

  useEffect(() => {
    fetchall();
  }, []);

  return (
    <div className="upload-container">
      <h1>Upload File</h1>
      <div className="data-cards">
        <div className="values">
          <div className="val-box">
            <div>
              <h3>{summary.uploads}</h3>
              <span>Total Uploads</span>
            </div>
          </div>
          <div className="val-box">
            <div>
              <h3>{summary.avg}</h3>
              <span>Avarage Consumption</span>
            </div>
          </div>
        </div>

        <div className="data-card file-upload">
          <TextBox
            type={"file"}
            label={""}
            name={"file"}
            required={true}
            icon={FaFile}
            onChange={handleFile}
            error={error?.file}
            ref={reffile}
          />
          {loading ? (
            <Bars color="blue" />
          ) : (
            <button className="submit-btn" onClick={() => handlesubmit()}>
              Submit
            </button>
          )}
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <th>Sno</th>
            <th>Name</th>
            <th>City</th>
            <th>Energy Consumption</th>
            <th>Date</th>
            <th>Price</th>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((ele, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.city}</td>
                    <td>{ele.energy_consumption}</td>
                    <td>{ele.date}</td>
                    <td>{ele.price}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={"6"} style={{ textAlign: "center" }}>
                  No records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Uploads;
