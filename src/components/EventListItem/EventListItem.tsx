import "./EventListItem.style.css";
import { Event } from "../../interfaces/Event";
import { Link } from "react-router-dom";

export default function EventListItem({ event }: { event: Event }) {
	return (
		<li className="event-list-item">
			<Link to={`/events/${event.creator}/${event.title}`}>
				<h5>{event.title}</h5>
				<h6>{event.creator}</h6>
				<h5>
					{event.blackList.map((user) => (
						<h5>{user.name}</h5>
					))}
				</h5>
			</Link>
		</li>
	);
}
