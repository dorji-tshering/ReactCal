const Button = ( {value, onClick} ) => {

    return (
        <button className={`px-6 py-2 rounded-[4px] ${[1,2,3,4,5,6,7,8,9,0,'.'].includes(value) ? 'bg-gray-100' : 'bg-[#dadce0]'}
            ${value === '=' && '!bg-theme text-white'}`} 
            onClick={
                value === '=' ? 
                    () => onClick() : () => onClick(value)
            }> 
            { value === 'log' && <>{value}<span className='text-[9px]'>10</span></> 
            }
            {
                value === '^' && (<>x<span className='text-[9px] align-top'>y</span></>)
            }  
            {
                value === '.' && <>&bull;</>
            }  
            {
                !['log', '^', '.'].includes(value) && value
            }     
        </button>
    )
}
export default Button;
