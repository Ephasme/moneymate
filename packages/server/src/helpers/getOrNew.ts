import { EntityManager, FindOptionsWhere, ObjectLiteral } from "typeorm";
import { User } from "../entities/index.js";
import { randomUUID } from "crypto";

export const getOrNew = async <
  T extends ObjectLiteral & { userId: string; id: string }
>(
  entities: EntityManager,
  user: User,
  T: new () => T,
  id?: string
) => {
  let isNew: boolean = false;
  let item: T | null;
  if (id) {
    item = await entities.findOneBy<T>(T, {
      id,
      userId: user.id,
    } as FindOptionsWhere<T>);
    if (!item) {
      isNew = true;
      item = new T();
      item.id = id ?? randomUUID();
      item.userId = user.id;
    }
  } else {
    isNew = true;
    item = new T();
    item.id = id ?? randomUUID();
    item.userId = user.id;
  }
  return [item, isNew] as const;
};
