import ActionCreator from './ActionCreator';

test('Camelize string', () => {
  expect(ActionCreator.toUnderscoreUpperCase('pageA')).toBe('PAGE_A');
});

test('Capitalise', () => {
  expect(ActionCreator.capitalise('pageA')).toBe('PageA');
});

test('generate Action and its creator', () => {
  const result = ActionCreator.createActionElements('PAGE_A', 'actionName', 'success');
  expect(result.ACTION_TYPE).toBe('ACTION_NAME_SUCCESS');
  expect(result.PREFIX_ACTION_TYPE).toBe('PAGE_A/ACTION_NAME_SUCCESS');
});

test('Camelise action names', () => {
  expect(ActionCreator.normaliseOptions('pageA', [
    'sync-action-A',
    'sync-Action_b',
    'Sync actionC',
  ])).toEqual({
    prefix: 'PAGE_A',
    actions: ['syncActionA', 'syncActionB', 'syncActionC'],
  });
});
