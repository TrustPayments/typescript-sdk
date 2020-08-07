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
let refundService: TrustPayments.api.RefundService = new TrustPayments.api.RefundService(config);
let transactionCompletionService: TrustPayments.api.TransactionCompletionService = new TrustPayments.api.TransactionCompletionService(config);
let transactionService: TrustPayments.api.TransactionService = new TrustPayments.api.TransactionService(config);

// Models
let transactionPayload: TrustPayments.model.TransactionCreate;

/**
 * Get transaction payload
 */
function getTransactionPayload(): TrustPayments.model.TransactionCreate {
    if (!transactionPayload) {
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

/**
 * Get refund payload
 */
function getRefundPayload(transaction: TrustPayments.model.Transaction): TrustPayments.model.RefundCreate {
    let refundPayload: TrustPayments.model.RefundCreate = new TrustPayments.model.RefundCreate();
    refundPayload.externalId = <string><any>transaction.id;
    refundPayload.type = TrustPayments.model.RefundType.MERCHANT_INITIATED_ONLINE;
    refundPayload.amount = transaction.authorizationAmount;
    refundPayload.transaction = transaction.id;
    refundPayload.merchantReference = transaction.merchantReference;
    return refundPayload;
}

describe('RefundService', () => {

    /**
     * Counts the number of items in the database as restricted by the given filter.
     * @summary Count
     * @param spaceId
     * @param filter The filter which restricts the entities which are used to calculate the count.
     * @param {*} [options] Override http request options.
     */
    describe('count', () => {
        //TODO
    });

    /**
     * This operation allows to mark a refund as failed which is in state MANUAL_CHECK.
     * @summary fail
     * @param spaceId
     * @param refundId The id of the refund which should be marked as failed.
     * @param {*} [options] Override http request options.
     */
    describe('fail', () => {
        //TODO
    });

    /**
     * Returns the PDF document for the refund with given id.
     * @summary getRefundDocument
     * @param spaceId
     * @param id The id of the refund to get the document for.
     * @param {*} [options] Override http request options.
     */
    describe('getRefundDocument', () => {
        //TODO
    });

    /**
     * Returns the PDF document for the refund with given id and the given target media type.
     * @summary getRefundDocumentWithTargetMediaType
     * @param spaceId
     * @param id The id of the refund to get the document for.
     * @param targetMediaTypeId The id of the target media type for which the refund should be generated for.
     * @param {*} [options] Override http request options.
     */
    describe('getRefundDocumentWithTargetMediaType', () => {
        //TODO
    });

    /**
     * Reads the entity with the given 'id' and returns it.
     * @summary Read
     * @param spaceId
     * @param id The id of the refund which should be returned.
     * @param {*} [options] Override http request options.
     */
    describe('read', () => {
        //TODO
    });

    /**
     * This operation creates and executes a refund of a particular transaction.
     * @summary create
     * @param spaceId
     * @param refund The refund object which should be created.
     * @param {*} [options] Override http request options.
     */
    describe('refund', () => {
        let transaction: TrustPayments.model.Transaction;
        let refund: TrustPayments.model.Refund;
        it('refund successful', () => {
            transactionService.create(config.space_id, getTransactionPayload())
                .then((response: { response: http.IncomingMessage, body: TrustPayments.model.Transaction }) => {
                    transaction = response.body;
                    return transactionService.processWithoutUserInteraction(config.space_id, <number>transaction.id);
                })
                .delay(15000)
                .then((response: { response: http.IncomingMessage, body: TrustPayments.model.Transaction }) => {
                    transaction = response.body;
                    return transactionCompletionService.completeOffline(config.space_id, <number>transaction.id)
                        .then((response1: { response: http.IncomingMessage, body: TrustPayments.model.TransactionCompletion }) => {
                            return transactionService.read(config.space_id, <number>transaction.id);
                        });
                }).then((response: { response: http.IncomingMessage, body: TrustPayments.model.Transaction }) => {
                transaction = response.body;
                return refundService.refund(config.space_id, getRefundPayload(transaction));
            }).done((response: { response: http.IncomingMessage, body: TrustPayments.model.Refund }) => {
                refund = response.body;
                expect(refund.state).to.equal(TrustPayments.model.RefundState.SUCCESSFUL);
            });
        });
    });

    /**
     * Searches for the entities as specified by the given query.
     * @summary Search
     * @param spaceId
     * @param query The query restricts the refunds which are returned by the search.
     * @param {*} [options] Override http request options.
     */
    describe('search', () => {
        //TODO
    });

    /**
     * This operation allows to mark a refund as successful which is in state MANUAL_CHECK.
     * @summary succeed
     * @param spaceId
     * @param refundId The id of the refund which should be marked as successful.
     * @param {*} [options] Override http request options.
     */
    describe('succeed', () => {
        //TODO
    });
});
