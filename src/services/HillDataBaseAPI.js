// async function GetData() {
//     console.log("function called")
//        try {
   
//         return await fetch('https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0')
   
   
//        } catch (err) 
//        { console.log('error fetching data from Source', err) }
//      }
   
//    export default GetData


   ////

export default async function fetchMunrosAPI () {

    // API path
    const hillBaggerPath = "https://hill-bagging-api.onrender.com";
    const munroQuery = "/munros";
    const munroBaggerPath = `${hillBaggerPath}${munroQuery}`;

    try {
        const munroResults = await fetch(munroBaggerPath)
        const munros = await munroResults.json();
        return munros;
    }
    catch (error){
        return error;
    }
}



    // reload API

    // const fetchMunros = async () => {
    //     console.log("fetching Munro's");
    //     const munroResults = await fetch(munroBaggerPath)
    //     const munros = await munroResults.json();
    //     setMunroData(munros)
    //     setloading(false)
    //     } 

    // // get API data
    // useEffect(() => {
    //     try {
    //     setloading(true)
    //     fetchMunros();
    //     }
    //     catch (error) {
    //     setloading(false)
    //     setError(error)
    //     }
    // }, [reloadMunroData])

    async function fetchMunros () 
    {
        try 
        {
            const munroResults = await fetch(munroBaggerPath)
            const munros = await munroResults.json();
            return munros;
        }
        catch (error)
        {
            return error;
        }
    } 
