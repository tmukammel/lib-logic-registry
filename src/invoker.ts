import { Logic } from './types/logic.type';
import { LogicStore } from './logic-store';
import { IInvoke } from './types/invoke.interface';
import { Method } from './types/method.enum';

export class Invoker implements IInvoke {
	private static _instance: Invoker;
	private _logicStore: LogicStore;

	private constructor() {
		this._logicStore = LogicStore.instance;
	}

	public static get instance(): Invoker {
		if (Invoker._instance == null) {
			Invoker._instance = new Invoker();
		}

		return Invoker._instance;
	}

	invoke<Q, T, R>(resource: string, method: Method, query: Q, repo: T): Promise<boolean | R | Error> {
		const logic: Logic<Q, T, R> | undefined = this._logicStore.getLogic({ resource, method });
		if (logic === undefined) return Promise.resolve(false);
		return logic(query, repo);
	}
}
