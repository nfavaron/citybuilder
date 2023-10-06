import { ObjectPoolService } from './object-pool.service';

const service: { [uid: string]: ObjectPoolService<any>; } = {};

export function ObjectPoolServiceFactory<Class>(uid: string): ObjectPoolService<Class> {

  return service[uid] || (service[uid] = new ObjectPoolService<Class>());
}
