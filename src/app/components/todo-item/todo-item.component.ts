import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  getClasses() {
    const classes = {
      todo: true,
      'is-complete': this.todo.completed
    };

    return classes;
  }

  onToggle() {
    //Toggle in UI
    this.todo.completed = !this.todo.completed;
    //Toggle on server
    this.todoService.toggleCompleted(this.todo).subscribe(todo => {
      console.log(todo);
    });
  }

  onDelete() {
    this.deleteTodo.emit(this.todo)
  }
}
