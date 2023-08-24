import React, { useEffect, useState } from "react";
import { SettingsPageWrapper } from "../../../../features/settings/SettingsPageWrapper";
import { getLayout } from "../../../../common/components/Layout/PageLayout/PageLayout";
import { styled } from "styled-components";
import Image from "next/image";
import chrome from "public/img/icons/chrome-svgrepo-com.svg";
import { fakeDevices } from "./fakeDevices";

const Devices = () => {
  const [ip, setIp] = useState();
  const [currentStatus, setCurrentStatus] = useState("Online");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((res) => setIp(res.ip));
  });
  return (
    <SettingsPageWrapper>
      <PageWrapper>
        <SessionWrapper>
          <SectionTitle>This devices</SectionTitle>
          <ActiveSession>
            <DeviceIcon alt="browser icon" src={chrome} />
            <Wrapper>
              <Browser>Chrome</Browser>
              <SessionIp>IP: {ip}</SessionIp>
              <IsOnline>{currentStatus}</IsOnline>
            </Wrapper>
          </ActiveSession>
          <EndSessionsBtn>Terminate all other session</EndSessionsBtn>
        </SessionWrapper>
        <SessionWrapper>
          <SectionTitle>Active sessions</SectionTitle>
          {fakeDevices.map((device) => {
            return (
              <ActiveSession style={{ marginBottom: "12px" }}>
                <DeviceIcon alt="browser icon" src={device.deviseIcon} />
                <Wrapper>
                  <Browser>{device.device}</Browser>
                  <SessionIp>IP: {device.ip}</SessionIp>
                  <p>{device.lastVisit}</p>
                </Wrapper>
              </ActiveSession>
            );
          })}
        </SessionWrapper>
      </PageWrapper>
    </SettingsPageWrapper>
  );
};

Devices.getLayout = getLayout;
export default Devices;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div``;

const ActiveSession = styled.div`
  display: flex;
  padding: 17px 0;
  background: #171717;
  border: 1px solid #333;
  gap: 12px;
`;

const EndSessionsBtn = styled.button`
  margin-top: 24px;
  margin-bottom: 18px;
  width: 260px;
  color: #397df6;
  border: 1px solid #397df6;
  background: black;
  align-self: flex-end;
  padding: 6px 0;
`;

const IsOnline = styled.p`
  color: #3677f7;
`;

const Browser = styled.p`
  padding-bottom: 13px;
`;

const DeviceWrapper = styled.div``;

const Device = styled.h3``;

const SessionIp = styled.p``;

const DeviceIcon = styled(Image)`
  margin: 5px 0 0 15px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 6px;
`;

const SessionWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
