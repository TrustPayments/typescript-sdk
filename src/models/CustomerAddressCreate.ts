'use strict';
import { AbstractCustomerAddressActive } from "./AbstractCustomerAddressActive";


class CustomerAddressCreate extends AbstractCustomerAddressActive {

        /**
        * 
        */
    'customer': number;


    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    
        {
        "name": "customer",
        "baseName": "customer",
        "type": "number"
        }        
    ];

    static getAttributeTypeMap() {
        return super.getAttributeTypeMap().concat(CustomerAddressCreate.attributeTypeMap);
    }
}

export { CustomerAddressCreate }
