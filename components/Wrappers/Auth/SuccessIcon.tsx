import React from 'react';
import Image from "next/image";
import mail from "../../../public/icons/web-app-ui-sign-up-bro.svg";

import styled from "styled-components";

const SuccessIcon = () => {
    return (
        <StyledIcon>
            <Image width={423} height={292} src={mail} alt={'mail'} />
        </StyledIcon>
    );
};

export default SuccessIcon;

const StyledIcon = styled.div
    `
    margin: 72px;
    display: flex;
    align-items: center;
  `