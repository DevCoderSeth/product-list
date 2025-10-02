export interface Admin {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  password: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

// For display purposes (excluding sensitive fields)
export interface AdminDisplay {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role_id: number;
  role_name?: string; // If you join with roles table
  created_at: Date;
  updated_at: Date;
}
