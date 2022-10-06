import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: blueGrey,
    },
});
const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: blueGrey,
    },
});

export {
    darkTheme,
    lightTheme
};
