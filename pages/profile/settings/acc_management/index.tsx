import React from 'react';
import {SettingsPageWrapper} from '../../../../features/settings/SettingsPageWrapper';
import {getLayout} from '../../../../common/components/Layout/SettingsLayout/SettingsLayout';

const AccountManagement = () => {
  return (
    <SettingsPageWrapper>
      acc management
    </SettingsPageWrapper>
  )
}

AccountManagement.getLayout = getLayout
export default AccountManagement;