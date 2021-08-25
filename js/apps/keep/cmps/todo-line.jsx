export function TodoLine({todo }){
    console.log(todo.txt);
    return (
        <div className="todo-line">
            <h1>{todo.txt}</h1>
        </div>
    )
}