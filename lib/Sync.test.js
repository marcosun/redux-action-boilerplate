import Sync from './Sync';

test('Camelise action names', () => {
  expect(Sync.prototype.convertOptions('pageA', [
    'sync-action-A',
    'sync-Action_b',
    'Sync actionC',
  ])).toEqual({
    prefix: 'PAGE-A',
    actions: ['syncActionA', 'syncActionB', 'syncActionC'],
  });
});
