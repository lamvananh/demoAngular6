export class PriceTable {
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
