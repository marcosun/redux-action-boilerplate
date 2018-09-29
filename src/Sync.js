import ActionCreator from './ActionCreator';

/* Sync actions */
export default class Sync extends ActionCreator {
  constructor(options) {
    super(options);

    this.bindInstanceWithActions();
  }
}
