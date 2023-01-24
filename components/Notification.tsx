import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';


export const openNotification = ({book}:any) => {
    console.log(book)
    notification.open({
        message: `"${book.title}" ${book.author.name} have been added to busket!`,
        description:
            <div>
                
            </div>,
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
};





