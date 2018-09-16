import ActionCreator from './ActionCreator';

test('Camelise action names', () => {
  expect(ActionCreator.prototype.convertOptions('pageA', [
    'sync-action-A',
    'sync-Action_b',
    'Sync actionC',
  ])).toEqual({
    prefix: 'PAGE_A',
    actions: ['syncActionA', 'syncActionB', 'syncActionC'],
  });
});

test('Prefix and capitalise action type names', () => {
  expect(ActionCreator.prototype.convertActionTypeName(
    'PAGE_A',
    'syncActionA',
  )).toBe('PAGE_A/SYNC_ACTION_A');
});

test('Generate two mappings of action type names and action names', () => {
  expect(ActionCreator.prototype.createActionTypeNameAndActionNameRelations(
    'PAGE_A',
    [
      'syncActionA',
      'syncActionB',
    ],
  )).toEqual({
    actionTypeNameToActionNameRelations: {
      'PAGE_A/SYNC_ACTION_A': 'syncActionA',
      'PAGE_A/SYNC_ACTION_B': 'syncActionB',
    },
    actionNameToActionTypeNameRelations: {
      syncActionA: 'PAGE_A/SYNC_ACTION_A',
      syncActionB: 'PAGE_A/SYNC_ACTION_B',
    },
  });
});

test('Bind action types to class instance', () => {
  const self = {};

  ActionCreator.prototype.bindActionTypes.call(self, 'PAGE_A', {
    'PAGE_A/SYNC_ACTION_A': 'syncActionA',
    'PAGE_A/SYNC_ACTION_B': 'syncActionB',
  });

  expect(self).toEqual({
    SYNC_ACTION_A: 'PAGE_A/SYNC_ACTION_A',
    SYNC_ACTION_B: 'PAGE_A/SYNC_ACTION_B',
  });
});

test('Bind actions to class instance', () => {
  const self = {};

  ActionCreator.prototype.bindActions.call(self, {
    syncActionA: 'PAGE_A/SYNC_ACTION_A',
    syncActionB: 'PAGE_A/SYNC_ACTION_B',
  });

  expect(self.syncActionA({ somePayload: 'payloadValue' }))
    .toEqual({
      type: 'PAGE_A/SYNC_ACTION_A',
      payload: {
        somePayload: 'payloadValue',
      },
    });
  expect(self.syncActionB({ somePayload: 'payloadValue' }))
    .toEqual({
      type: 'PAGE_A/SYNC_ACTION_B',
      payload: {
        somePayload: 'payloadValue',
      },
    });
});
