import {getLayout} from '../../../common/components/Layout/BaseLayout/BaseLayout';
import {GeneralInformation} from '../../../features/settings/GeneralInformation';
import {SettingsPageWrapper} from '../../../features/settings/SettingsPageWrapper';

const ProfileSettings = () => {
  return (
    <SettingsPageWrapper>
      <GeneralInformation/>
    </SettingsPageWrapper>
  );
};


ProfileSettings.getLayout = getLayout
export default ProfileSettings;
