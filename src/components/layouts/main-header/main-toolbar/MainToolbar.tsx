import NotificationPopover from "@/components/notifications-popover/NotificationsPopover";
import { QuestionCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space, Typography } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";

const Toolbar = styled(Space)`
    float: right;
    column-gap: 1rem;
    align-items: center;
`;

const Logout = () => {
    localStorage?.clear();
    if (typeof window !== 'undefined') {
        window.location.href = '/';
    }
}

const items = [
    { key: '1', label: 'Meu Perfil', onClick: () => console.log('Meu Perfil')},
    { key: '2', label: 'Sair', onClick: () => Logout()}
];

const MainToolbar = () => {

    const [isAdmin, setIsAdmin] = React.useState(false);

    useEffect(() => {
        const user = localStorage?.getItem('user');
        if (user === 'admin') {
            setIsAdmin(true);
        }
    }, [])

    return (
        <Toolbar>
            <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                onClick={() => localStorage?.removeItem('tour')}
            />
            {isAdmin ? <NotificationPopover></NotificationPopover> : null }
            <Dropdown menu={{ items }} placement="bottom">
                <Space style={{ alignItems: "flex-start", cursor: "pointer" }}>
                    <Avatar style={{ backgroundColor: 'var(--color-orange)' }} icon={<UserOutlined />} size="small"/>
                    <Typography.Text>{isAdmin ? 'Usuário-Master' : 'Usuário-Comum'}</Typography.Text>
                </Space>
            </Dropdown>
        </Toolbar>    
    );
}

export default MainToolbar;