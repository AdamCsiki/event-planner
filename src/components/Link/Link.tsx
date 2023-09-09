import "./Link.style.css";
import { Link as LinkObj, LinkProps } from "react-router-dom";

export default function Link(props: LinkProps) {
	return (
		<LinkObj
			className="link"
			{...props}
		>
			<h6 className="link-text">{props.children}</h6>
		</LinkObj>
	);
}
