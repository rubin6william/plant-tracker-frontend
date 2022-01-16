import Head from 'next/head'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import React from 'react'
import Button from '../../components/button'
import Input from '../../components/input'
import FileInput from '../../components/file-input'
import Spinner from '../../components/spinner'

// initialize markdown parser
const MarkdownIt = require('markdown-it')
const mdParser = new MarkdownIt()

class AddPlant extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      species: '',
      watering_instructions: '',
      photo: null,
      saving: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.save = this.save.bind(this)
  }

  handleEditorChange({ html, text }) {
    this.setState({watering_instructions: text})
  }

  handleInputChange(event) {
    const target = event.target
    const id = target.id

    this.setState({
      [id]: target.value
    })
  }

  handleFileChange(event) {
    this.setState({
      photo: event ?
        event.target.files[0] :
        null
    })
  }

  save() {
    this.setState({saving: true})
  }

  render () {
    return (
      <>
        <Head>
          <title>Plant Tracker - Add Plant</title>
        </Head>

        <main className="px-6 py-4">
          <div className="mx-auto border-gray-300 shadow-sm bg-white rounded-md px-6 py-4">
            <h1 className="text-2xl font-bold mb-2">Add new plant</h1>

            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <Input id="name" onChange={this.handleInputChange}></Input>
            </div>

            <div className="mb-4">
              <label htmlFor="species">Species</label>
              <Input id="species" onChange={this.handleInputChange}></Input>
            </div>

            <div className="mb-4">
              <label htmlFor="watering_instructions">Watering Instructions</label>
              <MdEditor id="watering_instructions" style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="photo"></label>
              <FileInput onChange={this.handleFileChange}></FileInput>
            </div>

            <Button size="sm"
                    disabled={this.state.saving}
                    onClick={this.save}>
              {this.state.saving ?
                (
                  <>
                    <Spinner></Spinner> <span>Saving...</span>
                  </>
                ) :
                'Save'}
            </Button>
          </div>
        </main>
      </>
    )
  }
}

export default AddPlant