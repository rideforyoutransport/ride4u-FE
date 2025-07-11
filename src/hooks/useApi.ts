import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services';
import type { ApiResponse } from '../types';

interface UseApiOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export function useApi<T = any>(
  endpoint: string,
  options: UseApiOptions<T> = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse<T> = await apiService.get(endpoint, params);
      
      if (response.success) {
        setData(response.result);
        onSuccess?.(response.result);
      } else {
        throw new Error(response.message || 'API request failed');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, onSuccess, onError]);

  const post = useCallback(async (body: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse<T> = await apiService.post(endpoint, body);
      
      if (response.success) {
        setData(response.result);
        onSuccess?.(response.result);
        return response.result;
      } else {
        throw new Error(response.message || 'API request failed');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, onSuccess, onError]);

  const put = useCallback(async (body: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse<T> = await apiService.put(endpoint, body);
      
      if (response.success) {
        setData(response.result);
        onSuccess?.(response.result);
        return response.result;
      } else {
        throw new Error(response.message || 'API request failed');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, onSuccess, onError]);

  const remove = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse<T> = await apiService.delete(endpoint);
      
      if (response.success) {
        onSuccess?.(response.result);
        return response.result;
      } else {
        throw new Error(response.message || 'API request failed');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    post,
    put,
    remove,
    refetch: execute,
  };
}
