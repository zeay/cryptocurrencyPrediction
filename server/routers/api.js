const router = require('express').Router();
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
// const coins = CoinGeckoClient.coins['bitcoin'];
const coinsArray = ['bitcoin', 'ethereum', 'ripple', 'avaterra', 'solana', 'cardano', 'polkadot', 'avalanche-2', 'dogecoin', 'shiba-inu', 'matic-network'];
const prices = {}

async function getActualPrice () {
    for (let i = 0; i< coinsArray.length; i++) {
        let data = await CoinGeckoClient.coins.fetchMarketChart(coinsArray[i], {
            days: '30',
            vs_currency: 'inr',
            interval: 'daily'
          });
          const priceDataArray = data.data.prices;
          prices[coinsArray[i]] = [];
          for (let j = 0; j<priceDataArray.length-1; j++) {
            const obj = {
                date: priceDataArray[j][0],
                price: priceDataArray[j][1]
            }
            prices[coinsArray[i]].push(obj);
          }
    }
}

router.route('/test')
    .get(async (req, res) => {
        let data = await CoinGeckoClient.ping();
        console.log(data);
        res.json({message: 'test'});
    });

// router.route()

router.route('/getPrice')
    .get(async (req, res) => {
        res.json(prices);
    });
setInterval(getActualPrice, (1000 * 60 * 60));
getActualPrice();

module.exports = router;