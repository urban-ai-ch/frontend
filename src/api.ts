import { useAuth } from "./AuthContext";

const API_URL = "https://api.urban-ai.ch";
const { logout } = useAuth();

interface RequestOptions extends RequestInit {
  body?: string;
}

type Status = "success" | "error";

interface ApiResponse<T> {
  status: Status;
  data?: T;
  message?: string;
}

// Function to handle requests and common error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem("token"); // Get the auth token

  // Add token to headers if present
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logout();
    return {
      status: "error",
      message: "Unauthorized, logged out",
    };
  }

  if (!response.ok) {
    return {
      status: "error",
      message: "An error occured",
    };
  }

  return {
    status: "success",
    data: await response.json(),
  };
}

export { apiRequest };
