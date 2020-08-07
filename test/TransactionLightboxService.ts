'use strict';
import { expect } from 'chai';
import { TrustPayments } from '../index';
import http = require("http");

// config
let config: { space_id: number, user_id: number, api_secret: string } = {
    space_id: 405,
    user_id: 512,
    api_secret: 'FKrO76r5VwJtBrqZawBspljbBNOxp5veKQQkOnZxucQ='
};

// Services
let transactionLightboxService: TrustPayments.api.TransactionLightboxService = new TrustPayments.api.TransactionLightboxService(config);
let transactionService: TrustPayments.api.TransactionService = new TrustPayments.api.TransactionService(config);

// Models
let transactionPayload: TrustPayments.model.TransactionCreate;

/**
 * Get transaction payload
 */
function getTransactionPayload(): TrustPayments.model.TransactionCreate
{
    if(!transactionPayload) {
        // Line item
        let lineItem: TrustPayments.model.LineItemCreate = new TrustPayments.model.LineItemCreate();
        lineItem.name = 'Red T-Shirt';
        lineItem.uniqueId = '5412';
        lineItem.type = TrustPayments.model.LineItemType.PRODUCT;
        lineItem.quantity = 1;
        lineItem.amountIncludingTax = 29.95;
        lineItem.sku = 'red-t-shirt-123';

        // Customer Billing Address
        let billingAddress: TrustPayments.model.AddressCreate = new TrustPayments.model.AddressCreate();
        billingAddress.city = "Winterthur";
        billingAddress.country = "CH";
        billingAddress.emailAddress = "test@example.com";
        billingAddress.familyName = "Customer";
        billingAddress.givenName = "Good";
        billingAddress.postcode = "8400";
        billingAddress.postalState = "ZH";
        billingAddress.organizationName = "Test GmbH";
        billingAddress.mobilePhoneNumber = "+41791234567";
        billingAddress.salutation = "Ms";

        // Payload
        transactionPayload = new TrustPayments.model.TransactionCreate();
        transactionPayload.lineItems = [lineItem];
        transactionPayload.autoConfirmationEnabled = true;
        transactionPayload.currency = 'CHF';
        transactionPayload.billingAddress = billingAddress;
        transactionPayload.shippingAddress = billingAddress;
    }

    return transactionPayload;
}

describe('TransactionLightboxService', () => {

    /**
    * This operation creates the URL which can be used to embed the JavaScript for handling the Lightbox checkout flow.
    * @summary Build JavaScript URL
    * @param spaceId 
    * @param id The id of the transaction which should be returned.
    * @param {*} [options] Override http request options.
    */
    describe('javascriptUrl', () => {
        it('javascriptUrl successful', () => {
            transactionService.create(config.space_id, getTransactionPayload())
                .then((response: { response: http.IncomingMessage, body: TrustPayments.model.Transaction }) => {
                    let transaction: TrustPayments.model.Transaction = response.body;
                    return transactionLightboxService.javascriptUrl(config.space_id, <number>transaction.id);
                })
                .done((response: { response: http.IncomingMessage, body: string }) => {
                    let javascriptUrl: string = response.body;
                    expect(javascriptUrl).to.be.a('string');
                    expect(javascriptUrl).to.include('https://');
                });
        });
    });
});
