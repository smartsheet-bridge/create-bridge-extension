import { WorkflowTriggerSpec } from '../models/WorkflowTriggerSpec';
import { RegisterResponse } from './RegisterResponse';

describe('RegisterResponse', () => {
  describe('setSettings', () => {
    const response = RegisterResponse.create();
    response.setSettings({ key: 'value' });

    expect(response).toHaveProperty('settings');
    expect(response.settings).toHaveProperty('key');
    expect(response.settings.key).toEqual('value');
  });

  describe('addWorkflowTriggers', () => {
    const tests = [
      {
        triggers: [{ workflowID: 'value' }],
        expected: [{ workflowID: 'value' }],
      },
      {
        triggers: [
          { workflowID: 'value' },
          { workflowID: 'other', stateValues: { key: 'value' } },
        ],
        expected: [
          { workflowID: 'value' },
          { workflowID: 'other', stateValues: { key: 'value' } },
        ],
      },
    ];

    tests.forEach(test => {
      const response = RegisterResponse.create();
      response.addWorkflowTriggers(...test.triggers);

      expect(response).toHaveProperty('workflowTriggers');
      expect(response.workflowTriggers).toHaveLength(test.expected.length);
      expect(response.workflowTriggers).toEqual(test.expected);
    });
  });

  describe('constructor', () => {
    const PROPS = {
      status: 1,
      settings: {
        a: 'a',
      },
    };
    it('accepts when constructor given empty', () => {
      expect(new RegisterResponse()).toEqual({
        status: 0,
      });
    });
    it('accepts when constructor given props', () => {
      expect(new RegisterResponse(PROPS)).toEqual(PROPS);
    });
    it('accepts when static constructor given empty', () => {
      expect(RegisterResponse.create()).toEqual({
        status: 0,
      });
    });
    it('accepts when static constructor given props', () => {
      expect(RegisterResponse.create(PROPS)).toEqual(PROPS);
    });
  });
  describe('toSerializableObject', () => {
    const tests = [
      {
        given: {
          settings: {
            a: 'a',
          },
        },
        expected: {
          status: 0,
          registrationData: {
            a: 'a',
          },
        },
      },
      {
        given: {
          settings: {
            a: 'a',
          },
          workflowTriggers: [
            WorkflowTriggerSpec.create({
              workflowID: 'WORKFLOW',
            }),
            WorkflowTriggerSpec.create({
              workflowID: 'OTHER',
              stateValues: { key: 'value' },
            }),
          ],
        },
        expected: {
          status: 0,
          registrationData: {
            a: 'a',
          },
          workflowTriggers: [
            {
              intent: 'WORKFLOW',
            },
            {
              intent: 'OTHER',
              entityData: { key: 'value' },
            },
          ],
        },
      },
    ];

    tests.forEach((test, index) => {
      it(`serializes to expected result ${index}`, () => {
        expect(new RegisterResponse(test.given).toSerializableObject()).toEqual(
          test.expected
        );
      });
    });
  });
});
