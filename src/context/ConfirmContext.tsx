import { createContext, useState, ReactNode } from "react";
import AreYouSureModal from "../modals/AreYouSureModal/AreYouSureModal";

interface ExtendedProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	open: boolean;
	setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
	message?: string;
	setRefuseFunction:
		| React.Dispatch<React.SetStateAction<() => void>>
		| ((func: () => void) => void);
	refuseFunction: () => void;
	setAcceptFunction:
		| React.Dispatch<React.SetStateAction<() => void>>
		| ((func: () => void) => void);
	acceptFunction: () => void;
}

export const ConfirmContext = createContext<ExtendedProps>({} as ExtendedProps);

export function ConfirmProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>();
	const [refuseFunction, setRefuseFunc] = useState<() => void>(
		() => () => {}
	);
	const [acceptFunction, setAcceptFunc] = useState<() => void>(
		() => () => {}
	);

	const setRefuseFunction = (func: () => void) => {
		setRefuseFunc(() => () => {
			func();
		});
		setMessage(undefined);
	};

	const setAcceptFunction = (func: () => void) => {
		setAcceptFunc(() => () => {
			func();
		});
		setMessage(undefined);
	};

	return (
		<ConfirmContext.Provider
			value={{
				setOpen,
				open,
				setMessage,
				message,
				setRefuseFunction,
				refuseFunction,
				setAcceptFunction,
				acceptFunction,
			}}
		>
			<AreYouSureModal
				open={open}
				setOpen={setOpen}
				accept={acceptFunction}
				refuse={refuseFunction}
				message={message}
			/>
			{children}
		</ConfirmContext.Provider>
	);
}
