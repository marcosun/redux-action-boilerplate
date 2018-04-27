import Async from './Async';

test('Create asynchronise actions and action types', () => {
  const action = new Async({
    prefix: 'pageA',
    actions: [
      'async-action-A',
      'async-Action_b',
    ],
  });

  expect(action).toHaveProperty('ASYNC_ACTION_A', 'PAGE_A/ASYNC_ACTION_A');
  expect(action).toHaveProperty('ASYNC_ACTION_A_SUCCESS', 'PAGE_A/ASYNC_ACTION_A_SUCCESS');
  expect(action).toHaveProperty('ASYNC_ACTION_A_FAILURE', 'PAGE_A/ASYNC_ACTION_A_FAILURE');
  expect(action).toHaveProperty('ASYNC_ACTION_B', 'PAGE_A/ASYNC_ACTION_B');
  expect(action).toHaveProperty('ASYNC_ACTION_B_SUCCESS', 'PAGE_A/ASYNC_ACTION_B_SUCCESS');
  expect(action).toHaveProperty('ASYNC_ACTION_B_FAILURE', 'PAGE_A/ASYNC_ACTION_B_FAILURE');

  expect(action).toHaveProperty('asyncActionA');
  expect(action).toHaveProperty('asyncActionASuccess');
  expect(action).toHaveProperty('asyncActionAFailure');
  expect(action).toHaveProperty('asyncActionB');
  expect(action).toHaveProperty('asyncActionBSuccess');
  expect(action).toHaveProperty('asyncActionBFailure');
});
