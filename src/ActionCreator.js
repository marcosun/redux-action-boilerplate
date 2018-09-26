import { camelize, decamelize } from 'humps';
import invariant from './invariant';

/* Class to generate actions. */
export default class ActionCreator {
  /**
   * @param {object} options
   */
  constructor(options) {
    const { prefix, actions } = options;
    this.$$convertedProps = ActionCreator.convertOptions(prefix, actions);
  }

  /**
   * @param  {String} prefix
   * @param  {String[]} actions
   * @return {Object}
   */
  static convertOptions(prefix, actions) {
    invariant(
      Array.isArray(actions),
      'actions expect to be type of array',
    );
    return {
      prefix: typeof prefix === 'string' ?
        ActionCreator.fixStringTransform(prefix) :
        '',
      actions: actions.map((action) => {
        return camelize(action);
      }),
    };
  }

  /**
   * @param {string} fixString
   * @return {string}
   */
  static fixStringTransform(fixString) {
    /* transform string from form like 'actionName' to 'ACTION_NAME'. */
    return decamelize(fixString, { separator: '_' }).toUpperCase();
  }

  /**
   * @param {string} fixString
   * @return {string}
   */
  static capitalize(fixString) {
    /* transform string form form like 'action' to 'Action'. */
    return fixString[0].toUpperCase() + fixString.substr(1);
  }

  /**
   * Generate action strings and its action creator
   * @param {string} prefix
   * @param {string} actionName
   * @param {string} [suffix]
   * @return {object}
   */
  static generateActionBinder(prefix, actionName, suffix) {
    /* PREFIX, actionName, suffix => PREFIX/ACTION_NAME_SUFFIX. */
    let TYPE = ActionCreator.fixStringTransform(actionName);
    if (suffix) {
      const capitalisedSuffix = ActionCreator.fixStringTransform(suffix);
      TYPE += (`_${capitalisedSuffix}`);
    }
    const typeWithPrefix = `${prefix}/${TYPE}`;
    return {
      TYPE,
      typeWithPrefix,
      creator: (payload) => {
        return {
          type: typeWithPrefix,
          payload,
        };
      },
    };
  }

  addOnStatus = []

  /**
   * Distribute add-on suffixes to actions
   * @param {object} options
   */
  integrateActionWithSuffixes(options) {
    const { prefix, actions } = options;
    actions.forEach((action) => {
      const innerAction = ActionCreator.generateActionBinder(prefix, action);
      const { TYPE, creator, typeWithPrefix } = innerAction;
      this[action] = creator;
      this[action].TYPE = typeWithPrefix;
      this[TYPE] = typeWithPrefix;
      this.addOnStatus.forEach((status) => {
        const statusAction = ActionCreator.generateActionBinder(prefix, action, status);
        const { TYPE, creator, typeWithPrefix } = statusAction;
        /* success: () => {} */
        this[action][status] = creator;
        /* actionSuccess: () => {} */
        this[action + ActionCreator.capitalize(status)] = creator;
        /* SUCCESS: 'PREFIX_ACTION_SUCCESS' */
        this[action][status.toUpperCase()] = typeWithPrefix;
        /* ACTION_SUCCESS: 'PREFIX_ACTION_SUCCESS */
        this[TYPE] = typeWithPrefix;
      });
    });
  }
}
