import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const buttonClasses = `inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium 
text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`

class Button extends React.Component {
  render () {
    return (
      <button type="button"
              className={classnames(
                buttonClasses,
                {
                  'text-sm': this.props.size === 'sm',
                  'text-lg': this.props.size === 'lg'
                }
              )}
              onClick={() => this.props.onClick()}>
        {this.props.children}
      </button>
    )
  }
}

Button.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg'])
}

export default Button