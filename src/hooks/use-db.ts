import { useEffect, useRef, useState } from 'react';
import Database from 'tauri-plugin-sql-api';

export default function useDb() {
  const [loading, setLoading] = useState(true);
  const dbRef = useRef<Database>();

  useEffect(() => {
    const setDbRef = async () => {
      dbRef.current = await Database.load('sqlite:data.db');
      setLoading(false);
    };

    setDbRef();
  }, []);

  return [dbRef, loading] as const;
}
