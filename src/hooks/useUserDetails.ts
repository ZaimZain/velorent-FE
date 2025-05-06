import { useState, useEffect } from "react";

export const useUserDetails = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Get username and role from localStorage (or wherever they are stored)
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    setUsername(storedUsername);
    setRole(storedRole);
  }, []);

  return { username, role };
};
