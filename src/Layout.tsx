import { AppShell, Title } from "@mantine/core";

type Props = {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <AppShell header={{ height: 60 }} padding="md">
            <AppShell.Header>
                <Title mt='xs' p='xs' order={3}>React Quiz App</Title>
            </AppShell.Header>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};

export default Layout;
