import { useEffect, useState } from 'react';

export default function useFetch<TResponse>(
  request: (...params: any[]) => Promise<TResponse>,
  ...params: any[]
) {
  const [data, setData] = useState<TResponse>();
  const [isFetching, setIsFetching] = useState(true);

  const fetch = async () => {
    setIsFetching(true);
    setData(await request(...params));
    setIsFetching(false);
  };

  useEffect(() => {
    fetch();
  }, [...params]);

  return { data, isFetching, reFetch: fetch };
}
