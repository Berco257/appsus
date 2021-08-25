export function TodoLine({todo }){
    console.log(todo.txt);
    return (
        <div className="todo-line">
            <input type="checkbox"/>
            <h1>{todo.txt}</h1>
        </div>
    )
}