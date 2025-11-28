import { Settings as SettingsIcon } from "lucide-react";
import ComingSoon from "../components/common/ComingSoon";

const Settings = () => {
  return (
    <ComingSoon
      icon={SettingsIcon}
      title="Settings"
      description="Customize your dashboard, manage integrations, and configure advanced settings."
      iconColor="from-blue-500 to-purple-600"
      iconAnimation="animate-spin"
    />
  );
};

export default Settings;
