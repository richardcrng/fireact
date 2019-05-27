import { useFirebaseUser } from "..";

function useFirebaseUserUid() {
  const user = useFirebaseUser() || { uid: null }

  return user.uid
}

export default useFirebaseUserUid;