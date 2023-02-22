import React from "react";
import { Dimensions, ScrollView, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import commonStyles from "../../utils/commonStyles";

const LineChartDemo = (props) => {
  const { data } = props;
  const { labels } = data;

  const [viewableXLabelsOnOneFold, setViewableXLabelsOnOneFold] =
    React.useState(1);

  let [tooltipPos, setTooltipPos] = React.useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  React.useEffect(() => {
    const manipulateViewableFold = parseInt(labels?.length / 10);

    setViewableXLabelsOnOneFold(
      manipulateViewableFold ? manipulateViewableFold + 1 : 1
    );
  }, [labels?.length]);

  const onScrollEvent = (e) => {
    console.log(
      "🚀 ~ file: LineChartDemo.jsx:22 ~ LineChartDemo ~ e:",
      e.nativeEvent
    );
    return;
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...commonStyles.flexCenter,
      }}
    >
      <Text style={{ paddingTop: 40 }}>Selected Value: {tooltipPos.value}</Text>
      <ScrollView
        horizontal
        bounces={false}
        contentContainerStyle={commonStyles.alignCenter}
        onScroll={onScrollEvent}
      >
        <LineChart
          data={data}
          width={Dimensions.get("window").width * viewableXLabelsOnOneFold} // from react-native
          height={Dimensions.get("window").height / 1.75}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          bezier={false}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: () => "#ff0066",
            labelColor: () => "#d9d9d9",
          }}
          // decorator={() => {
          //   return tooltipPos.visible ? (
          //     <View>
          //       <Svg>
          //         <Rect
          //           x={tooltipPos.x - 15}
          //           y={tooltipPos.y + 10}
          //           width="40"
          //           height="30"
          //           fill="#ff0066"
          //         />
          //         <TextSVG
          //           x={tooltipPos.x + 5}
          //           y={tooltipPos.y + 30}
          //           fill="white"
          //           fontSize="16"
          //           fontWeight="bold"
          //           textAnchor="middle"
          //         >
          //           {tooltipPos.value}
          //         </TextSVG>
          //       </Svg>
          //     </View>
          //   ) : null;
          // }}
          onDataPointClick={(data) => {
            let isSamePoint =
              tooltipPos.x === data.x && tooltipPos.y === data.y;

            isSamePoint
              ? setTooltipPos((previousState) => {
                  return {
                    ...previousState,
                    value: data.value,
                    visible: !previousState.visible,
                  };
                })
              : setTooltipPos({
                  x: data.x,
                  value: data.value,
                  y: data.y,
                  visible: true,
                });
          }}
        />
      </ScrollView>
    </ScrollView>
  );
};

export default LineChartDemo;
