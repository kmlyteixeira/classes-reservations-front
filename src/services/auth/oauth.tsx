import { useEffect, useState } from 'react';

const useAuthentication = (): { isAuthenticated: boolean; isLoading: boolean } => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // SIMULANDO AUTENTICAÇÃO PARA TESTAR FRONT - PREPARANDO PARA INTERGRAR COM BACKEND
        const checkAuthentication = async () => {
            try {
                // SIMULANDO CHAMADA DE API DE AUTENTICAÇÃO
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const token = localStorage.getItem('token');
                setIsAuthenticated(Boolean(token));
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    return { isAuthenticated, isLoading };
};

export default useAuthentication;