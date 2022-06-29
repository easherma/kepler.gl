// Copyright (c) 2022 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component, ComponentType, MouseEventHandler} from 'react';
import {TooltipProps} from 'react-tooltip';
import classnames from 'classnames';
import styled from 'styled-components';
import {FormattedMessage} from 'localization';
import {Tooltip} from '../common/styled-components';
import {BaseProps} from '../common/icons/base';

interface PanelHeaderActionProps {
  id?: string;
  tooltip?: string;
  hoverColor?: string;
  className?: string;
  active?: boolean;
  flush?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  tooltipType?: TooltipProps['type'];
  IconComponent: ComponentType<Partial<BaseProps>>;
}

type HeaderActionWrapperProps = {
  flush?: boolean;
  active?: boolean;
  hoverColor?: string | null;
};

const HeaderActionWrapper = styled.div<HeaderActionWrapperProps>`
  margin-left: ${props => (props.flush ? 0 : 8)}px;
  display: flex;
  align-items: center;
  color: ${props =>
    props.active ? props.theme.panelHeaderIconActive : props.theme.panelHeaderIcon};

  :hover {
    cursor: pointer;
    color: ${props =>
      props.hoverColor ? props.theme[props.hoverColor] : props.theme.panelHeaderIconHover};
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }
`;

PanelHeaderActionFactory.deps = [];
// Need to use react class to access props.component
export default function PanelHeaderActionFactory(): React.ComponentType<PanelHeaderActionProps> {
  class PanelHeaderAction extends Component<PanelHeaderActionProps> {
    static defaultProps = {
      onClick: () => {},
      hoverColor: '',
      active: false
    };

    render() {
      const {
        onClick,
        tooltip,
        id,
        active,
        flush,
        hoverColor,
        tooltipType,
        disabled,
        className
      } = this.props;
      return (
        <HeaderActionWrapper
          className={classnames('panel--header__action', {disabled, [className!]: className})}
          active={active}
          hoverColor={hoverColor}
          flush={flush}
        >
          <this.props.IconComponent
            data-tip
            data-for={`${tooltip}_${id}`}
            height="16px"
            onClick={onClick}
          />
          {tooltip ? (
            <Tooltip id={`${tooltip}_${id}`} effect="solid" delayShow={500} type={tooltipType}>
              <span>
                <FormattedMessage id={tooltip} />
              </span>
            </Tooltip>
          ) : null}
        </HeaderActionWrapper>
      );
    }
  }
  return PanelHeaderAction;
}
