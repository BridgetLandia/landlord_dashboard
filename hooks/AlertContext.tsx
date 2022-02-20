import React, { useState } from 'react';

enum alertStatus {
	success = 'success',
	error = 'error',
	none = 'none'
}
interface AlertProps {
	children: React.ReactNode;
}

interface AppContextInterface {
	alert: alertStatus;
	alertText: string;
	success: (text: string, timeout: number) => void;
	error: (text: string, timeout: number) => void;
	clear: () => void;
}

const AlertContext = React.createContext<AppContextInterface | null>(null);
AlertContext.displayName = 'AlertContext';

const AlertProvider = ({ children }: AlertProps) => {
	const [ alert, setAlert ] = useState(alertStatus.none);
	const [ alertText, setAlertText ] = useState('');

	return (
		<AlertContext.Provider
			value={{
				alert: alert,
				alertText: alertText,
				success: (text: string, timeout: number) => {
					setAlertText(text);
					setAlert(alertStatus.success);
					setTimeout(() => {
						setAlert(alertStatus.none);
					}, timeout * 1000 || 10000);
				},
				error: (text: string, timeout: number) => {
					setAlertText(text);
					setAlert(alertStatus.error);
					setTimeout(() => {
						setAlert(alertStatus.none);
					}, timeout * 1000 || 10000);
				},
				clear: () => setAlert(alertStatus.none)
			}}
		>
			{children}
		</AlertContext.Provider>
	);
};

export { AlertProvider };
export default AlertContext;
