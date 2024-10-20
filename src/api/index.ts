import { getCIBy } from '@bendernnm/mufin-iso4217';
import { MonoBankApiCurrencyExchange, MonoBankApiCurrencyExchangeParsed } from '../interfaces/api-currency';

export class MonoBankAPI {
  private readonly currencies: number[];
  private readonly monoBankToken: string;
  private readonly monoBankAPIUrl: string;

  constructor(currencies: number[] = process.env.CURRENCIES_NUMBERS?.split(',').map(Number) || [],
              token: string = process.env.MONOBANK_TOKEN || '',
              monoBankAPIUrl: string = process.env.MONOBANK_API_URL || 'https://api.monobank.ua') {
    this.currencies = currencies;
    this.monoBankToken = token;
    this.monoBankAPIUrl = monoBankAPIUrl;
  }

  async currencyRates(): Promise<MonoBankApiCurrencyExchangeParsed[]> {
    const res: Response = await fetch(`${this.monoBankAPIUrl}/bank/currency`, {
      headers: {
        'X-Token': this.monoBankToken,
      },
    });

    const currenciesExchange: MonoBankApiCurrencyExchange[] = await res.json();

    // 1xCurrencyA = rate * 1xCurrencyB
    return currenciesExchange.reduce((acc: MonoBankApiCurrencyExchangeParsed[], currency: MonoBankApiCurrencyExchange) => {
      if (!this.currencies.includes(currency.currencyCodeA) || !this.currencies.includes(currency.currencyCodeB)) {
        return acc;
      }

      const currencyA: string = getCIBy.number(currency.currencyCodeA).code;
      const currencyB: string = getCIBy.number(currency.currencyCodeB).code;

      acc.push({
        currencyA,
        currencyB,
        date: currency.date * 1000,
        rateBuy: currency.rateBuy,
        rateSell: currency.rateSell,
        rateCross: currency.rateCross,
      });

      return acc;
    }, []);
  }
}
