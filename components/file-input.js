import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class FileInput extends React.Component {
  constructor (props) {
    super(props)
    this.fileInput = React.createRef()
    this.clearInput = this.clearInput.bind(this)
  }

  clearInput() {
    this.fileInput.current.value = null
    this.props.onChange()
  }

  render() {
    return (
      <>
        <div className="flex">
          <input type="file"
                 ref={this.fileInput}
                 className={classnames({
                   'border border-red-600 rounded-md': (this.props.state === false)
                 })}
                 onChange={this.props.onChange}/>
          {this.fileInput.current && this.fileInput.current.value &&
            <a onClick={this.clearInput}
               className="text-red-600 cursor-pointer">
              Remove
            </a>
          }
        </div>

        {this.props.error.length > 0 &&
          <p className="text-red-600">{this.props.error}</p>
        }
      </>
    )
  }
}

FileInput.propTypes = {
  state: PropTypes.bool,
  error: PropTypes.string
}

FileInput.defaultProps = {
  error: ''
}

export default FileInput