import { Box, Divider, Typography } from "@mui/material";
import "./Footer.style.css";
import { LinkedIn, Mail, Phone } from "@mui/icons-material";
import Anchor from "../Anchor/Anchor";

export function Footer() {
	return (
		<Box className="Footer">
			<Box>
				<Typography
					fontSize="small"
					fontWeight={800}
				>
					Contact
				</Typography>
				<div className="footer-contact-info">
					<Phone fontSize="small" />
					<Typography variant="caption">+40 757 810 434</Typography>
				</div>
				<div className="footer-contact-info">
					<Mail fontSize="small" />
					<Typography variant="caption">
						adam.csiki01@gmail.com
					</Typography>
				</div>
				<div className="footer-contact-info">
					<LinkedIn fontSize="small" />
					<Anchor href="https://www.linkedin.com/in/csiki-adam-csaba-283931226/">
						<Typography variant="caption">
							linkedin.com/in/csiki-adam-csaba
						</Typography>
					</Anchor>
				</div>
			</Box>
		</Box>
	);
}
