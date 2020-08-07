'use strict';
import { ChargeFlow } from "./ChargeFlow";
import { CreationEntityState } from "./CreationEntityState";


class ChargeFlowLevelConfiguration {

        /**
        * The charge flow level configuration to which the flow is associated.
        */
    'flow'?: ChargeFlow;

        /**
        * The ID is the primary key of the entity. The ID identifies the entity uniquely.
        */
    'id'?: number;

        /**
        * The linked space id holds the ID of the space to which the entity belongs to.
        */
    'linkedSpaceId'?: number;

        /**
        * The charge flow level configuration name is used internally to identify the charge flow level configuration. For example the name is used within search fields and hence it should be distinct and descriptive.
        */
    'name'?: string;

        /**
        * The duration of the level before switching to the next one.
        */
    'period'?: string;

        /**
        * The planned purge date indicates when the entity is permanently removed. When the date is null the entity is not planned to be removed.
        */
    'plannedPurgeDate'?: Date;

        /**
        * The priority indicates the sort order of the level configurations. A low value indicates that the level configuration is executed before any level with a higher value. Any change to this value affects future level configuration selections.
        */
    'priority'?: number;

        /**
        * 
        */
    'state'?: CreationEntityState;

        /**
        * The type determines how the payment link is delivered to the customer. Once the type is defined it cannot be changed anymore.
        */
    'type'?: number;

        /**
        * The version number indicates the version of the entity. The version is incremented whenever the entity is changed.
        */
    'version'?: number;


    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
    
        {
        "name": "flow",
        "baseName": "flow",
        "type": "ChargeFlow"
        },
        
        {
        "name": "id",
        "baseName": "id",
        "type": "number"
        },
        
        {
        "name": "linkedSpaceId",
        "baseName": "linkedSpaceId",
        "type": "number"
        },
        
        {
        "name": "name",
        "baseName": "name",
        "type": "string"
        },
        
        {
        "name": "period",
        "baseName": "period",
        "type": "string"
        },
        
        {
        "name": "plannedPurgeDate",
        "baseName": "plannedPurgeDate",
        "type": "Date"
        },
        
        {
        "name": "priority",
        "baseName": "priority",
        "type": "number"
        },
        
        {
        "name": "state",
        "baseName": "state",
        "type": "CreationEntityState"
        },
        
        {
        "name": "type",
        "baseName": "type",
        "type": "number"
        },
        
        {
        "name": "version",
        "baseName": "version",
        "type": "number"
        }        
    ];

    static getAttributeTypeMap() {
        return ChargeFlowLevelConfiguration.attributeTypeMap;
    }
}

export { ChargeFlowLevelConfiguration }
