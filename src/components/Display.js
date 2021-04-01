import '../componentStyles/Display.css';

const Display = ({ query, result }) => {    
    return (
        <div className="result-area">
            <section className="result">{result}</section>
            <section className="query">{query}</section>
        </div>
    )
}

export default Display;
