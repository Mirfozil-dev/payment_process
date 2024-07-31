import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Создаем экземпляр axios и mock-адаптер
const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance, {delayResponse: 200});

// Мокируем GET запрос
mock.onGet('/api/ui/payment/info').reply(200, {
    "success": true,
    "data": {
        "default_currency": "RUB",
        "currencies": {
            "CRYPTO": [
                {
                    "title": "Cryptomus",
                    "code": "cryptomus",
                    "commission": "0.5%",
                    "min_amount": 100,
                    "description": "Зачисление до 1 часа",
                    "sort_order": 1
                }
            ],
            "RUB": [
                {
                    "title": "Картой РФ",
                    "code": "card",
                    "commission": "8%",
                    "min_amount": 100,
                    "description": "Зачисление до 1 часа",
                    "sort_order": 2
                },
                {
                    "title": "Payeer",
                    "code": "payeer",
                    "commission": "5%",
                    "min_amount": 30,
                    "description": "Зачисление до 6 минут\u003Cbr\u003EЭта платежная система не принимает платежи из стран:\u003Cbr\u003EАрмения, Белоруссия, Казахстан, Киргизия",
                    "sort_order": 1
                },
                {
                    "title": "Картой МИР",
                    "code": "mir",
                    "commission": "3%",
                    "min_amount": 1000,
                    "description": "Зачисление до 2 часа",
                    "sort_order": 3
                },
                {
                    "title": "СБП",
                    "code": "sbp",
                    "commission": "4%",
                    "min_amount": 500,
                    "description": "Зачисление до 1.5 часа",
                    "sort_order": 4
                },
                {
                    "title": "SteamPay",
                    "code": "steampay",
                    "commission": "8%",
                    "min_amount": 800,
                    "description": "Зачисление до 3 часа",
                    "sort_order": 5
                },
            ],
            "USD": [
                {
                    "title": "Картой",
                    "code": "card_usd",
                    "commission": "7%",
                    "min_amount": 100,
                    "description": "",
                    "sort_order": 1
                },
                {
                    "title": "Payeer",
                    "code": "payeer",
                    "commission": "1%",
                    "min_amount": 30,
                    "description": "Зачисление до 6 минут\u003Cbr\u003EЭта платежная система не принимает платежи из стран:\u003Cbr\u003EАрмения, Белоруссия, Казахстан, Киргизия",
                    "sort_order": 2
                },
                {
                    "title": "PayPal",
                    "code": "paypal",
                    "commission": "10% + $0.50 FEE",
                    "min_amount": 30,
                    "description": "If you create a chargeback or open a dispute, your account will be instantly \u003Cspan style=\"color: red;\"\u003Eblocked!\u003C/span\u003E",
                    "sort_order": 2
                }
            ]
        }
    }
});

mock.onPost('/api/ui/payments/invoice/create/').reply(config => {
    const {currency, method, amount} = JSON.parse(config.data);

    if (currency && method && amount) {
        return [200, {
            success: true,
            message: 'Success',
            data: {
                url: 'https://example.com/payment'
            }
        }];
    } else {
        return [400, {
            success: false,
            message: 'Failed to create invoice',
            data: []
        }];
    }
});

export default axiosInstance;
