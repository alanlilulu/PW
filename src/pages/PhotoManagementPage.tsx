import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function PhotoManagementPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 重定向到新的照片管理页面
    navigate('/asset-folder-albums', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Container>
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">正在跳转到新的照片管理页面...</p>
        </div>
      </Container>
    </div>
  );
}