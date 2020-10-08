import React from 'react';
import {Col, Row, Typography, Form, Input, Checkbox, Button} from "antd";
import {Link} from "react-router-dom";
import AuthLayout from "../component/AuthLayout";

export default function Login() {
    return (
        <AuthLayout
            onFinish={() => {}}
        >
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your Username!'}]}
            >
                <Input
                    autoFocus
                    placeholder="Username"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
            >
                <Input
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    Log in
                </Button>
                Or <Link to="/signup">register now!</Link>
            </Form.Item>
        </AuthLayout>
    )
}
