/* [행사 목록 보여주는 페이지] */
import React, { useState } from "react";
import "../../styles/Event.css";
import EventList from "../../components/EventList.jsx"
import Sidebar from "../../components/Sidebar.jsx"
import EventCard from "../../components/EventCard.jsx"

const EventPage = ({ className, ...props }) => {
  

  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedMonth, setSelectedMonth] = useState("전체");

  return (

    <div className = "container">
      <h1 className = "event-title">행사</h1>
      <div className="content">
        <EventList selectedRegion={selectedRegion} selectedMonth={selectedMonth} />
        <Sidebar 
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
        />
      </div>
    </div>
  );
};

export default EventPage;