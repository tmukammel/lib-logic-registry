import { Invoker } from './../src/invoker';
import { beforeAll, describe, expect, test } from '@jest/globals';
import { Registerer } from '../src/registerer';
import { Method } from '../src/types/method.enum';
import { postLogic, XYZRepo, XYZRes } from './types';

let registerer: Registerer;
let invoker: Invoker;

describe('Logic invoker', () => {
	beforeAll(() => {
		registerer = Registerer.instance;
		registerer.register('XYZRes', Method.post, postLogic);
		invoker = Invoker.instance;
	});
	test('creates a singleton instance', () => {
		const anotherInvk = Invoker.instance;
		expect(invoker).toBe(anotherInvk);
	});

	describe('while invoking', () => {
		test('cannot invoke an unregistered logic', async () => {
			await expect(invoker.invoke('XYZRes', Method.get, {}, new XYZRepo())).resolves.toBeFalsy();
		});

		test('can invoke a registered logic', async () => {
			const res = await invoker.invoke('XYZRes', Method.post, { name: 'Mss Maryam', id: 1 }, new XYZRepo());
			expect((res as XYZRes).name).toBe('Mss Maryam');
		});

		test('can prove a registered logic is executing conditions', async () => {
			const res = await invoker.invoke('XYZRes', Method.post, { name: 'Mr Twaha', id: 1 }, new XYZRepo());
			expect((res as Error).message).toBe('Not registering Males');
		});
	});
});
