
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
    
  }


const Button: React.FC<ButtonProps> = ({ name, ...props }) => {
    return (
<button
 {...props}
 className="inline-flex justify-center py-2 px-4 mx-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
{name}
</button>)
}

export default Button