import React from 'react'

class FileInput extends React.Component {
  constructor (props) {
    super(props)
    this.fileInput = React.createRef()
  }

  clearInput(e) {
    e.target.value = null
  }

  render() {
    return (
      <>
        <input type="file" ref={this.fileInput} onChange={this.props.onChange}/>
        {this.fileInput.length > 0 &&
          <a onClick={this.clearInput}>Clear</a>
        }
      </>
    )
  }
}

export default FileInput