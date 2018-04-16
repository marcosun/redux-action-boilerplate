import ActionCreator from './ActionCreator';

/**
 * Sync actions
 */
export default class Async extends ActionCreator {
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

    const asyncActions = this.suffixAsyncActions(actions);
    this.options = this.convertOptions(prefix, asyncActions);

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
   * @param  {[String]} actions
   * @return {Object}
   */
  suffixAsyncActions(actions) {
    const asyncActions = actions.map((action) => {
      return [action, `${action}Success`, `${action}Failure`];
    });

    return asyncActions.reduce((sum, action) => {
      return sum.concat(action);
    }, []);
  }
}
