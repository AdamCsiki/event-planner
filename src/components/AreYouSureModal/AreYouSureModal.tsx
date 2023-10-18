import { Button, Modal, ModalProps, Typography } from "@mui/material";

interface ExtendedProps extends ModalProps {
	message?: string;
}

export default function AreYouSureModal(props: ExtendedProps) {
	const { message } = props;

	return (
		<Modal {...props}>
			<div className="modal-container">
				<Typography variant="h5">
					{message ?? "Are you sure?"}
				</Typography>

				<div className="button-container">
					<Button>Yes</Button>
					<Button>No</Button>
				</div>
			</div>
		</Modal>
	);
}
