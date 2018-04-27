import Sync from './Sync';

test('Create synchronise actions and action types', () => {
  const action = new Sync({
    prefix: 'pageA',
    actions: [
      'sync-action-A',
      'sync-Action_b',
      'Sync actionC',
    ],
  });

  expect(action).toHaveProperty('SYNC_ACTION_A', 'PAGE_A/SYNC_ACTION_A');
  expect(action).toHaveProperty('SYNC_ACTION_B', 'PAGE_A/SYNC_ACTION_B');
  expect(action).toHaveProperty('SYNC_ACTION_C', 'PAGE_A/SYNC_ACTION_C');

  expect(action).toHaveProperty('syncActionA');
  expect(action).toHaveProperty('syncActionB');
  expect(action).toHaveProperty('syncActionC');
});