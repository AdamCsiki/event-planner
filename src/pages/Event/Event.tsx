import "./Event.style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { basePath } from "../../api/api";

export default function Event() {
	const { creator, eventName } = useParams();
	const [event, setEvent] = useState({} as Event);

	const getEvent = () => {
		const url = basePath + `/${creator}/${eventName}`;
	};

	useEffect(() => {}, []);

	return (
		<div className="Event">
			<h3>{eventName}</h3>
			<h4>{creator}</h4>
		</div>
	);
}
