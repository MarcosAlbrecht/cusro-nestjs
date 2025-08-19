import { CategoryEntity } from '../entities/category.entity';

export class ReturnCategory {
  id: Number;
  name: string;

  constructor(categoryEntity: CategoryEntity) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
  }
}
