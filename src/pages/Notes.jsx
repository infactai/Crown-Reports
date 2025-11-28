import { FileText } from "lucide-react";
import ComingSoon from "../components/common/ComingSoon";

const Notes = () => {
  return (
    <ComingSoon
      icon={FileText}
      title="Notes"
      description="We're working on an amazing notes feature with rich text editing, tagging, and smart organization."
      iconColor="from-blue-500 to-purple-600"
      iconAnimation="animate-pulse"
    />
  );
};

export default Notes;
