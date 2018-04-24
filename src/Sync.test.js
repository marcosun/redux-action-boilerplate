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

  expect(action).toHaveProperty('SYNC-ACTION-A', 'PAGE-A/SYNC-ACTION-A');
  expect(action).toHaveProperty('SYNC-ACTION-B', 'PAGE-A/SYNC-ACTION-B');
  expect(action).toHaveProperty('SYNC-ACTION-C', 'PAGE-A/SYNC-ACTION-C');

  expect(action).toHaveProperty('syncActionA');
  expect(action).toHaveProperty('syncActionB');
  expect(action).toHaveProperty('syncActionC');
});
