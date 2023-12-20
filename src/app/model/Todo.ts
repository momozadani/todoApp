export class Todo {
  constructor(
    public id: number,
    public done: boolean,
    public task: string,
    public dueDate: number,
    public categorie: string,
    public priority: number
  ) {}
}
