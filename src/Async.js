import ActionCreator from './ActionCreator';

/**
 * Sync actions
 */
export default class Async extends ActionCreator {
  /**
   * @param  {Object} options
   * @param  {String} options.prefix - Action prefix. Must be unique app wide.
   * @param  {String[]} options.actions - A list of action names.
   */
  constructor(options) {
    super(options)
    let {prefix, actions} = options;
    const convertedProps = ActionCreator.convertOptions(prefix, actions);
    this.integrateActionWithSuffixes(convertedProps.prefix, convertedProps.actions);
  }

  addOnStatus = ['success', 'failure']
}
