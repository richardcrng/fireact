import { useFirebaseDatabaseValue, useFirebaseDatabaseWriters } from "..";
import { DatabaseValueOptions } from "../useFirebaseDatabaseValue/useFirebaseDatabaseValue";
import { FirebaseDatabaseWriters } from "../../types";

type FirebaseDatabaseState<T = any> = [
  T | undefined,
  FirebaseDatabaseWriters<T>
]

function useFirebaseDatabaseState<T = any>(path: string, options: DatabaseValueOptions = {}) : FirebaseDatabaseState<T> {
  const value = useFirebaseDatabaseValue<T>(path, options)
  const writers = useFirebaseDatabaseWriters(path)

  return [value, writers]
}

export default useFirebaseDatabaseState;