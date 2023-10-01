import { databases } from "@/appwrite";

export const getTodoGroupByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );
  const todos = data.documents;

  const columns = todos.reduce((accumulator, todo) => {
    if (!accumulator.get(todo.status)) {
      accumulator.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    accumulator.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      // get the image if it exists on the todo
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });
    return accumulator;
  }, new Map<TypedColumn, Column>());

  // if columns doesn't have inprogress, todo and done, andd them with empty todos
  const columnTypes: TypedColumn[] = ["todo", "in-progress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // sort columns by columTypes (todo > in-progress > done)
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };
  return board;
};
