import { Logic } from './../src/types/logic.type';

// in the core (business rules) layer

// A placeholder or DTO in the core layer
// representing a data object in app layer
export type XYZRes = {
	name: string;
	id: number;
};

interface IRepo<R> {
	get(id: number): R | undefined;
	post(model: R): R | undefined;
	del(id: number): R | undefined;
}

// In the app layer

export class XYZRepo implements IRepo<XYZRes> {
	store: Map<number, XYZRes> = new Map();

	get(id: number): XYZRes | undefined {
		return this.store.get(id) || undefined;
	}
	post(model: XYZRes): XYZRes | undefined {
		this.store.set(model.id, model);
		return this.store.get(model.id);
	}
	del(id: number): XYZRes | undefined {
		const res = this.store.get(id) || undefined;
		if (res) this.store.delete(id);
		return res;
	}
}

// in the core (business rules) layer

export const postLogic: Logic<JSON, XYZRepo, XYZRes | undefined> = async (
	query: JSON,
	repo: XYZRepo
): Promise<XYZRes | undefined | Error> => {
	if (query['name'].startsWith('Mr')) {
		return new Error(`Not registering Males`);
	}
	const res: XYZRes = { name: query['name'], id: query['id'] };
	return repo.post(res);
};
