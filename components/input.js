import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const inputClass = `px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md 
sm:text-sm border border-gray-300`

class Input extends React.Component {
  render() {
    return (
      <>
        <input type={this.props.type}
               name={this.props.name}
               id={this.props.id}
               className={classnames(inputClass, {
                 'error': (this.props.state === false)
               })}
               placeholder={this.props.placeholder}
               onChange={this.props.onChange}/>
        {this.props.error.length > 0 &&
          <p className="text-red-600">{this.props.error}</p>
        }
      </>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  state: PropTypes.bool
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  error: ''
}

export default Input