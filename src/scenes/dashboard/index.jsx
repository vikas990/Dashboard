import { Box } from "@mui/material";
import Header from "../../Components/Header";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="centers">
        <Header title="DASHBOARD" subtitle="Welcome to your dsashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
