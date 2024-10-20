import * as mufinMono from './index';

(async () => {
  const mb = new mufinMono.MonoBankAPI();
  const rates = await mb.currencyRates();

  console.log(rates);
})();
