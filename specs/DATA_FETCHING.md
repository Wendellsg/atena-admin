# DATA FETCHING SPECIFICATION

## Overview

We use **TanStack Query (React Query)** for server state management and caching, and **Axios** for HTTP requests. This combination provides a robust solution for data fetching, caching, synchronization, and server state updates.

## Core Concepts

- **Queries**: Used for fetching data (GET requests). Data is cached based on query keys.
- **Mutations**: Used for creating/updating/deleting data (POST, PUT, DELETE requests).
- **Query Keys**: Unique identifiers for queries, used for caching and invalidation.

## Architecture

1.  **API Layer (`src/lib/api.ts`)**: Base Axios instance with interceptors for authentication.
2.  **Service Functions**: Focused async functions that perform the actual HTTP requests using the API instance.
3.  **Custom Hooks**: Encapsulate TanStack Query logic (`useQuery`, `useMutation`) to expose data and actions to components.

## Examples

### 1. API Client Setup

Ensure `src/lib/api.ts` is configured with interceptors:

```typescript
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 2. Cached HTTP Requests (Queries)

Pattern for fetching data with automatic caching and background updates.

```typescript
// features/courses/api/courses.ts
import { api } from "@/lib/api";

type Course = {
  id: string;
  title: string;
};

export const getCourses = async (): Promise<Course[]> => {
  const { data } = await api.get("/courses");
  return data;
};

// features/courses/hooks/use-courses.ts
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../api/courses";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
  });
};

// Component Usage
const { data: courses, isLoading, error } = useCourses();
```

### 3. Mutations (Create/Update/Delete)

Pattern for modifying data and invalidating relevant cache keys.

```typescript
// features/courses/api/create-course.ts
import { api } from "@/lib/api";

type CreateCourseDTO = {
  title: string;
  description: string;
};

export const createCourse = async (data: CreateCourseDTO) => {
  const response = await api.post("/courses", data);
  return response.data;
};

// features/courses/hooks/use-create-course.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../api/create-course";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      // Invalidate the 'courses' query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

// Component Usage
const { mutate, isPending } = useCreateCourse();

const handleSubmit = (data) => {
  mutate(data);
};
```

## Best Practices

- **Naming**: Use camelCase for variables and functions (e.g., `getUsers`, `useUpdateProfile`).
- **Keys**: Use array keys for queries (e.g., `['users', userId]`).
- **Colocation**: Keep API functions and hooks close to the features they serve.
- **Error Handling**: Handle errors globally or within the hook's `onError` callback if UI feedback is needed.
