class CurrencyService {
  async getRates(): Promise<any> {
    return new Promise(resolve =>
      resolve({
        rates: {
          aed: {
            rate: 3.685,
            symbol: 'AED',
            key: 'aed',
          },
          usdt: {
            rate: 0.991,
            symbol: 'USDT',
            key: 'usdt',
          },
          usd: {
            rate: 1,
            symbol: '$',
            key: 'usd',
          },
          euro: {
            rate: 1.09,
            symbol: '€',
            key: 'euro',
          },
        },
      }),
    );
  }
}

export default new CurrencyService();
