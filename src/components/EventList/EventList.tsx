import "./EventList.style.css";
import { Event } from "../../interfaces/Event";
import EventListItem from "../EventListItem/EventListItem";
import { useEffect, useState } from "react";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function EventList() {
	const [events, setEvents] = useState<Event[]>([]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [visible, setVisible] = useState(false);

	const searchClick = () => {
		let url = "http://localhost:8080/events";

		if (searchQuery) {
			url += "?" + new URLSearchParams({ query: searchQuery });
		}

		console.log(url);

		fetch(url, { method: "GET", mode: "cors" })
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setEvents(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		searchClick();
	}, []);

	return (
		<div className="events-container">
			<div className="events-header">
				<h5>Events</h5>
				<Input
					placeholder="Title / User"
					onChange={(e) => {
						console.log(e.target.value);
						setSearchQuery(e.target.value);
					}}
				/>
				<Button onClick={() => searchClick()}>Search</Button>
				<Button
					onClick={() => {
						setVisible(true);
					}}
				>
					Create
				</Button>
			</div>
			<ul className="events-list">
				{events.length === 0 && (
					<h5 className="no-events">No Events :\</h5>
				)}
				{events.length > 0 &&
					events.map((event, index) => (
						<EventListItem
							key={index}
							event={event}
						/>
					))}
			</ul>
			<CreateEventModal
				visible={visible}
				onCancel={() => {
					setVisible(false);
				}}
				onFinish={() => {
					setVisible(false);
				}}
			/>
		</div>
	);
}
