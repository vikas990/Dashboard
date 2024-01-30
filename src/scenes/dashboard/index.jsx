import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header";
import { mockTransaction } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../Components/LineChart";
import PieChart from "../../Components/PieChart";
import BarChart from "../../Components/BarChart";
import GeographyChart from "../../Components/GeographyChart";
import StatBox from "../../Components/StatBox";
import ProgressCircle from "../../Components/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="centers">
        <Header title="DASHBOARD" subtitle="Welcome to your dsashboard" />
      </Box>
    </Box>
  );
};

export default Dashboard;
