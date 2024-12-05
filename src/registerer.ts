import { LogicStore } from './logic-store';
import { Logic } from './types/logic.type';
import { Method } from './types/method.enum';
import { IRegister } from './types/registerer.interface';

export class Registerer implements IRegister {
	private static _instance: Registerer;
	private _logicStore: LogicStore;

	private constructor() {
		this._logicStore = LogicStore.instance;
	}

	public static get instance(): Registerer {
		if (Registerer._instance == null) {
			Registerer._instance = new Registerer();
		}

		return Registerer._instance;
	}

	public register<Q, M, R>(resource: string, method: Method, logic: Logic<Q, M, R>): boolean {
		try {
			// TODO: receive logic-path instead of Logic so that they are not initiated.
			// But also understand the javascript language module export feature
			// to understand the necessity of reciving path instad of Logic function
			this._logicStore.registerLogic({ resource, method, logic });
			return true;
		} catch (error) {
			console.debug(error);
			return false;
		}
	}

	public unregister(resource: string, method: Method): boolean {
		try {
			this._logicStore.unregisterLogic({ resource, method });
			return true;
		} catch (error) {
			console.debug(error);
			return false;
		}
	}
}
