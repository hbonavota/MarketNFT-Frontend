import { createTheme } from '@material-ui/core/styles';

const emeraldgreen = "#1D7BDA";
const lightgray = "#E8F0F2";

export default createTheme({
    palette: {
        common: {
            green: `${emeraldgreen}`,
            gray: `${lightgray}`,
            color0: "#F0D9FF"
        },
        primary: {
            main: `${emeraldgreen}`
        },
        secondary: {
            main: `${lightgray}`
        },
        color0: {
            main: `${lightgray}`
        },
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
        }
    }
});