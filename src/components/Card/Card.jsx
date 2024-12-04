
import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

const Card = ({ title, color, value, series }) => {
  const [expanded, setExpanded] = useState(false);

  console.log("Card Props:", { title, color, value, series });
  console.log("Expanded state for", title, expanded);

  return (
    <div
      className="Card"
      style={{
        background: color.backGround || "#ccc",
        boxShadow: color.boxShadow || "0px 10px 20px 0px #ccc",
      }}
      layoutId="expandableCard"
    >
      {expanded ? (
        <div layoutId="expandedCard" className="ExpandedCard">
          <div
            style={{
              alignSelf: "flex-end",
              cursor: "pointer",
              color: "white",
            }}
          >
            <UilTimes onClick={() => setExpanded(false)} />
          </div>
          <span>{title}</span>
          <div className="chartContainer">
            <Chart
              series={[
                {
                  name: title, 
                  data: series.map((item) => item.orders || item.revenue || 0), // Extract numeric values
                },
              ]}
              type="area"
              options={{
                chart: { type: "area", height: "auto" },
                fill: { colors: ["#fff"], type: "gradient" },
                dataLabels: { enabled: false },
                stroke: { curve: "smooth", colors: ["white"] },
                xaxis: {
                  categories: series.map((item) => item.date || "Unknown"), // Extract dates
                  title: { text: "Date" },
                },
                yaxis: {
                  title: { text: title },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div layoutId="collapsedCard" onClick={() => {
          console.log("Card clicked:", title);
          setExpanded(true);
        }}>
          <div className="radialBar">
            <CircularProgressbar value={value} text={`${title === "Revenue" ? "$" : ""}${value}`} />
            <span>{title}</span>
          </div>
          <div className="detail">
            <span>{`${title === "Revenue" ? "$" : ""}${value}`}</span>
            <span>This  Month</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;



























// import React, { useState } from "react";
// import "./Card.css";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { motion, AnimateSharedLayout } from "framer-motion";
// import { UilTimes } from "@iconscout/react-unicons";
// import Chart from "react-apexcharts";

// const Card = (props) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <AnimateSharedLayout>
//       {expanded ? (
//         <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
//       ) : (
//         <CompactCard param={props} setExpanded={() => setExpanded(true)} />
//       )}
//     </AnimateSharedLayout>
//   );
// };

// function CompactCard({ param, setExpanded }) {
//   const Png = param.png;

//   return (
//     <motion.div
//       className="CompactCard"
//       style={{
//         background: param.color.backGround,
//         boxShadow: param.color.boxShadow,
//       }}
//       onClick={setExpanded}
//       layoutId="expandableCard"
//     >
//       <div className="radialBar">
//         <CircularProgressbar
//           value={param.barValue}
//           text={`${param.barValue}%`}
//         />
//         <span>{param.title}</span>
//       </div>

//       <div className="detail">
//         <Png />
//         <span>${param.value}</span>
//         <span>Last 24 Hours</span>
//       </div>
//     </motion.div>
//   );
// }

// function ExpandedCard({ param, setExpanded }) {
//   const data = {
//     options: {
//       chart: {
//         type: "area",
//         height: "auto",
//       },
//       dropShadow: {
//         enabled: false,
//         enabledOnSeries: undefined,
//         top: 0,
//         left: 0,
//         blur: 3,
//         color: "#000",
//         opacity: 0.35,
//       },
//       fill: {
//         color: ["#fff"],
//         type: "gradient",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth",
//         colors: ["white"],
//       },
//       tooltip: {
//         x: {
//           format: "dd/MM/yy HH:mm",
//         },
//       },
//       grid: {
//         show: true,
//       },
//       xaxis: {
//         type: "datetime",
//         categories: param.series.map((dataPoint) => dataPoint.date),
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="ExpandedCard"
//       style={{
//         background: param.color.backGround,
//         boxShadow: param.color.boxShadow,
//       }}
//       layoutId="expandableCard"
//     >
//       <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
//         <UilTimes onClick={setExpanded} />
//       </div>
//       <span>{param.title}</span>
//       <div className="chartContainer">
//         <Chart series={param.series} type="area" options={data.options} />
//       </div>
//       <span>Last 24 Hours</span>
//     </motion.div>
//   );
// }

// export default Card;
