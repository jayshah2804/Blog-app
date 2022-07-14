import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

    const firebaseConfig = {
      apiKey: "AIzaSyC1lKqvzp0G1R84F5_8u-K-QPn8WJ1HRNc",
      authDomain: "react-hhtp28.firebaseapp.com",
      // databaseURL: "https://react-hhtp28-default-rtdb.firebaseio.com",
      projectId: "react-hhtp28",
      storageBucket: "react-hhtp28.appspot.com",
      messagingSenderId: "848578048139",
      appId: "1:848578048139:web:825ea68e5e3c0a0c38e48e"
    };

  const app = initializeApp(firebaseConfig);

  export const storage = getStorage(app);
  export const db = getFirestore(app);
  export const auth =getAuth(app);