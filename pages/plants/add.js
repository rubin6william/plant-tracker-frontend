import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import {withRouter} from 'next/router'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import _ from 'lodash'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '../../components/button'
import Input from '../../components/input'
import FileInput from '../../components/file-input'
import Spinner from '../../components/spinner'
import { storePlant } from '../../lib/plants'
import Helpers from '../../lib/helpers'
import classnames from 'classnames'

// initialize markdown parser
const MarkdownIt = require('markdown-it')
const mdParser = new MarkdownIt()

export default withRouter(class AddPlant extends React.Component {
  constructor (props) {
    super(props)

    this.fileInputRef = React.createRef()

    this.state = {
      name: '',
      species: '',
      watering_instructions: '',
      photo: null,
      saving: false,
      errors: {}
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEditorChange = this.handleEditorChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.save = this.save.bind(this)
  }

  handleEditorChange({ text }) {
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

  resetForm() {
    this.setState({
      name: '',
      species: '',
      watering_instructions: '',
      photo: null,
      saving: false,
      errors: {}
    })

    this.fileInputRef.current.clearInput()
  }

  save() {
    this.setState({saving: true})

    storePlant({
        name: this.state.name,
        species: this.state.species,
        watering_instructions: this.state.watering_instructions,
        photo: this.state.photo
      })
      .then(() => {
        this.resetForm()
        toast.success('Saved plant information')
        this.props.router.push('/')
      })
      .catch(error => {
        this.setState({
          errors: _.get(error, 'errors', {})
        })

        toast.error(_.get(error, 'message', 'Failed to save plant information'))
      })
      .finally(() => this.setState({saving: false}))
  }

  render () {
    return (
      <>
        <Head>
          <title>Plant Tracker - Add Plant</title>
        </Head>

        <main className="px-6 py-4">
          <ToastContainer/>
          <div className="mx-auto border-gray-300 shadow-sm bg-white rounded-md">
            <h1 className="mb-6">
              <Link href="/">
                Plant Tracker
              </Link>
              <span className="text-gray-300"> / </span>
              Add new plant
            </h1>

            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <Input id="name"
                     value={this.state.name}
                     state={Helpers.fieldState(this.state.errors, 'name')}
                     error={Helpers.fieldError(this.state.errors, 'name')}
                     onChange={this.handleInputChange}>
              </Input>
            </div>

            <div className="mb-4">
              <label htmlFor="species">Species</label>
              <Input id="species"
                     value={this.state.species}
                     state={Helpers.fieldState(this.state.errors, 'species')}
                     error={Helpers.fieldError(this.state.errors, 'species')}
                     onChange={this.handleInputChange}>
              </Input>
            </div>

            <div className="mb-4">
              <label htmlFor="watering_instructions">Watering Instructions</label>
              <MdEditor id="watering_instructions"
                        className={classnames('h-80', {
                          'border border-red-600': (Helpers.fieldState(this.state.errors, 'watering_instructions') === false)
                        })}
                        value={this.state.watering_instructions}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
              {Helpers.fieldError(this.state.errors, 'watering_instructions').length > 0 &&
                <p className="text-red-600">{Helpers.fieldError(this.state.errors, 'watering_instructions')}</p>
              }
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="photo">Photo</label>
              <FileInput id="photo"
                         ref={this.fileInputRef}
                         state={Helpers.fieldState(this.state.errors, 'photo')}
                         error={Helpers.fieldError(this.state.errors, 'photo')}
                         onChange={this.handleFileChange}>
              </FileInput>
            </div>

            <Button size="sm"
                    disabled={this.state.saving}
                    onClick={this.save}>
              {this.state.saving ?
                (
                  <>
                    <Spinner/> <span>Saving...</span>
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
)