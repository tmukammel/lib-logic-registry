import { Method } from './method.enum';

export interface IInvoke {
	invoke<Q, T, R>(forResource: string, onMethod: Method, query: Q, repo: T): Promise<boolean | R | Error>;
}
