import { useParams } from "react-router-dom";

export default function Event() {
	const { event } = useParams();
	return (
		<div>
			<h6>{event}</h6>
		</div>
	);
}
