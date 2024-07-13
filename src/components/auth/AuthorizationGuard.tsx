import useAuthentication from "@/services/auth/oauth";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

export type AuthGuardProps = {
    children: ReactNode;
    redirectTo?: string;
  };
  
  export default function AuthorizationGuard({ children, redirectTo }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuthentication();
    const router = useRouter();
  
    React.useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        router.push((redirectTo as any) ?? `/login`);
      }
    }, [router, isAuthenticated, isLoading, redirectTo]);
  
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Spin size="default" fullscreen/>
    );
  }