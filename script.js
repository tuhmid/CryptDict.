

//cryptoTickerLeft function
async function cryptoTickerLeft() {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': '8a5154ba-c950-4569-8a38-116933a6b228',
      },
    })

    const cryptoData = response.data;
    const cryptoTickerLeftText = document.getElementById('cryptoTickerLeftText')
    let namesColumn = '' //initialize into string

    for (let i = 0; i < cryptoData.data.length; i++) {
      const priceChange = cryptoData.data[i].quote.USD.percent_change_24h
      const textColor = priceChange > 0 ? 'green' : 'red' // Determine text color based on price change
      
      namesColumn += `<span style="color: ${textColor}">${cryptoData.data[i].name} ${cryptoData.data[i].quote.USD.price}</span><br><br>`
    }
    cryptoTickerLeftText.innerHTML = namesColumn;
    console.log(namesColumn)
    
  } catch (error) {
    console.error('Error:', error)
  }
  
}
cryptoTickerLeft()



//search bar
let userInput = ''; 

const button = document.querySelector('#submitButton');
button.addEventListener('click', captureUserInput);

function captureUserInput() {
  const inputElement = document.getElementById('cryptoSearchBar');
  userInput = inputElement.value; 
  userInput = inputElement.value.trim().toLowerCase().replace(/\s+/g, '-') // Convert to lowercase and replace spaces with hyphens

  console.log('User Input:', userInput); 
}
console.log('User Input:', userInput);

//graph analytics
button.addEventListener('click', analyticsData);
async function analyticsData() {
  try {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?slug=${userInput}`, {
      headers: {
        'X-CMC_PRO_API_KEY': '8a5154ba-c950-4569-8a38-116933a6b228',
      },
    })

    const cryptoData = response.data;
    console.log(cryptoData)
    console.log(cryptoData.data[1].quote.USD)
    // console.log(cryptoData.data[1027].symbol)

  
    const analyticsText = document.getElementById('analyticsText')
    let dataColumn = '' //initialize into string

    
      
      dataColumn += `<span>${cryptoData.data[1].name} ${cryptoData.data[1].quote.USD.price} ${cryptoData.data[1].quote.USD}</span><br><br>`
    
      const description = document.getElementById('description1')
    description.innerHTML = `${userInput} has a price of ${cryptoData.data[1].quote.USD.price} and has changed ${cryptoData.data[1].quote.USD.percent_change_24h} percent in the last 24 hours. The market cap is ${cryptoData.data[1].quote.USD.market_cap} and the 24 hr volume is $${cryptoData.data[1].quote.USD.volume_24h}. There is a total supply of ${cryptoData.data[1].total_supply} and a max supply of ${cryptoData.data[1].max_supply}`;
    console.log(description)
    console.log(dataColumn)

    
  } catch (error) {
    console.error('Error:', error)
  }
  
}

// Get a reference to the container div

const cryptoNews = document.querySelector('#twitterEmbed a');
cryptoNews.setAttribute('data-currencies', `${cryptoData.data[1].symbol}`)

// Define hypothetical exchange rates (replace with real data)
const cryptoToBTCRate = 0.00002  // 1 Crypto to BTC
const cryptoToUSDRate = 20000  // 1 Crypto to USD

// Function Crypto to BTC conversion
function cryptoToBTC() {
    const cryptoAmount = parseFloat(document.getElementById('c2bcrypto').value)
    if (isNaN(cryptoAmount)) {
        alert('Please enter a valid crypto amount.');
        return
    }

    const btcAmount = cryptoAmount * cryptoToBTCRate
    document.getElementById('convdisplay1').textContent = `Conversion Result: ${btcAmount.toFixed(8)} BTC`
}

// Function Crypto to USD conversion
function cryptoToUSD() {
    const cryptoAmount = parseFloat(document.getElementById('c2lcrypto').value)
    if (isNaN(cryptoAmount)) {
        alert('Please enter a valid crypto amount.')
        return
    }

    const usdAmount = cryptoAmount * cryptoToUSDRate;
    document.getElementById('convdisplay2').textContent = `Conversion Result: $${usdAmount.toFixed(2)} USD`
}

// Attach event listeners to the Convert buttons
document.getElementById('convertToBTC').addEventListener('click', cryptoToBTC)
document.getElementById('convertToUSD').addEventListener('click', cryptoToUSD)

