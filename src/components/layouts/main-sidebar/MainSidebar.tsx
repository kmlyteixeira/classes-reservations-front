'use client'

import { CalendarFilled, HomeFilled, IdcardFilled, LayoutFilled, SnippetsFilled } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { styled } from "styled-components";

const CustomSider = styled(Sider)`
    height: 92vh;
    background: var(--color-primary);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    z-index: 1;
`;

const CustomContent = styled.div`
    background-color: var(--color-primary);
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    width: 55px;
`;

const MainSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = React.useState(true);
    const [selectedKeys, setSelectedKeys] = React.useState(['2']);

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        onClick?: (e: React.MouseEvent) => void
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            onClick
        } as MenuItem;
    }

    const routes = [
        { path: '/dashboard', key: '1' },
        { path: '/', key: '2' },
        { path: '/reports', key: '3' },
        { path: '/records/users', key: '4' },
        { path: '/reservations', key: '5' }
    ]

    const memoizedRoutes = React.useMemo(() => routes, []);
    const handleClick = (key: string, route: string) => {
        setSelectedKeys([key]);
        router.push(route);
    }

    const items: MenuItem[] = [
        getItem('Dashboard', '1', <LayoutFilled />, undefined, () => handleClick('1', '/dashboard')),
        getItem('Página Inicial', '2', <HomeFilled />, undefined, () => handleClick('2', '/'))
    ];

    if (localStorage?.getItem('user') === 'admin') {
        items.push(
        getItem('Relatórios', '3', <SnippetsFilled />, undefined, () => handleClick('3', '/reports')),
        getItem('Cadastros', 'sub1', <IdcardFilled />, [
            getItem('Usuários', '4', undefined, undefined, () => handleClick('4', '/records/users')),
        ]));
    }

    items.push(
        getItem('Minhas Reservas', '5', <CalendarFilled />, undefined, () => handleClick('5', '/reservations'))
    );

    React.useEffect(() => {
        const currentRoute = pathname;
        const matchedRoute = memoizedRoutes.find(route => route.path === currentRoute);
        if (matchedRoute) {
            setSelectedKeys([matchedRoute.key]);
        }
    }, [pathname, memoizedRoutes]);

    return (
        <CustomContent>
            <CustomSider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onMouseEnter={() => setCollapsed(false)}
                onMouseLeave={() => setCollapsed(true)}
                theme="light"
                collapsedWidth="50px"
                style={{ borderRadius: '0 10px 10px 0', height: '92vh' }}>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['2']}
                    selectedKeys={selectedKeys}
                    items={items}
                    style={{ height: '92vh', borderRadius: '0 10px 10px 0' }}
                />
            </CustomSider>
            
        </CustomContent>
    );
};

export default MainSidebar;