import * as React from 'react';
import Firebase from '../types/Firebase';

const FirebaseContext = React.createContext<Firebase | null>(null)
FirebaseContext.displayName = "FirebaseContext"

export default FirebaseContext