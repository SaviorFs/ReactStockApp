import React from 'react';
import tickers from '../../company_tickers.json';
import './SearchBar.css'; // Import the CSS file

const SearchBar = ({ onSearch, preFetch }) => {
    const [input, setInput] = React.useState('');
    const [inputInFocus, setInputInFocus] = React.useState('');
    const reccomendationAmount = 800; // number of reccomendations to show the user
    const [reccomendations, setReccomendations] = React.useState([]);
    const [showReccomendations, setshowReccomendations] = React.useState(false);
    //the hook useRef does not re-render the DOM if the data inside changes
    //with strict mode enabled, the useEffect still runs twice so we use this too
    const hasRunOnce = React.useRef(false)
    const preFetchAmount = 6; //number of reccomendations to preFetch
    const companyTickerArray = React.useRef([]);
    const tickersAsKey = React.useRef({});
    const namesAsKey = React.useRef({});
    const companyNameArray = React.useRef([]);
    const useCache = true;
    //use effect hook with empty dependency arry means this code is only ran once when the component loads
    React.useEffect(() => {

        if (!hasRunOnce.current) {
            hasRunOnce.current = true;
            //loop through the 10K+ companies and make some hashmaps
            for (const each in tickers) {
                tickersAsKey.current[tickers[each].ticker] = tickers[each].title;
                namesAsKey.current[tickers[each].title] = tickers[each].ticker;

            }
            companyNameArray.current = [];
            companyTickerArray.current = [];
            for (const each in tickersAsKey.current) {
                companyTickerArray.current.push(each);
                companyTickerArray.current.sort();
            };
            for (const each in namesAsKey.current) {
                companyNameArray.current.push(each);
                companyNameArray.current.sort();
            };
        }


    }, []); // <-- empty dependency array

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input.toUpperCase());
        setshowReccomendations(false)
    };
    //changes lowercase user input to uppercase, as all stock tickers are uppercase.  The bold upercase also looks really cool.
    const maintainUpperCase = (userInputEvent) => {
        const userInputText = userInputEvent.target.value.toString();
        getReccomendations(userInputText.toLowerCase());

        //change the value of the input in the DOM to the upercase version of the user inputted text
        setInput(userInputText.toUpperCase());
        setshowReccomendations(true);


    };
    const getReccomendations = (searchTerm) => {
        const tickerRec = getTickerReccomendations(searchTerm);
        const rec = tickerRec;
        setReccomendations(rec);
        let count = 0;
        for (const each of rec) {
            if (count > preFetchAmount) {
                break;
            }
            console.log(each)
            preFetch(each);
            count++;
        }
    }
    const getTickerReccomendations = (searchTerm) => {
        let temp = [];
        for (const each of companyTickerArray.current) {

            if (each.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                if (temp.length < reccomendationAmount) {
                    temp.push(each);
                }
                else {
                    return temp;
                }
            }
        } return temp;
    };
    //puts the recomendations container in the right spot 
    const generateReccomendationCSS = () => {
        const formRectangle = document.getElementById("inputFieldID").getBoundingClientRect();
        const css = `width:${formRectangle.width * 2}px;height:${formRectangle.height * reccomendationAmount}px;position:absolute; grid-template-rows: repeat(${reccomendationAmount}, 1fr);top:${formRectangle.y + formRectangle.height}px;left:${formRectangle.x - formRectangle.width * 0.5}px;`;
        if (document.getElementById("recID")) {

            document.getElementById("recID").setAttribute("style", css);
        }
    }
    const recClickHandler = (event, rec) => {
        setInput(rec.toUpperCase());
        onSearch(rec.toUpperCase());
        setshowReccomendations(false);
    }
    const setNoFocus = () => {
        setshowReccomendations(false)
        setReccomendations([])
    }
    const setInFocus = () => {

        if (input) {
            getReccomendations(input);
        }
        setshowReccomendations(true)
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar mx-auto col-span-3" onChange={maintainUpperCase} >
            <div className=''>
                <input
                    onBlur={setNoFocus}
                    onFocus={setInFocus}
                    id='inputFieldID'
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    className="search-input min-w-96 min-h-full static text-xl font-bold shadow-none"
                />


                <button
                    type="submit"
                    className="search-button ml-4 min-h-full"
                >
                    Search
                </button>

                {(showReccomendations) ? <div id="recID" className='grid mt-4 absolute w-[30%] max-h-[50vh] overflow-y-scroll left-[50%] translate-x-[-50%]  z-50 '>{reccomendations.map(rec => {

                    return (<div key={rec} onMouseDown={(event) => recClickHandler(event, rec)} className='bg-gray-100 active:bg-gray-100 active:border-blue-500 text-xl overflow-hidden w-full h-[8vh]  hover:bg-gray-300 grid grid-cols-4 gap-8 grid-rows-1 border-2 border-white/80 hover:border-blue-500'><p className='ml-8 my-auto w-fit h-fit text-3xl text-bold'>{rec}</p>
                        <p className='mr-8 my-auto w-fit text-center ml-auto h-fit text-2xl col-span-3 text-nowrap overflow-hidden'>{tickersAsKey.current[rec]}</p></div>);


                })}</div> : null}
            </div>
        </form>
    );
};

export default SearchBar;
