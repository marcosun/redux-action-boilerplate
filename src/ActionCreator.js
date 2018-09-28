import { camelize, decamelize } from 'humps';
import invariant from './invariant';

/* Class to generate actions. */
export default class ActionCreator {
  /**
   * Transform string to String.
   * @param {string} string
   * @return {string}
   */
  static capitalise(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  /**
   * Create ACTION_TYPE, PREFIX/ACTION_TYPE and action creator.
   * @param {string} prefix
   * @param {string} actionName
   * @param {string} [suffix]
   * @return {object}
   */
  static createActionElements(prefix, actionName, suffix) {
    /* PREFIX, actionName, suffix => PREFIX/ACTION_NAME_SUFFIX. */
    let ACTION_TYPE = ActionCreator.toUnderscoreUpperCase(actionName);

    /* Append suffix to TYPE */
    if (suffix) {
      const SUFFIX = ActionCreator.toUnderscoreUpperCase(suffix);
      ACTION_TYPE = `${ACTION_TYPE}_${SUFFIX}`;
    }

    const PREFIX_ACTION_TYPE = `${prefix}/${ACTION_TYPE}`;

    return {
      ACTION_TYPE,
      PREFIX_ACTION_TYPE,
      actionCreator: (payload) => {
        return {
          type: PREFIX_ACTION_TYPE,
          payload,
        };
      },
    };
  }

  /**
   * Process fault tolarent prefix and actions.
   * @param  {string} prefix
   * @param  {string[]} actions
   * @return {object}
   */
  static normaliseOptions(prefix, actions) {
    invariant(
      Array.isArray(actions),
      'actions expect to be type of array',
    );

    return {
      /* Prefix takes the form of SOME_PREFIX. */
      prefix: typeof prefix === 'string' ?
        ActionCreator.toUnderscoreUpperCase(prefix) :
        '',
      /* Actions takes the form of someActions. */
      actions: actions.map((action) => {
        return camelize(action);
      }),
    };
  }

  /**
   * Transform string from actionName to ACTION_NAME.
   * @param {string} string
   * @return {string}
   */
  static toUnderscoreUpperCase(string) {
    return decamelize(string, { separator: '_' }).toUpperCase();
  }

  /**
   * @param {object} options
   */
  constructor(options) {
    const { prefix, actions } = options;

    this.$$normalisedOptions = ActionCreator.normaliseOptions(prefix, actions);
  }

  addOnStatus = []

  /**
   * Distribute add-on suffixes to actions
   * @param {object} options
   */
  integrateActionWithSuffixes(options) {
    const { prefix, actions } = options;
    actions.forEach((action) => {
      const { ACTION_TYPE, PREFIX_ACTION_TYPE, actionCreator } = ActionCreator.createActionElements(prefix, action);
      this[action] = actionCreator;
      this[action].TYPE = PREFIX_ACTION_TYPE;
      this[ACTION_TYPE] = PREFIX_ACTION_TYPE;
      this.addOnStatus.forEach((status) => {
        const statusAction = ActionCreator.createActionElements(prefix, action, status);
        const { TYPE, creator, typeWithPrefix } = statusAction;
        /* success: () => {} */
        this[action][status] = creator;
        /* actionSuccess: () => {} */
        this[action + ActionCreator.capitalise(status)] = creator;
        /* SUCCESS: 'PREFIX_ACTION_SUCCESS' */
        this[action][status.toUpperCase()] = typeWithPrefix;
        /* ACTION_SUCCESS: 'PREFIX_ACTION_SUCCESS */
        this[TYPE] = typeWithPrefix;
      });
    });
  }
}
