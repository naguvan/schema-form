import { types, IType } from 'mobx-state-tree';
import { IBoolean, IBooleanConfig } from '@root/types';
import { IString, IStringConfig } from '@root/types';
import { INumber, INumberConfig } from '@root/types';

import { String } from './String/String';
import { Number } from './Number/Number';
import { Boolean } from './Boolean/Boolean';

export const Field = types.union(String, Number, Boolean);