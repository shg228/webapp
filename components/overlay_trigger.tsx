// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {OverlayTrigger as BaseOverlayTrigger} from 'react-bootstrap';
import {IntlContext} from 'react-intl';

type Props = {
    overlay: React.ReactNode;
};

export default class OverlayTrigger extends React.PureComponent<Props> {
    static defaultProps = BaseOverlayTrigger.defaultProps;

    render() {
        const {overlay, ...props} = this.props;

        // The overlay is rendered outside of the regular React context, and our version react-bootstrap can't forward
        // that context itself, so we have to manually forward the react-intl context to this component's child.
        const OverlayWrapper = ({intl, ...otherProps}) => (
            <IntlContext.Provider value={intl}>
                {React.cloneElement(overlay, otherProps)}
            </IntlContext.Provider>
        );

        return (
            <IntlContext.Consumer>
                {(intl): React.ReactNode => (
                    <BaseOverlayTrigger
                        {...props}
                        overlay={<OverlayWrapper intl={intl}/>}
                    />
                )}
            </IntlContext.Consumer>
        );
    }
}
