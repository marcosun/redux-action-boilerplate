import ActionCreator from './ActionCreator';

/* Sync actions */
export default class Async extends ActionCreator {
  constructor(options) {
    super(options);

    this.asyncSuffixes = ['success', 'failure'];

    this.bindInstanceWithActions();
  }
}
