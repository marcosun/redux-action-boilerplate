import ActionCreator from './ActionCreator';

test('Camelize string', () => {
  expect(ActionCreator.fixStringTransform('pageA')).toBe('PAGE_A');
});

test('Capitalize', () => {
  expect(ActionCreator.capitalize('pageA')).toBe('PageA');
});

test('generate Action and its creator', () => {
  const result = ActionCreator.generateActionBinder('PAGE_A', 'actionName', 'success');
  expect(result.TYPE).toBe('ACTION_NAME_SUCCESS');
  expect(result.typeWithPrefix).toBe('PAGE_A/ACTION_NAME_SUCCESS');
});

test('Camelise action names', () => {
  expect(ActionCreator.convertOptions('pageA', [
    'sync-action-A',
    'sync-Action_b',
    'Sync actionC',
  ])).toEqual({
    prefix: 'PAGE_A',
    actions: ['syncActionA', 'syncActionB', 'syncActionC'],
  });
});
