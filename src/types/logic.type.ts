/**
 * About type params:
 * Clients should know what type params they are going to use for a logic
 * when registering
 * and should be able to fetch accordingly
 */
export type Logic<Q, T, R> = (query: Q, repo: T) => Promise<R | Error>;
