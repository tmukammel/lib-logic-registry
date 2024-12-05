import { LogicIdentifier, LogicMap, LogicPack } from './types/logic-map.type';
import { ILogicReadWrite } from './types/logic-rw.interface';
import { Logic } from './types/logic.type';

export class LogicStore implements ILogicReadWrite {
	private static _instance: LogicStore;
	private logics: LogicMap;

	private constructor() {
		this.logics = new Map();
	}

	public static get instance(): LogicStore {
		if (LogicStore._instance == null) {
			LogicStore._instance = new LogicStore();
		}

		return LogicStore._instance;
	}

	public registerLogic<Q, T, R>(logicPack: LogicPack<Q, T, R>) {
		const { resource, method, logic } = logicPack;

		if (resource.length <= 0) throw new Error('Resource name is required to register after');

		// is there a logic already registered for the model for given method?
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const existingLogic: Logic<any, any, any> | undefined = this.logics.get(resource)?.get(method) ?? undefined;
		if (existingLogic !== undefined)
			throw new Error(
				'Logic already registered, if you want to register a new, you have to unregister existing!'
			);

		if (this.logics.get(resource) === undefined) this.logics.set(resource, new Map());
		this.logics.get(resource)?.set(method, logic);
	}

	public unregisterLogic(logicId: LogicIdentifier) {
		const { resource, method } = logicId;

		if (resource.length <= 0) throw new Error('Was not able to register with empty name');

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const existingLogic: Logic<any, any, any> | undefined = this.logics.get(resource)?.get(method) ?? undefined;
		if (existingLogic === undefined) throw new Error('No logic is registered with this identifier');
		if (existingLogic !== undefined) this.logics.get(resource)?.delete(method);

		// remove map under resource if it is empty
		const size = this.logics.get(resource)?.size ?? 0;
		if (size <= 0) this.logics.delete(resource);
	}

	public getLogic<Q, T, R>(logicId: LogicIdentifier): Logic<Q, T, R> | undefined {
		const { resource, method } = logicId;
		return this.logics.get(resource)?.get(method) ?? undefined;
	}
}
