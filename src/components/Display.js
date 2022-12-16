const Display = ({ query, result }) => {  
     return (
        <div className="border border-gray-300 rounded-md h-[80px] flex flex-col justify-between p-2">
            <section className="text-gray-500">
                {result}
            </section>
            <section className="flex relative">
                <p className="text-lg">=</p>
                <p className="grow text-right overflow-x-auto text-2xl">{query}</p>
            </section>
        </div>
    )
}

export default Display;
