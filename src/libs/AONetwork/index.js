const AONetwork = require('ao-network');
const items = require('../../data/items.json');

class AONet extends AONetwork {
    constructor(Browser) {
        super();

        this.Browser = Browser;
        this.auctionItems = [];

        this.start();
    }

    start = () => {
        this.events.on(
            this.AODecoder.messageType.OperationResponse,
            context => {
                if(!context.parameters.hasOwnProperty('253')) {
                    return;
                }

                switch(context.parameters['253']) {
                    case this.data.operations.AUCTION_ABORT_OFFER: // Black Market AUCTION
                        context.parameters['0'].map(res => JSON.parse(res))
                            .forEach(res => {
                                let itemIndex = this.auctionItems.findIndex(x => x.id == res.Id);

                                if(itemIndex === -1) {
                                    let item = items.find(x => x.UniqueName === res.ItemTypeId)

                                    this.auctionItems.push({
                                        id: res.Id,
                                        item,
                                        amount: res.Amount,
                                        price: res.UnitPriceSilver / 10000,
                                        totalPrice: res.TotalPriceSilver / 10000,
                                        quantity: res.QualityLevel
                                    });
                                } else {
                                    this.auctionItems[itemIndex]['price'] = res.UnitPriceSilver / 10000;
                                    this.auctionItems[itemIndex]['totalPrice'] = res.TotalPriceSilver / 10000;
                                    this.auctionItems[itemIndex]['amount'] = res.Amount;
                                }
                            });
                    break;
                }
            }
        );

        this.events.on(
            this.AODecoder.messageType.Event,
            context => {
                if(!context.parameters.hasOwnProperty('252')) {
                    return;
                }

                switch(context.parameters['252']) {
                    case 432: // Detail item
                        console.log(context.parameters)
                        const itemId = context.parameters.hasOwnProperty('0') 
                            ? +context.parameters['0'][0] 
                            : +context.parameters['2'][0];

                        const price = (context.parameters.hasOwnProperty('4') 
                            ? context.parameters['4'][0] 
                            : context.parameters['1'][0]) / 10000;

                        const resQuantity = context.parameters.hasOwnProperty('3') 
                            ? context.parameters['3'][0] 
                            : 1;

                        if(price <= 0) {
                            return;
                        }

                        const test = items.find(x => +x.Index == itemId);
                        const offer = this.auctionItems.find(x => +x.item.Index == itemId && +x.quantity == resQuantity);

                        if(offer) {
                            if(+offer.price > +price) {
                                this.Browser.win.webContents.send('offer:new', {
                                    itemId,
                                    name: test.LocalizedNames['RU-RU'],
                                    price: price,
                                    offerPrice: offer.price,
                                    profit: (offer.price - price).toFixed(2),
                                    uniqueName: test.UniqueName,
                                    quality: resQuantity,
                                    amount: 1
                                });
                            }
                        }

                    break;
                }
            }
        );
    }
}

module.exports = AONet;