import { ChatServer } from './chat-server';
const roundTo = require('round-to');
const minVolume = 1000;
const maxVolume = 1000000;
var cors = require('cors');
var Chance = require('chance');
var chance = new Chance();
var chatserver = new ChatServer();
let app = chatserver.getApp();
var companies = [{ code: "CBA.AX", name: "COMMONWEALTH BANK OF AUSTRALIA" }
    , { code: "SRX.AX", name: "SIRTEX MEDICAL LIMITED" }
    , { code: "BHP.AX", name: "BHP BILLITON LIMITED" }
    , { code: "WBC.AX", name: "WESTPAC BANKING CORPORATION" }
    , { code: "NAB.AX", name: "NATIONAL AUSTRALIA BANK LIMITED" }
    , { code: "MQG.AX", name: "MACQUARIE GROUP LIMITED" }
    , { code: "QBE.AX", name: "QBE INSURANCE GROUP LIMITED" }
    , { code: "RIO.AX", name: "RIO TINTO LIMITED" }
    , { code: "WES.AX", name: "WESFARMERS LIMITED" }
    , { code: "CSL.AX", name: "CSL LIMITED" }
    , { code: "FMG.AX", name: "FORTESCUE METALS GROUP LTD" }
    , { code: "TLS.AX", name: "TELSTRA CORPORATION LIMITED CROWN RESORTS" }
    , { code: "CWN.AX", name: "CROWN RESORT LIMITED" }
    , { code: "HNB.AX", name: "Ha Noi Beer" }
    , { code: "HAGL.AX", name: "Hoang Anh Gia Lai Corporation" }
    , { code: "CGL.AX", name: "COCACOLA GROUP LTD" }
    , { code: "PES.AX", name: "PESSI GROUP LTD" }
    , { code: "ITL.AX", name: "INTEL" }
    , { code: "AMZ.AX", name: "AMAZONE" }
    , { code: "MCS.AX", name: "MICROSOFT CORPORATION" }
    , { code: "APP.AX", name: "APPLE CORPORATION" }
    , { code: "XIA.AX", name: "XIAOMI CORPORATION" }
    , { code: "SMS.AX", name: "SAMSUNG CORPORATION" }
    , { code: "SON.AX", name: "SONY CORPORATION" }
    , { code: "TSB.AX", name: "TOSIBA CORPORATION" }
    , { code: "QLC.AX", name: "QUALCOM CORPORATION" }
    , { code: "FBC.AX", name: "FACEBOOK CORPORATION" }
    , { code: "GGC.AX", name: "GOOGLE CORPORATION" }
    , { code: "ALB.AX", name: "ALIBABA CORPORATION" }
    , { code: "OMX.AX", name: "OMO CORPORATION" }
    , { code: "FPT.AX", name: "FPT CORPORATION" }
    , { code: "VTT.AX", name: "Viet Tell CORPORATION" }
    , { code: "NKX.AX", name: "NIKON CORPORATION" }
    , { code: "CNN.AX", name: "CANON CORPORATION" }
    , { code: "PTX.AX", name: "PENTAX CORPORATION" }
];
var whitelist = ['http://localhost:4200']
export interface PriceModel {
    code: string;
    company: string;
    initPrice: number;
    price: number;
    volume: number;
    value: number;
    change: number;
    percentChange: number;
    changeType: number;//0:new,1:up,2:down,3:keep
}
var PRICE_DATA: PriceModel[] = [];
function generatePrice() {
    for (var i = 0; i < companies.length; i++) {
        var startPrice = chance.floating({ min: 0, max: 100 });
        startPrice == 0 ? startPrice = 0.01 : startPrice == 100 ? startPrice = 99.99 : startPrice;
        var vol = chance.integer({ min: minVolume, max: maxVolume });
        PRICE_DATA.push({
            company: companies[i].name, code: companies[i].code,
            initPrice: startPrice, price: startPrice, volume: vol, value: Math.round(startPrice * vol),
            change: 0.0, percentChange: 0.0, changeType: 0
        });
    }
}
generatePrice();
function changePrice() {
    PRICE_DATA.forEach(element => {
        var stepPrice = (element.price / 100) * 5;
        var newVol = element.volume + chance.integer({ min: 10, max: 30 });
        var newPrice = chance.floating({ min: (element.price - stepPrice), max: (element.price + stepPrice), fixed: 2 });
        if (newPrice < 0) {
            newPrice = 0;
        }
        var newValue = Math.round(newPrice * newVol);
        element.percentChange = roundTo(((newPrice - element.initPrice) / (element.initPrice / 100)), 2);
        element.change = roundTo(newPrice - element.initPrice, 2);
        if (newPrice < element.price) {
            element.changeType = 2;
        }
        else if (newPrice > element.price) {
            element.changeType = 1;
        }
        else {
            element.changeType = 0;
        }
        element.price = newPrice;
        element.volume = newVol;
        element.value = newValue;
    });
    chatserver.sendNotify(PRICE_DATA);
}
function getRandom() {
    return roundTo(Math.random(), 2);
}
//change data every 5 second
setInterval(changePrice, 5000);

//Services
app.route('/api/getListData').get((req, res) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD'
    });
    res.send(PRICE_DATA);
});
export { app };