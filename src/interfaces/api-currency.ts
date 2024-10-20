export interface MonoBankApiCurrencyExchange {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy?: number;
  rateSell?: number;
  rateCross?: number;
}

export interface MonoBankApiCurrencyExchangeParsed {
  currencyA: string;
  currencyB: string;
  date: number;
  rateBuy?: number;
  rateSell?: number;
  rateCross?: number;
}
