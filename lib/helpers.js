import _ from 'lodash'

const Helpers = {
  fieldState(errors, name) {
    return _.has(errors, name) ? false : null
  },
  fieldError(errors, name) {
    const error = _.get(errors, name, '')

    return _.isArray(error) ?
      _.get(error, '0') :
      error
  }
}

export default Helpers