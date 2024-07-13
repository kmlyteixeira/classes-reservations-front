'use client'

import AuthorizationGuard from "@/components/auth/AuthorizationGuard";
import AppPage from "@/components/layouts/app/AppPage";
import HomePage from "./home/HomePage";

export default function Home() {
  return (
    <AuthorizationGuard>
        <AppPage>
          <HomePage />
        </AppPage>
    </AuthorizationGuard>
  );
}
