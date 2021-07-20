# Trust Payments TypeScript Library

The Trust Payments TypeScript library wraps around the Trust Payments API. This library facilitates your interaction with various services such as transactions, accounts, and subscriptions.


## Documentation

[Trust Payments Web Service API](https://ep.trustpayments.com/doc/api/web-service)

## Requirements

- npm 6+

## Installation

## NPM install (recommended)
```sh
npm install trustpayments
```

## Usage
The library needs to be configured with your account's space id, user id, and secret key which are available in your [Trust Payments
account dashboard](https://ep.trustpayments.com/account/select). Set `space_id`, `user_id`, and `api_secret` to their values.

### Configuring a Service

```typescript
'use strict';
import { TrustPayments } from 'trustpayments';

let spaceId: number = 405;
let userId: number = 512;
let apiSecret: string = 'FKrO76r5VwJtBrqZawBspljbBNOxp5veKQQkOnZxucQ=';

let config = {
    space_id: spaceId,
    user_id: userId,
    api_secret: apiSecret
}

// Transaction Service
let transactionService: TrustPayments.api.TransactionService = new TrustPayments.api.TransactionService(config);

```

To get started with sending transactions, please review the example below:

```typescript
'use strict';
import { TrustPayments } from 'trustpayments';

let spaceId: number = 405;
let userId: number = 512;
let apiSecret: string = 'FKrO76r5VwJtBrqZawBspljbBNOxp5veKQQkOnZxucQ=';

let config = {
    space_id: spaceId,
    user_id: userId,
    api_secret: apiSecret
}

// Transaction Service
let transactionService: TrustPayments.api.TransactionService = new TrustPayments.api.TransactionService(config);

// TransactionPaymentPage Service
let transactionPaymentPageService: TrustPayments.api.TransactionPaymentPageService = new TrustPayments.api.TransactionPaymentPageService(config);

// LineItem of type PRODUCT
let lineItem: TrustPayments.model.LineItemCreate = new TrustPayments.model.LineItemCreate();
lineItem.name='Red T-Shirt';
lineItem.uniqueId='5412';
lineItem.sku='red-t-shirt-123';
lineItem.quantity=1;
lineItem.amountIncludingTax=3.50;
lineItem.type=TrustPayments.model.LineItemType.PRODUCT;

// Transaction
let transaction: TrustPayments.model.TransactionCreate = new TrustPayments.model.TransactionCreate();
transaction.lineItems=[lineItem];
transaction.autoConfirmationEnabled=true;
transaction.currency='EUR';

transactionService.create(spaceId, transaction).then((response) => {
    let transactionCreate: TrustPayments.model.Transaction = response.body;
    transactionPaymentPageService.paymentPageUrl(spaceId, <number> transactionCreate.id).then(function (response) {
        let pageUrl: string = response.body;
        // window.location.href = pageUrl;
    });
});

```

## License

Please see the [license file](https://github.com/TrustPayments/typescript-sdk/blob/master/LICENSE) for more information.