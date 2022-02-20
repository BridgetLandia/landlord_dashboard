import AlertContext from '../../hooks/AlertContext';
import { createPortal } from 'react-dom'
import { useContext } from 'react';

const Alert = () => {
	const alert = useContext(AlertContext);
	return(
		<>
	{ (alert?.alert !== 'none') ? 
		
		createPortal((
			<div className="flex flex-row justify-center" >
				<div className="mt-20 ml-96 h-20 w-1/2 flex flex-row justify-center align-middle 
				fixed z-50 inset-0 bg-teal-50 border-t-4 border-teal-500 
			rounded-b text-teal-900 px-4 pt-3 shadow-md rounded-md" role="alert">
      					<p className="font-bold">{alert?.alertText}</p>
				</div>
			</div>
		),document.body) : null
		}
		</>)
};

export default Alert;
