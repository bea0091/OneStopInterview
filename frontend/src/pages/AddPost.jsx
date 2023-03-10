import { React, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../components/Sidebar-forum";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../axios";

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
  },
};

const baseURL = "https://onestopinterview.onrender.com/api";
const drawerWidth = 250;

function RenderForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [caption, setCaption] = useState();

  const onChangeTitle = (e) => {
    if (!e.target.value) {
      setTitle(undefined);
      return;
    }
    setTitle(e.target.value);
  };

  const onChangeCaption = (e) => {
    if (!e.target.value) {
      setCaption(undefined);
      return;
    }
    setCaption(e.target.value);
  };

  const onSubmit = (e) => {
    if (title == null || caption == null) {
      alert("Title and caption are required.");
      return;
    }

    const formData = { title: title, body: caption };
    axiosInstance
      .post(`/posts/`, formData)
      .then((res) => {
        navigate("/forums/posts/");
      })
      .catch((err) => {
        let errorBody = err.response;
        return Promise.resolve(errorBody);
      });
  };
  return (
    <>
      <Grid item xs={12} sm={12} md={12} 
            sx={{position: 'static', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <Box sx={{ 
          width: "80%",
          height: "450px",
          color: "white",
          border: "1px solid white",
          borderRadius: "12px", }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <div
                style={{ padding: "15px", width: "100%" }}
                align-items="center"
                flex-direction="column"
                display="flex"
                justify-content="center">
                <AppBar
                  position="static"
                  color="default"
                  elevation={0}
                  sx={{ borderBottom: '1px solid ' }} >
                    <Grid container spacing={2} alignItems="center" display='flex' sx={{ padding: '10px' }}>
                      <Grid item md sx={{ padding: '5px' }}>
                          <TextField
                            fullWidth
                            multiline
                            placeholder="Title"
                            rows={1}
                            InputProps={{
                              disableUnderline: true,
                            }}
                            onChange={e=>onChangeTitle(e)}
                            variant="standard" />
                      </Grid>
                    </Grid>
                </AppBar>
              </div>
              <div
                style={{ padding: "15px", width: "100%" }}
                align-items="center"
                flex-direction="column"
                display="flex"
                justify-content="center">
                <AppBar
                  position="static"
                  color="default"
                  elevation={0}
                  sx={{ borderBottom: '1px solid ' }} >
                    <Grid container spacing={2} alignItems="center" display='flex' sx={{ padding: '10px' }}>
                      <Grid item md>
                        <TextField
                          fullWidth
                          multiline
                          placeholder="Caption"
                          rows={10}
                          InputProps={{
                            disableUnderline: true,
                          }}
                          onChange={e=>onChangeCaption(e)}
                          variant="standard" />
                      </Grid>
                    </Grid>
                </AppBar>
              </div>
            </CardContent>
            <CardActions sx={{ display: 'flex', marginTop: '80px', justifyContent: 'flex-end', paddingRight: '4%' }}>
                <Button
                    type="submit" variant="contained" href="/forums/posts/"
                    sx={{ backgroundColor: "transparent", color: "white",
                        border: "1px solid white", borderRadius: "12px", }}>
                    Cancel
                </Button>
                <Button
                    type="submit" variant="contained" onClick={onSubmit}
                    sx={{ ml: 2, bgcolor: "rgba(51,102,204)", borderRadius: "12px", }}>
                    Submit
                </Button>
            </CardActions>
        </Box> 
      </Grid>
    </>
  );
}

export default function AddPost(props) {

  return (
    <ThemeProvider theme={theme}>
      <Navigator
        PaperProps={{ style: { width: drawerWidth, top: "75px" } }}
        sx={{ display: { sm: "block" } }}
      />
      <Box sx={{ flexFlow: "column", alignItems: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          sx={{
            flex: 1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "2%",
          }}>
          <div style={{ marginLeft: drawerWidth }}>
            {RenderForm()}
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}