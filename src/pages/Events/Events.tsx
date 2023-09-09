import "./Events.style.css";
import { useEffect, useState } from "react";
import { Event } from "../../interfaces/Event";
import EventListItem from "../../components/EventListItem/EventListItem";
import EventList from "../../components/EventList/EventList";
import { Outlet } from "react-router-dom";

export default function Events() {
	return (
		<div className="EventsPage">
			<EventList />
		</div>
	);
}
