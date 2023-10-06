import { Divider, Typography } from "@mui/material";
import "./Footer.style.css";
import { LinkedIn, Mail, Phone } from "@mui/icons-material";
import Anchor from "../Anchor/Anchor";

export default function Footer() {
	return (
		<footer className="Footer">
			<div>
				<Typography fontWeight={700}>Contact</Typography>
				<div className="footer-contact-info">
					<Phone />
					<Typography>+40 757 810 434</Typography>
				</div>
				<div className="footer-contact-info">
					<Mail />
					<Typography>adam.csiki01@gmail.com</Typography>
				</div>
				<div className="footer-contact-info">
					<LinkedIn />
					<Anchor href="https://www.linkedin.com/in/csiki-adam-csaba-283931226/">
						linkedin.com/in/csiki-adam-csaba
					</Anchor>
				</div>
			</div>
		</footer>
	);
}
