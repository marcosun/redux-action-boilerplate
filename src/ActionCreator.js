import {
  camelize,
  decamelize,
} from 'humps';

/* TODO: Throw error if there are duplicated prefixes */

/* TODO: Throw error if there are duplicated actions */

/* Base class that will be extended by Sync and Async action reactors */
export default class ActionCreator {
  /**
   * @param  {String} prefix
   * @param  {String[]} actions
   * @return {Object}
   */
  convertOptions(prefix, actions) {
    return {
      prefix: typeof prefix === 'string' ?
        decamelize(prefix, { separator: '_' }).toUpperCase() :
        '',
      actions: actions.map((action) => camelize(action)),
    };
  }

  /**
   * @param  {String} prefix
   * @param  {String} action
   * @return {String} Prefixed action type name.
   */
  convertActionTypeName(prefix, action) {
    const decamelisedActionName = decamelize(action, { separator: '_' });
    const capitalisedActionName = decamelisedActionName.toUpperCase();

    return `${prefix}/${capitalisedActionName}`;
  }

  /**
   * @param  {String} prefix
   * @param  {String[]} actions
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
   * @param  {Object} actionTypeNameToActionNameRelations
   */
  bindActionTypes(prefix, actionTypeNameToActionNameRelations) {
    for (const actionTypeName in actionTypeNameToActionNameRelations) {
      if (actionTypeNameToActionNameRelations.hasOwnProperty(actionTypeName)) {
        this[actionTypeName.replace(`${prefix}/`, '')] = actionTypeName;
      }
    }
  }

  /**
   * Bind actions to class instance
   * @param  {Object} actionNameToActionTypeNameRelations
   */
  bindActions(actionNameToActionTypeNameRelations) {
    for (const actionName in actionNameToActionTypeNameRelations) {
      if (actionNameToActionTypeNameRelations.hasOwnProperty(actionName)) {
        const actionTypeName = actionNameToActionTypeNameRelations[actionName];

        this[actionName] = (payload) => {
          return {
            type: actionTypeName,
            payload,
          };
        };
        this[actionName]['TYPE'] = actionTypeName;
      }
    }
  }
}
