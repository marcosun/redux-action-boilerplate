import {
  decamelize,
} from 'humps';

// Consider create an object memorising prefixes
// and throw error is there are some dupliated prefixes

/**
 * Base class that will be extended by Aync and Async action reactors
 */
export default class ActionCreator {
  /**
   * @param  {Object} options
   * @param  {String} options.prefix - Action prefix. Must be unique app wide.
   * @param  {[String]} options.actions - A list of action names.
   */
  constructor(options) {
  }

  /**
   * @param  {String} prefix
   * @param  {String} action
   * @return {String} Prefixed action type name.
   */
  convertActionTypeName(prefix, action) {
    const decamelisedActionName = decamelize(action, {separator: '-'});
    const capitalisedActionName = decamelisedActionName.toUpperCase();

    return `${prefix}/${capitalisedActionName}`;
  }

  /**
   * @param  {String} prefix
   * @param  {[String]} actions
   * @return {Object}
   */
  createActionTypeNameAndActionNameRelations(prefix, actions) {
    const actionTypeNameToActionNameRelations = {};
    const actionNameToActionTypeNameRelations = {};

    actions.forEach((action) => {
      const actionTypeName = this.convertActionTypeName(prefix, action);
      const actionName = action;

      actionTypeNameToActionNameRelations[actionTypeName] = actionName;
      actionNameToActionTypeNameRelations[actionName] = actionTypeName;
    });

    return {
      actionTypeNameToActionNameRelations,
      actionNameToActionTypeNameRelations,
    };
  }

  /**
   * Bind action types to class instance
   * @param  {String} prefix
   * @param  {[String]} actionTypeNameToActionNameRelations
   */
  bindActionTypes(prefix, actionTypeNameToActionNameRelations) {
    for (let actionTypeName in actionTypeNameToActionNameRelations) {
      if (actionTypeNameToActionNameRelations.hasOwnProperty(actionTypeName)) {
        this[actionTypeName.replace(`${prefix}/`, '')] = actionTypeName;
      }
    }
  }

  /**
   * Bind actions to class instance
   * @param  {[String]} actionNameToActionTypeNameRelations
   */
  bindActions(actionNameToActionTypeNameRelations) {
    for (let actionName in actionNameToActionTypeNameRelations) {
      if (actionNameToActionTypeNameRelations.hasOwnProperty(actionName)) {
        const actionTypeName = actionNameToActionTypeNameRelations[actionName];

        this[actionName] = (payload) => {
          return {
            type: actionTypeName,
            payload,
          };
        };
      }
    }
  }
}
