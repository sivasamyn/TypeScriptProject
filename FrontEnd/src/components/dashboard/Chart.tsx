import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "../../common/Title";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import useStyles from "./../theme";

export default function Chart(data:any) {
  let classes:any = useStyles();
  const theme:any = useTheme();

  return (
    <Grid item xs={10}>
      <Paper
      style={{padding:theme.spacing(2),
      }}
      className={classes.locationCountPaper}
      >
        <React.Fragment>
          <Title>Office Employee's</Title>
          <ResponsiveContainer>
            <BarChart
              data={data.data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey="stateOrProvince"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              >
                <Label
                  position="center"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  {/* Office In Dataset */}
                </Label>
              </XAxis>
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
                domain={[0, 1000]}
                tickFormatter={(val) => val.toLocaleString()}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                ></Label>
              </YAxis>
              <Bar dataKey="empolyee" fill={theme.palette.primary.dark} />
            </BarChart>
          </ResponsiveContainer>
        </React.Fragment>
      </Paper>
    </Grid>
  );
}
