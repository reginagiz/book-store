import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTH_USER } from '../pages/api/query/authenticatedUser'
import { User } from '../pages/api/types/Types'

const UserContext = React.createContext<User>({ id: '', email: '', name: '' });

export const UserProvider = (props: any) => {
    const [userId, setUserId] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const id = JSON.parse(window.localStorage?.getItem('currentUserId') || '');
            if (id) {
                setUserId(id);
            }
        }
    }, [userId])
    const { data, loading } = useQuery(GET_AUTH_USER, { variables: { id: userId } });
    const user = loading || !data ? null : data.user;
    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
};

export const UserConsumer = UserContext.Consumer;
export default UserContext;
