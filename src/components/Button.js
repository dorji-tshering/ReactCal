import '../componentStyles/Button.css';

const Button = ( {value, onClick, className} ) => {
    return (
        <button className={className} onClick={
            value === '='? () => onClick() : () => onClick(value)
            }> 
            {value === 'log'? <>{value}<span style={{fontSize:6,
            }}>10</span></> 
            : value
            }         
        </button>
    )
}
export default Button;
