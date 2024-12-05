import { LogicIdentifier, LogicPack } from './logic-map.type';
import { Logic } from './logic.type';

export interface ILogicReadWrite {
	registerLogic<Q, T, R>(logicData: LogicPack<Q, T, R>): void;
	unregisterLogic(identifier: LogicIdentifier): void;
	getLogic<Q, T, R>(logicId: LogicIdentifier): Logic<Q, T, R> | undefined;
}
