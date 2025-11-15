import { useEffect, useState, useCallback } from "react";

/**
 * A reusable data-fetching hook for REST APIs
 * Supports GET requests by default, with optional JWT auth.
 * 
 * Example:
 *   const { data, loading, error, refetch } = useFetch("/api/products/");
 */

interface FetchOptions extends RequestInit {
  auth?: boolean; // if true, adds Authorization header automatically
}

export function useFetch<T = unknown>(url: string, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      };

      // Add JWT token if required
      if (options?.auth) {
        const token = localStorage.getItem("access");
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }

      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
