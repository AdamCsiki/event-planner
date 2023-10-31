import { Divider, Modal, ModalProps, Typography } from "@mui/material";
import Button from "../../components/Button/Button";

interface ExtendedProps {
	message?: string | undefined;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	accept: () => void;
	refuse: () => void;
}

export default function AreYouSureModal(props: ExtendedProps) {
	const { message, accept, refuse, open, setOpen } = props;

	const onRefuse = () => {
		refuse();
		setOpen(false);
	};

	const onAccept = () => {
		accept();
		setOpen(false);
	};

	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
			}}
		>
			<div className="modal-container">
				<Typography variant="h6">
					{message ?? "Are you sure?"}
				</Typography>

				<div className="button-container">
					<Button onClick={onRefuse}>No</Button>
					<Button onClick={onAccept}>Yes</Button>
				</div>
			</div>
		</Modal>
	);
}
