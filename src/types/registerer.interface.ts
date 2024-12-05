import { Logic } from './logic.type';
import { Method } from './method.enum';

export interface IRegister {
	/**
	 * Register a logic
	 * @param forResource string
	 * @param onMethod string
	 * @param logic Logic
	 */
	register<Q, T, R>(forResource: string, onMethod: Method, logic: Logic<Q, T, R>): boolean;
	unregister(forResource: string, onMethod: Method): boolean;
}
