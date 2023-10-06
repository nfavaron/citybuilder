export class ObjectPoolService<Class> {

  /**
   * Pool of objects identified by ID
   */
  private pool: {
    [uid: string]: Class;
  } = {};

  /**
   * Add to the pool an @object identified by @uid
   */
  add(uid: string, object: Class): void {

    this.pool[uid] = object;
  }

  /**
   * Remove from the pool an object identified by @uid
   */
  remove(uid: string): void {

    delete this.pool[uid];
  }

  /**
   * Return the object identified by @uid, returns null if not found
   */
  get(uid: string): Class | null {

    return this.pool[uid] || null;
  }

  /**
   * Return a list of the world's entities
   */
  list(): Class[] {

    return Object
    .keys(this.pool)
    .map(uid => this.pool[uid]);
  }
}
