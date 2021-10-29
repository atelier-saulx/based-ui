import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const NoInternet: FunctionComponent<SvgProps> = ({
  color,
  framed,
  size,
  frameColor,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {framed ? (
        <rect width="24" height="24" rx="4" fill={useColor(frameColor)} />
      ) : null}
      <path
        d="M12.005 14.2845C12.3272 14.2845 12.5522 14.0873 12.5583 13.7775C12.5765 11.7042 12.5947 9.61972 12.613 7.54085C12.613 7.21972 12.3272 7 11.9989 7C11.6767 7 11.3909 7.21972 11.3909 7.54085C11.4152 9.61972 11.4335 11.7042 11.4578 13.7775C11.4639 14.0873 11.6888 14.2845 12.005 14.2845ZM10.4911 7.7493C8.26584 8.09296 6.25339 9.11268 5.06172 10.4704C4.97661 10.5606 4.97661 10.6901 5.07996 10.7915L5.91899 11.5803C6.04059 11.6873 6.21083 11.6873 6.32635 11.5746C7.47545 10.4423 8.91639 9.72113 10.5154 9.46197L10.4911 7.7493ZM13.5006 7.75493L13.4824 9.46761C15.0814 9.71549 16.5102 10.4479 17.6836 11.5803C17.7931 11.6817 17.9572 11.6761 18.0788 11.569L18.9178 10.7915C19.0273 10.6901 19.0212 10.5606 18.9361 10.4704C17.7323 9.12394 15.7502 8.07606 13.5006 7.75493ZM13.4763 11.0901L13.4581 12.8873C14.1269 13.1127 14.7166 13.4845 15.1605 13.9296C15.276 14.0423 15.428 14.0366 15.5557 13.9239L16.492 13.062C16.5953 12.9662 16.6014 12.8423 16.5163 12.7465C15.8353 11.9859 14.747 11.3493 13.4763 11.0901ZM10.5336 11.0901C9.25687 11.3662 8.17464 11.969 7.48153 12.7465C7.39641 12.8423 7.39641 12.9606 7.50585 13.062L8.44824 13.9352C8.57592 14.0535 8.74007 14.0366 8.86775 13.907C9.29942 13.462 9.88918 13.1014 10.5519 12.8761L10.5336 11.0901ZM11.9989 17C12.5157 17 12.9291 16.6113 12.9291 16.138C12.9291 15.6592 12.5157 15.2817 11.9989 15.2817C11.4943 15.2817 11.0748 15.6592 11.0748 16.138C11.0748 16.6113 11.4943 17 11.9989 17Z"
        fill={useColor(color)}
      />
    </svg>
  )
}

export default NoInternet
