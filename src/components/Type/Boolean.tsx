import * as React from 'react';
import { Component, ReactNode } from 'react';

import { IBooleanProps, IBooleanStates } from '@root/types';
import { IBoolean } from '@root/types';

import { observer } from 'mobx-react';

import Base from './Base';

import FormControlLabel from 'material-ui/Form/FormControlLabel';
import FormHelperText from 'material-ui/Form/FormHelperText';

import Switch from 'material-ui/Switch';

@observer
export default class Boolean extends Base<
    IBoolean,
    IBooleanProps,
    IBooleanStates
> {
    constructor(props: IBooleanProps, context: any) {
        super(props, context);
    }

    protected renderType(type: IBoolean): ReactNode {
        return (
            <>
                <FormControlLabel
                    label={type.title}
                    disabled={type.disabled}
                    control={
                        <Switch
                            key={type.name}
                            name={type.name}
                            checked={type.value}
                            color={'primary'}
                            disabled={type.disabled}
                            // tslint:disable-next-line:jsx-no-lambda
                            onChange={e => type.setValue(e.target.checked)}
                        />
                    }
                />
                {!type.valid && (
                    <FormHelperText error>
                        {type.errors.join('\n')}
                    </FormHelperText>
                )}
            </>
        );
    }
}