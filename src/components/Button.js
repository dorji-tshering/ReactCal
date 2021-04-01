import '../componentStyles/Button.css';

const Button = ( {value, onClick} ) => {
    return (
        <button className="button" onClick={
            value === '='? () => onClick() : () => onClick(value)
        }> 
            {value}         
        </button>
    )
}
export default Button;
