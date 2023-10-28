import { Modal, ModalProps, Typography } from "@mui/material";
import Button from "../Button/Button";

interface ExtendedProps extends ModalProps {
	message?: string;
	yes: () => void;
	no: () => void;
}

export default function AreYouSureModal(props: ExtendedProps) {
	const { message, yes, no } = props;

	return (
		<Modal {...props}>
			<div className="modal-container">
				<Typography variant="h6">
					{message ?? "Are you sure?"}
				</Typography>

				<div className="button-container">
					<Button
						onClick={() => {
							no();
						}}
					>
						No
					</Button>
					<Button
						onClick={() => {
							yes();
						}}
					>
						Yes
					</Button>
				</div>
			</div>
		</Modal>
	);
}
