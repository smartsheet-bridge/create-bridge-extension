import { WorkflowTriggerSpec } from './WorkflowTriggerSpec';

describe('model tests - WorkflowTriggerSpec', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('setStateValues', async () => {
    const spec = new WorkflowTriggerSpec();
    spec.setStateValues({ key: 'value' });

    expect(spec).toHaveProperty('stateValues');
    expect(spec.stateValues).toEqual({ key: 'value' });
  });

  it('setTriggerDetails', async () => {
    const spec = new WorkflowTriggerSpec();
    spec.setTriggerDetails({ event: 'sheet:create', sheet: 'mine' });

    expect(spec).toHaveProperty('triggerDetails');
    expect(spec.triggerDetails).toHaveProperty('event');
    expect(spec.triggerDetails).toHaveProperty('sheet');
    expect(spec.triggerDetails.sheet).toEqual('mine');
  });

  it('setWorkflowID', async () => {
    const spec = WorkflowTriggerSpec.create();
    spec.setWorkflowID('TRIGGER_THIS');

    expect(spec).toHaveProperty('workflowID');
    expect(spec.workflowID).toEqual('TRIGGER_THIS');
  });

  it('create', async () => {
    const spec = WorkflowTriggerSpec.create({
      stateValues: { key: 'value' },
      triggerDetails: { event: 'sheet:create', sheet: 'mine' },
      workflowID: 'TRIGGER_THIS',
    });

    expect(spec).toHaveProperty('stateValues');
    expect(spec.stateValues).toEqual({ key: 'value' });
    expect(spec).toHaveProperty('triggerDetails');
    expect(spec.triggerDetails).toHaveProperty('event');
    expect(spec.triggerDetails).toHaveProperty('sheet');
    expect(spec.triggerDetails.sheet).toEqual('mine');
    expect(spec).toHaveProperty('workflowID');
    expect(spec.workflowID).toEqual('TRIGGER_THIS');
  });

  it('toSerializableObject', async () => {
    const spec = WorkflowTriggerSpec.create({
      stateValues: { key: 'value' },
      triggerDetails: { event: 'sheet:create', sheet: 'mine' },
      workflowID: 'TRIGGER_THIS',
    });

    const actual = spec.toSerializableObject();

    expect(actual).toHaveProperty('intent');
    expect(actual).toHaveProperty('entityData');
    expect(actual).toHaveProperty('triggerDetails');
    expect(actual).toEqual({
      entityData: { key: 'value' },
      triggerDetails: { event: 'sheet:create', sheet: 'mine' },
      intent: 'TRIGGER_THIS',
    });
  });
});
