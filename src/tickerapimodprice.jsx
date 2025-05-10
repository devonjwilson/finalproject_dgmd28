export function TickerPriceAPIFetch(ticker){
        // const apikey = "5H3EDL5TWX0VD7LV"
        const date = "2025-05-09"
        var apikey = "ANFYUNXH4FV25LX6"    
        // Backtick ` ${} used for entering in variables
            return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apikey}`)
            .then(res=>res.text())
            .then(response=>{
                let respObj = JSON.parse(response);
                let dailyStockInfo = respObj["Time Series (Daily)"][date]["4. close"];
                console.log(dailyStockInfo)
                return dailyStockInfo
            })  
            .catch(error=>console.log(error))
        }




	