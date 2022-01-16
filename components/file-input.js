import React from 'react'

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
        <input type="file" ref={this.fileInput} onChange={this.props.onChange}/>
        {this.fileInput.current && this.fileInput.current.value &&
          <a onClick={this.clearInput}
             className="text-red-600 cursor-pointer">
            Remove
          </a>
        }
      </>
    )
  }
}

export default FileInput