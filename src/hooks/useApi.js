// src/hooks/useApi.js
import { useState, useCallback } from 'react';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setData(result);
      return { success: true, data: result };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url) => request(url), [request]);
  
  const post = useCallback((url, body) => 
    request(url, { method: 'POST', body: JSON.stringify(body) }), 
    [request]
  );
  
  const put = useCallback((url, body) => 
    request(url, { method: 'PUT', body: JSON.stringify(body) }), 
    [request]
  );
  
  const del = useCallback((url) => 
    request(url, { method: 'DELETE' }), 
    [request]
  );

  return {
    loading,
    error,
    data,
    request,
    get,
    post,
    put,
    delete: del,
  };
}

// Exemplo de uso:
// const { loading, error, post } = useApi();
// 
// const handleSubmit = async () => {
//   const result = await post('/api/something', { data: 'value' });
//   if (result.success) {
//     console.log('Sucesso!', result.data);
//   }
// };