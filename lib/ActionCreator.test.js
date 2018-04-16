import ActionCreator from './ActionCreator';

test('Camelise action names', () => {
  expect(ActionCreator.prototype.convertOptions('pageA', [
    'sync-action-A',
    'sync-Action_b',
    'Sync actionC',
  ])).toEqual({
    prefix: 'PAGE-A',
    actions: ['syncActionA', 'syncActionB', 'syncActionC'],
  });
});

test('Prefix and capitalise action type names', () => {
  expect(ActionCreator.prototype.convertActionTypeName(
    'PAGE-A',
    'syncActionA',
  )).toBe('PAGE-A/SYNC-ACTION-A');
});

test('Generate two mappings of action type names and action names', () => {
  expect(ActionCreator.prototype.createActionTypeNameAndActionNameRelations(
    'PAGE-A',
    [
      'syncActionA',
      'syncActionB',
    ]
  )).toEqual({
    actionTypeNameToActionNameRelations: {
      'PAGE-A/SYNC-ACTION-A': 'syncActionA',
      'PAGE-A/SYNC-ACTION-B': 'syncActionB',
    },
    actionNameToActionTypeNameRelations: {
      'syncActionA': 'PAGE-A/SYNC-ACTION-A',
      'syncActionB': 'PAGE-A/SYNC-ACTION-B',
    },
  });
});

test('Bind action types to class instance', () => {
  const self = {};

  ActionCreator.prototype.bindActionTypes.call(self, 'PAGE-A', {
    'PAGE-A/SYNC-ACTION-A': 'syncActionA',
    'PAGE-A/SYNC-ACTION-B': 'syncActionB',
  });

  expect(self).toEqual({
    'SYNC-ACTION-A': 'PAGE-A/SYNC-ACTION-A',
    'SYNC-ACTION-B': 'PAGE-A/SYNC-ACTION-B',
  });
});

test('Bind actions to class instance', () => {
  const self = {};

  ActionCreator.prototype.bindActions.call(self, {
    'syncActionA': 'PAGE-A/SYNC-ACTION-A',
    'syncActionB': 'PAGE-A/SYNC-ACTION-B',
  });

  expect(self.syncActionA({somePayload: 'payloadValue'}))
    .toEqual({
      type: 'PAGE-A/SYNC-ACTION-A',
      payload: {
        somePayload: 'payloadValue',
      },
    });
  expect(self.syncActionB({somePayload: 'payloadValue'}))
    .toEqual({
      type: 'PAGE-A/SYNC-ACTION-B',
      payload: {
        somePayload: 'payloadValue',
      },
    });
});
