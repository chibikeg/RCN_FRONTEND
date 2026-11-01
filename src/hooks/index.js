import { useState, useEffect, useCallback } from 'react';

/**
 * Generic hook for API calls with loading, error, and data states
 */
export const useApiCall = (apiFunc, options = {}) => {
  const { immediate = false, deps = [] } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunc(...args);
        const result = response.data || response;
        setData(result.data ?? result);
        return result;
      } catch (err) {
        const message =
          err.response?.data?.message || err.message || 'An error occurred';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate]);

  return { data, loading, error, execute, setData };
};

/**
 * Hook for paginated API calls
 */
export const usePagination = (apiFunc, initialParams = {}) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(initialParams.limit || 12);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = useCallback(
    async (pageNum = 1, extraParams = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunc({ page: pageNum, limit, ...initialParams, ...extraParams });
        const result = response.data || response;
        setData(result.data || []);
        setPagination(result.pagination || null);
        setPage(pageNum);
        return result;
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to load data';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [apiFunc, limit]
  );

  const nextPage = () => {
    if (pagination && page < pagination.totalPages) {
      fetchPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      fetchPage(page - 1);
    }
  };

  return {
    data,
    pagination,
    loading,
    error,
    page,
    fetchPage,
    nextPage,
    prevPage,
  };
};

/**
 * Hook to debounce a value
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for form state management
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const setFieldError = (name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    setValues,
    setErrors,
    reset,
  };
};
