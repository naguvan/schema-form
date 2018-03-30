import { types, IModelType, IComplexType as IMobxType } from 'mobx-state-tree';

import { IType, ITypeConfig } from '@root/types';
import { IBoolean, IBooleanConfig } from '@root/types';
import { IString, IStringConfig } from '@root/types';
import { INumber, INumberConfig } from '@root/types';
import { INull, INullConfig } from '@root/types';
import { IObject, IObjectConfig } from '@root/types';

import String from './String';
import Number from './Number';
import Boolean from './Boolean';
import Null from './Null';
import createObject from './Object';
import createArray from './Array';

let Type: IMobxType<Partial<ITypeConfig>, IType>;

const mappings: { [key: string]: IMobxType<any, any> } = {
    number: Number,
    string: String,
    null: Null,
    boolean: Boolean,
    object: types.late('Object', createObject),
    array: types.late('Array', createArray)
};

export default function create(): IMobxType<Partial<ITypeConfig>, IType> {
    if (!Type) {
        Type = types.union(
            snapshot =>
                snapshot && typeof snapshot === 'object' && 'type' in snapshot
                    ? mappings[snapshot.type]
                    : Null,
            String,
            Number,
            Boolean,
            Null,
            types.late('Object', createObject),
            types.late('Array', createArray)
        );
    }
    return Type;
}
