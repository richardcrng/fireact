import * as React from 'react';
import Firebase from '../Firebase';

const FirebaseContext = React.createContext<typeof Firebase | null>(null)
FirebaseContext.displayName = "FirebaseContext"

export default FirebaseContext