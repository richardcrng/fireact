import { useFirebaseDatabaseValue, useFirebaseDatabaseWriters } from "..";

function useFirebaseDatabaseState(path: string) {
  const value = useFirebaseDatabaseValue(path)
  const writers = useFirebaseDatabaseWriters(path)

  return [value, writers]
}

export default useFirebaseDatabaseState;