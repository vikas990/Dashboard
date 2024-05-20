import { Box, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import Loader from "../scenes/global/Loading";
import { fetchData } from "../redux/slices/data";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Preparing data for chart
  const barChartData = (
    chartData?.data?.result ? chartData?.data?.result : chartData?.data?.data
  )?.map((d) => {
    return {
      Coins: d.name,
      "1 hour": d.priceChange1h,
      "1 hourColor": "hsl(229, 70%, 50%)",
      "1 day": d.priceChange1d,
      "1 dayColor": "hsl(229, 70%, 50%)",
      "1 week": d.priceChange1w,
      "1 weekColor": "hsl(229, 70%, 50%)",
    };
  });

  return (
    <>
      {barChartData === undefined ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Loader />
        </Box>
      ) : (
        <ResponsiveBar
          data={barChartData}
          theme={{
            // added
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
          keys={["1 hour", "1 day", "1 week"]}
          indexBy="Coins"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", "1.1"]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "coins", // changed
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Change Rate", // changed
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            );
          }}
        />
      )}
    </>
  );
};

export default BarChart;
