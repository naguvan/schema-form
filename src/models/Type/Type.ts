import { types, IModelType, IType as IMobxType } from 'mobx-state-tree';

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

export default function create(): IMobxType<Partial<ITypeConfig>, IType> {
    const Type = types.union(
        String,
        Number,
        Boolean,
        Null,
        types.late('Object', createObject)
    );
    return Type;
}