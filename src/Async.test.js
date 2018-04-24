import Async from './Async';

test('Create asynchronise actions and action types', () => {
  const action = new Async({
    prefix: 'pageA',
    actions: [
      'async-action-A',
      'async-Action_b',
    ],
  });

  expect(action).toHaveProperty('ASYNC-ACTION-A', 'PAGE-A/ASYNC-ACTION-A');
  expect(action).toHaveProperty('ASYNC-ACTION-A-SUCCESS', 'PAGE-A/ASYNC-ACTION-A-SUCCESS');
  expect(action).toHaveProperty('ASYNC-ACTION-A-FAILURE', 'PAGE-A/ASYNC-ACTION-A-FAILURE');
  expect(action).toHaveProperty('ASYNC-ACTION-B', 'PAGE-A/ASYNC-ACTION-B');
  expect(action).toHaveProperty('ASYNC-ACTION-B-SUCCESS', 'PAGE-A/ASYNC-ACTION-B-SUCCESS');
  expect(action).toHaveProperty('ASYNC-ACTION-B-FAILURE', 'PAGE-A/ASYNC-ACTION-B-FAILURE');

  expect(action).toHaveProperty('asyncActionA');
  expect(action).toHaveProperty('asyncActionASuccess');
  expect(action).toHaveProperty('asyncActionAFailure');
  expect(action).toHaveProperty('asyncActionB');
  expect(action).toHaveProperty('asyncActionBSuccess');
  expect(action).toHaveProperty('asyncActionBFailure');
});
