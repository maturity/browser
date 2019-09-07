import Errors from './Errors'
import { deepCopy } from './util'

class Form {
  /**
   * Create a new form instance.
   *
   * @param {Object} data
   */
  constructor (data = {}) {
    this.busy = false
    this.successful = false
    this.errors = new Errors()
    this.originalData = deepCopy(data)

    Object.assign(this, data)
  }

  /**
   * Fill form data.
   *
   * @param {Object} data
   */
  fill (data) {
    this.keys().forEach(key => {
      this[key] = data[key]
    })
  }

  /**
   * Get the form data.
   *
   * @return {Object}
   */
  data () {
    return this.keys().reduce((data, key) => (
      { ...data, [key]: this[key] }
    ), {})
  }

  /**
   * Get the form data keys.
   *
   * @return {Array}
   */
  keys () {
    return Object.keys(this)
      .filter(key => !Form.ignore.includes(key))
  }

  /**
   * Start processing the form.
   */
  startProcessing () {
    this.errors.clear()
    this.busy = true
    this.successful = false
  }

  /**
   * Finish processing the form.
   */
  finishProcessing () {
    this.busy = false
    this.successful = true
  }

  /**
   * fail processing the form.
   */
  failProcessing (error) {
    this.busy = false
    this.successful = false

    if (error.response) {
      this.errors.set(this.extractErrors(error.response))
    }
  }

  /**
   * Clear the form errors.
   */
  clear () {
    this.errors.clear()
    this.successful = false
  }

  /**
   * Reset the form fields.
   */
  reset () {
    Object.keys(this)
      .filter(key => !Form.ignore.includes(key))
      .forEach(key => {
        this[key] = deepCopy(this.originalData[key])
      })
  }

  // /**
  //  * Submit the form data via an HTTP request.
  //  *
  //  * @param  {String} method (get, post, patch, put)
  //  * @param  {String} url
  //  * @param  {Object} config (axios config)
  //  * @return {Promise}
  //  */
  // submit (method, url, config = {}) {
  //   this.startProcessing()
  //
  //   const data = method === 'get'
  //     ? { params: this.data() }
  //     : this.data()
  //
  //   return new Promise((resolve, reject) => {
  //     axios.request({ url: this.route(url), method, data, ...config })
  //       .then(response => {
  //         this.finishProcessing()
  //
  //         resolve(response)
  //       })
  //       .catch(error => {
  //         this.busy = false
  //
  //         if (error.response) {
  //           this.errors.set(this.extractErrors(error.response))
  //         }
  //
  //         reject(error)
  //       })
  //   })
  // }

  async submit (callback) {
    try {
      let serviceData = {}
      this.startProcessing()
      if (typeof callback === 'function') {
        serviceData = await callback(this.data())
      }
      this.finishProcessing()
      return serviceData
    } catch (error) {
      this.failProcessing(error)
    }
  }

  /**
   * Extract the errors from the response object.
   *
   * @param  {Object} response
   * @return {Object}
   */
  extractErrors (response) {
    if (!response.data || typeof response.data !== 'object') {
      return { error: Form.errorMessage }
    }

    if (response.data.errors) {
      return { ...response.data.errors }
    }

    if (response.data.message) {
      return { error: response.data.message }
    }

    return { ...response.data }
  }

  /**
   * Clear errors on keydown.
   *
   * @param {KeyboardEvent} event
   */
  onKeydown (event) {
    if (event.target.name) {
      this.errors.clear(event.target.name)
    }
  }
}

Form.errorMessage = 'Something went wrong. Please try again.'
Form.ignore = ['busy', 'successful', 'errors', 'originalData']

export default Form
