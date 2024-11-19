
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Navbar from "../components/Navbar";
import logo from "../Assets/logo2.png";
import PieChart from "../components/Blood_Count";
import Swal from "sweetalert2";
import { GiBed } from "react-icons/gi";
import { MdOutlineAir } from "react-icons/md";
import { TbWashMachine} from "react-icons/tb";
import { MdOutlineLocalHospital } from "react-icons/md";


function Home() {
  const location = useLocation();

  // Initialize variables with values from localStorage
  const [bed, setBed] = useState(0);
  const [oxygenCapacity, setOxygen] = useState(0);
  const [ventilator, setVentilators] = useState(0);
  const [theater, setTheater] = useState(0);
  const [hospitalName] = useState(localStorage.getItem("username")); // Username from localStorage
  const hospitalId = localStorage.getItem("hospitalId"); // hospitalId from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/Bedavailability/fetchBed?name=${hospitalName}`
        );

        if (response) {
          const data = response.data;
          setBed(data.beds);
          setVentilators(data.ventilators);
          setOxygen(data.oxygen);
          setTheater(data.theaters);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [hospitalName]);

  const handleOxygenChange = (e) => {
    let value = Number(e.target.value);
    // Format the value with a leading zero if it's less than 10
    setOxygen(value < 10 ? `0${value}` : String(value));
  };

  // Update bed count in the backend
  const updateBeds = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/Bedavailability/updatebeds",
        {
          username: hospitalName,
          beds: bed,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        position: "top-center",
        icon: response.data.status === "SUCCESS" ? "success" : "error",
        title:
          response.data.status === "SUCCESS"
            ? "Bed count updated successfully!"
            : "Failed to update bed count!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error occurred while updating bed count.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Update oxygen capacity in the backend
  const updateOxygen = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/Bedavailability/updateoxygen",
        {
          username: hospitalName,
          oxygen: oxygenCapacity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        position: "top-center",
        icon: response.data.status === "SUCCESS" ? "success" : "error",
        title:
          response.data.status === "SUCCESS"
            ? "CRRT Availability updated successfully!"
            : "Failed to update oxygen capacity!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error occurred while updating oxygen capacity.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Update theater count in the backend
  const updateTheater = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/Bedavailability/updatetheaters",
        {
          username: hospitalName,
          theaters: theater,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        position: "top-center",
        icon: response.data.status === "SUCCESS" ? "success" : "error",
        title:
          response.data.status === "SUCCESS"
            ? "Theater count updated successfully!"
            : "Failed to update theater count!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error occurred while updating theater count.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Update ventilators in the backend
  const updateVentilators = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/Bedavailability/updateventilators",
        {
          username: hospitalName,
          ventilators: ventilator,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        position: "top-center",
        icon: response.data.status === "SUCCESS" ? "success" : "error",
        title:
          response.data.status === "SUCCESS"
            ? "Ventilators count updated successfully!"
            : "Failed to update ventilators count!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Error occurred while updating ventilators count.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Check token on mount and redirect if missing
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="home">
        <div className="sidebar">
          <ul>
            <img src={logo} alt="Logo" className="logo" />

            <div className="hospitalname">{hospitalName}</div>
            <li>
              <a href="./AddAmbulance">Add Ambulance</a>
            </li>
            <li>
              <a href="/AddDrivers">Add Drivers</a>
            </li>
          </ul>
        </div>

        <div className="main-content">
          <div className="boxes-container">
            <div className="box">
              <div className="box-header">
                <MdOutlineAir className="box-header-icon" />
                <h2>Available CRRT</h2>
              </div>
              <input
                type="number"
                value={oxygenCapacity}
                onChange={(e) => setOxygen(Number(e.target.value))}
                placeholder="Enter available CRRT"
                style={{ textAlign: "center" }}
              />
              <button onClick={updateOxygen}>Update</button>
            </div>

            <div className="box">
            <div className="box-header">
            <MdOutlineLocalHospital className="box-header-icon" />
              <h2>Available Theater</h2>
              </div>
              <input
                type="number"
                value={theater}
                onChange={(e) => setTheater(Number(e.target.value))}
                placeholder="Enter Theater"
                style={{ textAlign: "center" }}
              />
              <button onClick={updateTheater}>Update</button>
            </div>

            <div className="box">
            <div className="box-header">
            <TbWashMachine className="box-header-icon" />
              <h2>Available Ventilators</h2>
              </div>
              <input
                type="number"
                value={ventilator}
                onChange={(e) => setVentilators(Number(e.target.value))}
                placeholder="Enter Ventilators"
                style={{ textAlign: "center" }}
              />
              <button onClick={updateVentilators}>Update</button>
            </div>
          </div>

          <div className="boxes-container">
            <div className="box">
              <div className="box-header">
                <GiBed className="box-header-icon" />
                <h2>Available beds</h2>
              </div>
              <input
                type="number"
                value={bed}
                onChange={(e) => setBed(Number(e.target.value))}
                placeholder="Enter Bed Count"
                className="bed-input"
                style={{ textAlign: "center" }}
              />
              <button id="submit-button" onClick={updateBeds}>
                Update
              </button>
            </div>

            <div className="box-chart">
              <div className="chart">Blood Count</div>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
