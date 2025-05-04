// src/components/VisitCounter.tsx

import React, { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, runTransaction, onValue, DatabaseReference } from 'firebase/database';

// Your Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyCBIeH2t_e5W_JncMzP62q67VBM3Q_EC5E",
  authDomain: "portfolio-92569.firebaseapp.com",
  databaseURL: "https://portfolio-92569-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-92569",
  storageBucket: "portfolio-92569.firebasestorage.app",
  messagingSenderId: "106806193235",
  appId: "1:106806193235:web:794f23be14227edb4d2aa6",
  measurementId: "G-0XLKT228YZ"
};

// Initialize or reuse Firebase App
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Get a singleton database instance
const database = getDatabase(app);

const VisitCounter: React.FC = () => {
  const [visits, setVisits] = useState<number>(0);

  useEffect(() => {
    const visitRef: DatabaseReference = ref(database, 'visitCount');

    // Atomically increment the counter by 1
    runTransaction(visitRef, (currentCount) => {
      return (currentCount || 0) + 1;
    }).catch((error) => {
      console.error('Transaction failed:', error);
    });

    // Subscribe to value changes and update state
    const unsubscribe = onValue(visitRef, (snapshot) => {
      const count = (snapshot.val() as number) || 0;
      setVisits(count);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // inside VisitCounter’s return…
     return (
         <div className="text-center text-sm font-medium sm:text-base md:text-lg md:font-semibold">
          Total Visited Count{' '}
          <span className="text-blue-600">{visits}</span>{' '}
          time{visits !== 1 && 's'}
        </div>
      )
  
};

export default VisitCounter;
