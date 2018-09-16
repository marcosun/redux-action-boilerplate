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

  expect(action.syncActionA).toHaveProperty('TYPE');
  expect(action.syncActionB).toHaveProperty('TYPE');
  expect(action.syncActionC).toHaveProperty('TYPE');

  expect(action.syncActionA.TYPE).toEqual('PAGE_A/SYNC_ACTION_A');
  expect(action.syncActionB.TYPE).toEqual('PAGE_A/SYNC_ACTION_B');
  expect(action.syncActionC.TYPE).toEqual('PAGE_A/SYNC_ACTION_C');
});
