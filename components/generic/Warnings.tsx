interface Props  {
    type: string;
    
  }


const Warning: React.FC<Props> = ({ type, ...props }) => {
    return ( 
<div className="flex p-5 rounded-lg border border-green-200 bg-green-100 text-cyan-700 w-1/3 justify-center ">
    <div>
      <h2 className="font-bold text-xl  text-center">Item successfully created!</h2>
    </div>
</div>
)
}

export default Warning