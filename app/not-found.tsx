"use client";

import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const NotFound: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div>Not found</div>;
};

export default NotFound;
