import { useState } from "react";
import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Container,
    Button,
    Text
} from "@mantine/core";
import classes from "./Login.module.css";
import useAuthStore from '@/store/useAuthStore';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const { setAuthStatus } = useAuthStore((state) => state);
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const loginHandler = () => {
        if(data.username && data.password == 'user') {
            setAuthStatus(true, 'user')
            navigate("/quiz")
        }
        else if(data.username && data.password == 'admin') {
            setAuthStatus(true, 'admin')
            navigate("/questions")
        }
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome!
            </Title>
            <Text mt='xl'>Username: user or admin</Text>
            <Text>Password: user or admin</Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput value={data.username} name="username" onChange={changeHandler} label="Username" placeholder="Your username" />
                <PasswordInput
                    value={data.password}
                    name="password"
                    onChange={changeHandler}
                    label="Password"
                    placeholder="Your password"
                    mt="md"
                />
                <Button onClick={loginHandler} fullWidth mt="xl">
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}

export default Login;
