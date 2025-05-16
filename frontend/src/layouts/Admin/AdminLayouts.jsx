import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayouts() {
  const navigate = useNavigate();
  const isAdmin = true;

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
