'use client'
import { CalendarFilled, HomeFilled, IdcardFilled, LayoutFilled, SnippetsFilled } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { styled } from "styled-components";

const CustomFooter = styled.div`
    background-color: var(--color-secondary);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around; 
    padding: 10px 0; 
    z-index: 1000;
`;

const MainFootbar = () => {

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
        getItem(undefined, '1', <LayoutFilled />, undefined, () => handleClick('1', '/dashboard')),
        getItem(undefined, '2', <HomeFilled />, undefined, () => handleClick('2', '/'))
    ];

    if (localStorage?.getItem('user') === 'admin') {
        items.push(
        getItem(undefined, '3', <SnippetsFilled />, undefined, () => handleClick('3', '/reports')),
        getItem(undefined, '4', <IdcardFilled />, undefined, () => handleClick('4', '/records/users'))
    )
    }

    items.push(
        getItem(undefined, '5', <CalendarFilled />, undefined, () => handleClick('5', '/reservations'))
    );

    React.useEffect(() => {
        const currentRoute = pathname;
        const matchedRoute = memoizedRoutes.find(route => route.path === currentRoute);
        if (matchedRoute) {
            setSelectedKeys([matchedRoute.key]);
        }
    }, [pathname, memoizedRoutes]);

    return (
        <CustomFooter
            style={{ borderRadius: '0 10px 10px 0' }}
        >
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                selectedKeys={selectedKeys}
                items={items}
            />
        </CustomFooter>
    )
}

export default MainFootbar;