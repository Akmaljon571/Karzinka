import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate()



    return (  <Result
        status="500"
        title="404"
        style={{margin: "-100px auto 0 auto"}}
        subTitle="Sorry, something went wrong."
        extra={<Button onClick={() => navigate("/")} type="primary">Back Home</Button>}
      /> );
}

export default Error;