import React, {useEffect} from 'react';
import {PageHeader, Col, Row, Descriptions, Typography, Spin, Space} from "antd";
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {actions, Types} from "../state";
import useFetchInfo from "../../common/hook/useFetchInfo";
import History from "../../common/component/History";
import Department from "../component/Department";
import TagList from "../component/TagList";
import useNeedLogin from "../../common/hook/useNeedLogin";

export default function User({match}) {
    useNeedLogin();
    const history = useHistory();
    const user = useSelector(state => state.user.user);
    const userHistory = useSelector(state => state.user.userHistory);

    const dispatch = useDispatch();
    const name = match.params.name;

    useEffect(() => {
        dispatch(actions.fetchUser(name));
        dispatch(actions.fetchUserHistory(name));
    }, [dispatch, name]);

    useEffect(() => {
        return () => dispatch(actions.initialize());
    }, [dispatch]);

    // const isFetched = true;
    const {isFetched, isSlow} = useFetchInfo(Types.FetchUser);
    return (
        <Row justify="center">
            <Col xs={24} md={20} lg={14}>
                <PageHeader title={
                    <Space>
                        사용자 정보
                        {isSlow && <Spin size="small"/>}
                    </Space>
                } onBack={() => history.push('/')}>
                    {user && (
                        <Descriptions layout="vertical" bordered column={1}>
                            <Descriptions.Item label="이름">
                                <Typography.Text>
                                    {user.name}
                                </Typography.Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="소속">
                                <Department />
                            </Descriptions.Item>
                            <Descriptions.Item label="태그">
                                <TagList />
                            </Descriptions.Item>
                            <Descriptions.Item label="수정 내역">
                                <History items={userHistory}/>
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                    {!user && isFetched && (
                        <Typography.Text>존재하지 않는 사용자 입니다.</Typography.Text>
                    )}
                </PageHeader>
            </Col>
        </Row>
    )
}