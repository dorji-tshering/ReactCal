import '../componentStyles/Display.css';

const Display = ({ query, result }) => {  
     return (
        <div className="result-area">
            <section className="result">
                {result}
            </section>
            <section className="query">
                <p className="equal-sign">=</p>
                <p className="query-side">{query}</p>
            </section>
        </div>
    )
}

export default Display;
