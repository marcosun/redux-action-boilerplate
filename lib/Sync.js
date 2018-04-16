import {
  camelize,
  decamelize,
} from 'humps';

import ActionCreator from './ActionCreator';

/**
 * Sync actions
 */
export default class Sync extends ActionCreator {
  /**
   * @param  {Object} options
   * @param  {String} options.prefix - Action prefix. Must be unique app wide.
   * @param  {[String]} options.actions - A list of action names.
   */
  constructor(options) {
    super(options);

    const {
      prefix,
      actions,
    } = options;

    this.options = this.convertOptions(prefix, actions);

    const {
      actionTypeNameToActionNameRelations,
      actionNameToActionTypeNameRelations,
    } = this.createActionTypeNameAndActionNameRelations(
      this.options.prefix,
      this.options.actions,
    );
    this.actionTypeNameToActionNameRelations = actionTypeNameToActionNameRelations;
    this.actionNameToActionTypeNameRelations = actionNameToActionTypeNameRelations;

    this.bindActionTypes(this.options.prefix, this.actionTypeNameToActionNameRelations);
    this.bindActions(this.actionNameToActionTypeNameRelations);
  }

  /**
   * @param  {String} prefix
   * @param  {[String]} actions
   * @return {Object}
   */
  convertOptions(prefix, actions) {
    return {
      prefix: typeof prefix === 'string' ?
        decamelize(prefix, {separator: '-'}).toUpperCase() :
        '',
      actions: actions.map((action) => {
        return camelize(action);
      }),
    };
  }
}
