'use client'

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { BreadcrumbProps } from "antd/lib";
import Link from "next/link";

type DefaultMenuByPath = {
    [path: string]: MenuBreadcrumbItem;
};

const defaultMenuBreadcrumbItem: DefaultMenuByPath = {
    '/records': {
        title: <Link href="">Cadastros</Link>,
        menu: {
            items: [
                {
                    key: '1',
                    label: (
                        <Link href="/records/users">
                            Usuários
                        </Link>
                    ),
                }
            ]
        },
    },
    '/records/users': {
        title: 'Usuários',
    },
    '/reports': {
        title: 'Relatórios',
    },
    '/reservations': {
        title: 'Minhas Reservas',
    },
    '/dashboard': {
        title: 'Dashboard',
    },
};

const defaultPathToMenuBreadcrumbItems = (path: string): MenuBreadcrumbItem[] => {
    const items: MenuBreadcrumbItem[] = [];
    const paths = path.split('/').filter(Boolean);

    paths.reduce((acc, path) => {
        const item = defaultMenuBreadcrumbItem[acc ? `${acc}/${path}` : `/${path}`];
        if (item) {
            items.push(item);
            return acc ? `${acc}/${path}` : `/${path}`;
        }
        return acc;
    }, '');

    return items;
}

type MenuBreadcrumbItem = Required<BreadcrumbProps>['items'][number];

export default function MainBreadcrumb({ path }: { path: string }) {
    const items = defaultPathToMenuBreadcrumbItems(path);

    items.unshift({
        title: (
            <>
                <HomeOutlined />
                <Link href="/">Home</Link>
            </>
        ),
    },);

    return (
        <Breadcrumb
            style={{ margin: '10px' }}
            items={items}
        >
        </Breadcrumb>
    );
};