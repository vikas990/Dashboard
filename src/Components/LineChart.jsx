import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Loader from "../scenes/global/Loading";
import { fetchData } from "../redux/slices/data";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Preparing data for chart
  const lineChartData = (
    chartData?.data?.result ? chartData?.data?.result : chartData?.data?.data
  )
    ?.slice(0, 3)
    ?.map((d) => {
      return {
        id: d.name,
        color:
          d.id === "bitcoin"
            ? tokens("dark").greenAccent[500]
            : d.id === "ethereum"
            ? tokens("dark").blueAccent[300]
            : tokens("dark").redAccent[200],
        data: [
          {
            x: "1 hour",
            y: d.priceChange1h,
          },
          {
            x: "1 day",
            y: d.priceChange1d,
          },
          {
            x: "1 week",
            y: d.priceChange1w,
          },
        ],
      };
    });

  return (
    <>
      {lineChartData === undefined ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Loader />
        </Box>
      ) : (
        <ResponsiveLine
          data={lineChartData}
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
                color: colors.primary[500],
              },
            },
          }}
          colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Price Change", // added
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5, // added
            tickSize: 3,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "Change Rate", // added
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
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

export default LineChart;
