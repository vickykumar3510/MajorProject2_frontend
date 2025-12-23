import { useParams } from "react-router-dom";
import { CommentProvider } from "../contexts/CommentsContext";
import LeadManagementScreen from "./LeadManagementScreen";

const LeadManagementWrapper = () => {
  const { leadId } = useParams();

  return (
    <CommentProvider leadId={leadId}>
      <LeadManagementScreen />
    </CommentProvider>
  );
};

export default LeadManagementWrapper;
