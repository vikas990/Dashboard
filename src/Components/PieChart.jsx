import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";
import { fetchData } from "../redux/slices/data";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../scenes/global/Loading";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetching and dispatching actions in Redux
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.data);
  // dispatching fetch data on load
  useEffect(() => {
    dispatch(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Preparing data for chart
  const PieChartData = chartData?.data?.result?.slice(0, 5)?.map((d) => {
    return {
      id: d.name,
      label: d.name,
      value: d.volume,
      color:
        d.id === "Bitcoin"
          ? "hsl(104, 70%, 50%)"
          : d.id === "Ethereum"
          ? "hsl(162, 70%, 50%)"
          : d.id === "Tether"
          ? "hsl(291, 70%, 50%)"
          : d.id === "BNB"
          ? "hsl(229, 70%, 50%)"
          : "hsl(344, 70%, 50%)",
    };
  });

  return (
    <>
      {PieChartData === undefined ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Loader />
        </Box>
      ) : (
        <ResponsivePie
          data={PieChartData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
              container: {
                background: colors.primary[400],
                color: colors.grey[100],
              },
            },
          }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={colors.grey[100]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.4}
          arcLabelsSkipAngle={7}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
};

export default PieChart;
