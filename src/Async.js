import ActionCreator from './ActionCreator';

/* Sync actions */
export default class Async extends ActionCreator {
  /**
   * @param  {Object} options
   * @param  {String} options.prefix - Action prefix. Must be unique app wide.
   * @param  {String[]} options.actions - A list of action names.
   */
  constructor(options) {
    super(options);

    this.integrateActionWithSuffixes(this.$$normalisedOptions);
  }

  addOnStatus = ['success', 'failure']
}
