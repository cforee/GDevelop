// @flow
import * as React from 'react';
import { Spacer, Line } from './Grid';
import { ResponsiveWindowMeasurer } from './Reponsive/ResponsiveWindowMeasurer';

type TextFieldWithButtonLayoutProps = {|
  renderTextField: () => React.Node,
  renderButton: (style: {|
    marginTop?: number,
    marginBottom?: number,
    marginLeft?: number,
    marginRight?: number,
    margin?: number,
  |}) => React.Node,
  margin?: 'none' | 'dense',
|};

const textFieldWithButtonLayoutStyles = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start', // Align from the top to stay at the same position when error/multiline
  },
  filledTextFieldWithLabelRightButtonMargins: {
    marginTop: 24, // Properly align with the text field (only dense "filled" text fields supported)
    marginLeft: 10,
  },
  standardTextFieldWithLabelRightButtonMargins: {
    marginTop: 17, // Properly align with the text field (only dense "standard" text fields supported)
    marginLeft: 10,
  },
};

/**
 * Position a button on the right of a TextField.
 * Only compatible with TextField with a label.
 */
export const TextFieldWithButtonLayout = ({
  margin,
  renderTextField,
  renderButton,
}: TextFieldWithButtonLayoutProps) => {
  return (
    <div style={textFieldWithButtonLayoutStyles.container}>
      {renderTextField()}
      {renderButton(
        margin === 'none'
          ? textFieldWithButtonLayoutStyles.standardTextFieldWithLabelRightButtonMargins
          : textFieldWithButtonLayoutStyles.filledTextFieldWithLabelRightButtonMargins
      )}
    </div>
  );
};

type ResponsiveLineStackLayoutProps = {|
  alignItems?: string,
  justifyContent?: string,
  expand?: boolean,
  noMargin?: boolean,
  children: React.Node,
|};

export const ResponsiveLineStackLayout = ({
  alignItems,
  justifyContent,
  expand,
  noMargin,
  children,
}: ResponsiveLineStackLayoutProps) => {
  const count = React.Children.count(children);

  return (
    <ResponsiveWindowMeasurer>
      {windowWidth =>
        windowWidth === 'small' ? (
          React.Children.map(children, (child, index) => {
            return <Line expand>{child}</Line>;
          })
        ) : (
          <Line
            alignItems={alignItems}
            justifyContent={justifyContent}
            expand={expand}
            noMargin={noMargin}
          >
            {' '}
            {React.Children.map(children, (child, index) => {
              return (
                <React.Fragment>
                  {index !== 0 && <Spacer />}
                  {child}
                  {index !== count - 1 && <Spacer />}
                </React.Fragment>
              );
            })}
          </Line>
        )
      }
    </ResponsiveWindowMeasurer>
  );
};
