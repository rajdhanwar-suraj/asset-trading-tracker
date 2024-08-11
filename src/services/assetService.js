exports.calculateAverageTradingPrice = (tradingJourney) => {
    if (!tradingJourney.length) return 0;
    const total = tradingJourney.reduce((sum, trade) => sum + trade.price, 0);
    return total / tradingJourney.length;
};
