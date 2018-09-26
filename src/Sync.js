import ActionCreator from './ActionCreator';

/* Sync actions */
export default class Sync extends ActionCreator {
  /**
   * @param  {Object} options
   * @param  {String} options.prefix - Action prefix. Must be unique app wide.
   * @param  {String[]} options.actions - A list of action names.
   */
  constructor(options) {
    super(options);

    this.integrateActionWithSuffixes(this.$$normalisedOptions);
  }
}
