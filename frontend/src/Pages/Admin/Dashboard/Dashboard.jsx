import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Barchart from "../../../Components/Barchart/Barchart";
import Linechar from "../../../Components/Linechart/Linechar";
import Doughchart from "../../../Components/Doughchart/Doughchart";
import API from "../../../ApiCal";
import { URLS } from "../../../Utils";

const Dashboard = () => {
  const [city, setcity] = useState([]);
  const [consumption, setconsumption] = useState([]);
  const [distribution, setdistribution] = useState([]);
  const [month, setmonth] = useState([]);
  const [totalconsumption, settotalconsumption] = useState([]);

  const dashboard = async () => {
    const response = await API.get(URLS.dashboard);
    console.log(response.data);
    const citylist = response.data.city_wise.map((item) => item.capcity);
    const consumptionlist = response.data.city_wise.map(
      (item) => item.totalconsum
    );
    const distributionlist = response.data.city_wise.map(
      (item) => item.pricedistribution
    );
    const monthList = response.data.monthwise.map((item) => item.month);
    const total_consuption = response.data.monthwise.map(
      (item) => item.total_consumption
    );
    setcity(citylist);
    setconsumption(consumptionlist);
    setdistribution(distributionlist);
    setmonth(monthList);
    settotalconsumption(total_consuption);
  };

  useEffect(() => {
    dashboard();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="data-cards">
        <div className="data-card line">
          <Linechar label={month} datas={totalconsumption} />
        </div>

        <div className="data-card bar">
          <Barchart lables={city} datas={consumption} />
        </div>
        <div className="data-card donut">
          <Doughchart lable={city} datas={distribution} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
