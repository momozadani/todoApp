import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "./model/Todo";

@Pipe({
  name: "sortingByDone",
  standalone: true,
})
export class SortingByDonePipe implements PipeTransform {
  transform(todoList: Todo[], sort: boolean): Todo[] {
    if (todoList && sort !== undefined) {
      let sortedArray = [...todoList];
      if (sort) {
        sortedArray.sort((itemA, itemB) => {
          let a = itemA.done ? 1 : 0;
          let b = itemB.done ? 1 : 0;
          return a - b;
        });
      }

      return sortedArray;
    }

    return todoList;
  }
}
