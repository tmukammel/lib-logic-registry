import { Registerer } from './../src/registerer';
import { beforeAll, describe, expect, test } from '@jest/globals';
import { Method } from '../src/types/method.enum';
import { postLogic } from './types';

let registerer: Registerer;

beforeAll(() => {
	registerer = Registerer.instance;
});

describe('Logic registerer', () => {
	test('creates a singleton instance', () => {
		const anotherReg = Registerer.instance;
		expect(registerer).toBe(anotherReg);
	});

	describe('while registering', () => {
		test('can not register a logic with empty resource name', () => {
			expect(registerer.register('', Method.post, postLogic)).toBeFalsy();
		});

		test('can register a logic with given resource name', () => {
			expect(registerer.register('XYZRes', Method.post, postLogic)).toBeTruthy();
		});

		test('cannot override a registered logic', () => {
			expect(registerer.register('XYZRes', Method.post, postLogic)).toBeFalsy();
		});
	});

	describe('while unregistering', () => {
		test('cannot unregister logic with emptry resource name', () => {
			expect(registerer.unregister('', Method.post)).toBeFalsy();
		});

		test('cannot unregister logic with wrong resource name', () => {
			expect(registerer.unregister('wrong-XYZRes', Method.post)).toBeFalsy();
		});

		test('can unregister a logic with given resource name', () => {
			expect(registerer.unregister('XYZRes', Method.post)).toBeTruthy();
		});

		test('cannot unregister a logic again with same resource name', () => {
			expect(registerer.unregister('XYZRes', Method.post)).toBeFalsy();
		});
	});
});
