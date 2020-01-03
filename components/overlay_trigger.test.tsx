// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {mount, shallow} from 'enzyme';
import React from 'react';
import {OverlayTrigger as BaseOverlayTrigger} from 'react-bootstrap';
import {FormattedMessage, IntlProvider} from 'react-intl';

import {mountWithIntl} from 'tests/helpers/intl-test-helper';

import OverlayTrigger from './overlay_trigger';

describe('OverlayTrigger', () => {
    const intlProviderProps = {
        defaultLocale: 'en',
        locale: 'en',
        messages: {
            'test.value': 'Actual value',
        },
    };
    const testOverlay = (
        <FormattedMessage
            id='test.value'
            defaultMessage='Default value'
        />
    );

    let originalConsoleError;

    beforeEach(() => {
        originalConsoleError = console.error;

        console.error = jest.fn((...params) => {
            console.originalError(...params);
        });
    });

    afterEach(() => {
        console.error = originalConsoleError;
    });

    test('base OverlayTrigger should fail to pass intl to overlay', () => {
        const wrapper = mount(
            <IntlProvider {...intlProviderProps}>
                <BaseOverlayTrigger overlay={testOverlay}>
                    <span/>
                </BaseOverlayTrigger>
            </IntlProvider>
        );

        const overlay = mount(wrapper.find(BaseOverlayTrigger).prop('overlay'));

        expect(overlay.text()).toBe('Default value');

        // console.error will have been called by FormattedMessage because its intl context is missing
        expect(console.error).toHaveBeenCalled();
    });

    test('custom OverlayTrigger should fail to pass intl to overlay', () => {
        const wrapper = mount(
            <IntlProvider {...intlProviderProps}>
                <OverlayTrigger overlay={testOverlay}>
                    <span/>
                </OverlayTrigger>
            </IntlProvider>
        );

        const overlay = mount(wrapper.find(BaseOverlayTrigger).prop('overlay'));

        expect(overlay.text()).toBe('Actual value');
        expect(console.error).not.toHaveBeenCalled();
    });
});
