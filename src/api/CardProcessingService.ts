'use strict';

import localVarRequest = require("request");
import http = require("http");
import Promise = require("bluebird");

import { Authentication } from '../auth/Authentication';
import { VoidAuth } from '../auth/VoidAuth';
import { ObjectSerializer } from '../serializers/ObjectSerializer';

import { ClientError } from  '../models/ClientError';
import { ServerError } from  '../models/ServerError';
import { Transaction } from  '../models/Transaction';
import { UnencryptedCardDataCreate } from  '../models/UnencryptedCardDataCreate';

class CardProcessingService {
    protected _basePath = 'https://ep.trustpayments.com:443/api';
    protected defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth({})
    };

    constructor(configuration: any) {
        this.setDefaultAuthentication(new VoidAuth(configuration))
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    protected setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    /**
    * The process method will process the transaction with the given card details without using 3-D secure.
    * @summary Process
    * @param spaceId 
    * @param transactionId The ID of the transaction which should be processed.
    * @param paymentMethodConfigurationId The payment method configuration ID which is applied to the transaction.
    * @param cardData The card details as JSON in plain which should be used to authorize the payment.
    * @param {*} [options] Override http request options.
    */
    public process (spaceId: number, transactionId: number, paymentMethodConfigurationId: number, cardData: UnencryptedCardDataCreate, options: any = {}) : Promise<{ response: http.IncomingMessage; body: Transaction;  }> {
        const localVarPath = this.basePath + '/card-processing/process';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

            // verify required parameter 'spaceId' is not null or undefined
            if (spaceId === null || spaceId === undefined) {
                throw new Error('Required parameter spaceId was null or undefined when calling process.');
            }

            // verify required parameter 'transactionId' is not null or undefined
            if (transactionId === null || transactionId === undefined) {
                throw new Error('Required parameter transactionId was null or undefined when calling process.');
            }

            // verify required parameter 'paymentMethodConfigurationId' is not null or undefined
            if (paymentMethodConfigurationId === null || paymentMethodConfigurationId === undefined) {
                throw new Error('Required parameter paymentMethodConfigurationId was null or undefined when calling process.');
            }

            // verify required parameter 'cardData' is not null or undefined
            if (cardData === null || cardData === undefined) {
                throw new Error('Required parameter cardData was null or undefined when calling process.');
            }

        if (spaceId !== undefined) {
            localVarQueryParameters['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }

        if (transactionId !== undefined) {
            localVarQueryParameters['transactionId'] = ObjectSerializer.serialize(transactionId, "number");
        }

        if (paymentMethodConfigurationId !== undefined) {
            localVarQueryParameters['paymentMethodConfigurationId'] = ObjectSerializer.serialize(paymentMethodConfigurationId, "number");
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(cardData, "UnencryptedCardDataCreate")
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.IncomingMessage; body: Transaction;  }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    return reject(error);
                } else {
                    if (response.statusCode){
                        if (response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "Transaction");
                            return resolve({ response: response, body: body });
                        } else {
                            let errorObject: ClientError | ServerError;
                            if (response.statusCode >= 400 && response.statusCode <= 499) {
                                errorObject = new ClientError();
                            } else if (response.statusCode >= 500 && response.statusCode <= 599){
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                            return reject({
                                errorType: errorObject.constructor.name,
                                date: (new Date()).toDateString(),
                                statusCode: <string> <any> response.statusCode,
                                statusMessage: response.statusMessage,
                                body: body,
                                response: response
                            });
                        }
                    }
                    return reject({
                        errorType: "Unknown",
                        date: (new Date()).toDateString(),
                        statusCode: "Unknown",
                        statusMessage: "Unknown",
                        body: body,
                        response: response
                    });

                }
            });
        });
    }
    /**
    * The process method will process the transaction with the given card details by eventually using 3-D secure. The buyer has to be redirect to the URL returned by this method.
    * @summary Process With 3-D Secure
    * @param spaceId 
    * @param transactionId The ID of the transaction which should be processed.
    * @param paymentMethodConfigurationId The payment method configuration ID which is applied to the transaction.
    * @param cardData The card details as JSON in plain which should be used to authorize the payment.
    * @param {*} [options] Override http request options.
    */
    public processWith3DSecure (spaceId: number, transactionId: number, paymentMethodConfigurationId: number, cardData: UnencryptedCardDataCreate, options: any = {}) : Promise<{ response: http.IncomingMessage; body: string;  }> {
        const localVarPath = this.basePath + '/card-processing/processWith3DSecure';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};

            // verify required parameter 'spaceId' is not null or undefined
            if (spaceId === null || spaceId === undefined) {
                throw new Error('Required parameter spaceId was null or undefined when calling processWith3DSecure.');
            }

            // verify required parameter 'transactionId' is not null or undefined
            if (transactionId === null || transactionId === undefined) {
                throw new Error('Required parameter transactionId was null or undefined when calling processWith3DSecure.');
            }

            // verify required parameter 'paymentMethodConfigurationId' is not null or undefined
            if (paymentMethodConfigurationId === null || paymentMethodConfigurationId === undefined) {
                throw new Error('Required parameter paymentMethodConfigurationId was null or undefined when calling processWith3DSecure.');
            }

            // verify required parameter 'cardData' is not null or undefined
            if (cardData === null || cardData === undefined) {
                throw new Error('Required parameter cardData was null or undefined when calling processWith3DSecure.');
            }

        if (spaceId !== undefined) {
            localVarQueryParameters['spaceId'] = ObjectSerializer.serialize(spaceId, "number");
        }

        if (transactionId !== undefined) {
            localVarQueryParameters['transactionId'] = ObjectSerializer.serialize(transactionId, "number");
        }

        if (paymentMethodConfigurationId !== undefined) {
            localVarQueryParameters['paymentMethodConfigurationId'] = ObjectSerializer.serialize(paymentMethodConfigurationId, "number");
        }

        (<any>Object).assign(localVarHeaderParams, options.headers);

        let localVarUseFormData = false;

        let localVarRequestOptions: localVarRequest.Options = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: ObjectSerializer.serialize(cardData, "UnencryptedCardDataCreate")
        };

        this.authentications.default.applyToRequest(localVarRequestOptions);

        if (Object.keys(localVarFormParams).length) {
            if (localVarUseFormData) {
                (<any>localVarRequestOptions).formData = localVarFormParams;
            } else {
                localVarRequestOptions.form = localVarFormParams;
            }
        }
        return new Promise<{ response: http.IncomingMessage; body: string;  }>((resolve, reject) => {
            localVarRequest(localVarRequestOptions, (error, response, body) => {
                if (error) {
                    return reject(error);
                } else {
                    if (response.statusCode){
                        if (response.statusCode >= 200 && response.statusCode <= 299) {
                            body = ObjectSerializer.deserialize(body, "string");
                            return resolve({ response: response, body: body });
                        } else {
                            let errorObject: ClientError | ServerError;
                            if (response.statusCode >= 400 && response.statusCode <= 499) {
                                errorObject = new ClientError();
                            } else if (response.statusCode >= 500 && response.statusCode <= 599){
                                errorObject = new ServerError();
                            } else {
                                errorObject = new Object();
                            }
                            return reject({
                                errorType: errorObject.constructor.name,
                                date: (new Date()).toDateString(),
                                statusCode: <string> <any> response.statusCode,
                                statusMessage: response.statusMessage,
                                body: body,
                                response: response
                            });
                        }
                    }
                    return reject({
                        errorType: "Unknown",
                        date: (new Date()).toDateString(),
                        statusCode: "Unknown",
                        statusMessage: "Unknown",
                        body: body,
                        response: response
                    });

                }
            });
        });
    }
}

export { CardProcessingService }
