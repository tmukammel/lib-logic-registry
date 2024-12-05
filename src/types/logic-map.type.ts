/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logic } from './logic.type';
import { Method } from './method.enum';

/**
 * structure
 *
 * {
 *   User: {
 *     get: Logic,
 *     post: Logic
 *   },
 *   Job: {
 *     get: Logic,
 *     post: Logic
 *   }
 * }
 */

// We are using explicit 'any', as clients would want to map
// different type params for different logics
export type LogicMap = Map<string, Map<string, Logic<any, any, any>>>;

export interface LogicPack<Q, T, R> {
	resource: string;
	method: Method;
	logic: Logic<Q, T, R>;
}

export interface LogicIdentifier {
	resource: string;
	method: Method;
}
