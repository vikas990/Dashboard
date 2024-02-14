import { Box } from "@mui/material";
import Header from "../../Components/Header";
import LineChart from "../../Components/LineChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Top 3 Cypto Change Rate" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Pie;
