import {db} from "./db";

export class dbuser_categories extends db{
  constructor() {
    super();
    this.table = "user_categories";
  }

  async assignDefaultCategories(user_id : number) {

  }
}
