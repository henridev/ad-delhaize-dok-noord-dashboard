import React, { useState } from "react";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import { navigationTheme } from "../../styles/material/makeStyles";

import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListItem,
  ListItemIcon,
  ListItemText,
  ViewListIcon,
  EditIcon,
  CloudUploadIcon,
  makeStyles,
  useTheme,
  BarChartIcon,
  TextField
} from "../../modules/material";
import { Button } from "../../modules/bootstrap";

import routemapping from "../../data/routemapping.json";

const useStyles = makeStyles(navigationTheme);

function PersistentDrawerLeft(props) {
  console.log(props.history);
  const classes = useStyles();
  const theme = useTheme();
  const [new_text, set_new_text] = useState("");
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleRoute = name => {
    console.log("handle", name, routemapping, routemapping[name]);
    props.history.push(`/${routemapping[name]}`);
  };

  function handleClick(params) {
    window.localStorage.setItem("doknoordadminpass", new_text);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            delhaize dok noord
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["bestellingen broodjes", "bestellingen schotels", "kasboek"].map(
            (text, index) => {
              if (index === 1) {
                return;
              }
              return (
                <ListItem
                  button
                  key={text}
                  onClick={handleRoute.bind(this, text)}
                >
                  <ListItemIcon>
                    {index === 0 ? <ViewListIcon /> : null}
                    {index === 1 ? <ViewListIcon /> : null}
                    {index === 2 ? <ViewListIcon /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            }
          )}
        </List>
        <Divider />
        <List>
          {["dashboard kasboek"].map((text, index) => {
            return (
              <ListItem
                button
                key={text}
                onClick={handleRoute.bind(this, text)}
              >
                <ListItemIcon>
                  {index === 0 ? <BarChartIcon /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {[
            "aanpassen broodjes",
            "aanpassen afbeeldingen",
            "aanpassen teksten"
          ].map((text, index) => (
            <ListItem button key={text} onClick={handleRoute.bind(this, text)}>
              <ListItemIcon>
                {index === 0 ? <EditIcon /> : null}
                {index === 1 ? <EditIcon /> : null}
                {index === 2 ? <EditIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["uploaden kasboek"].map((text, index) => (
            <ListItem button key={text} onClick={handleRoute.bind(this, text)}>
              <ListItemIcon>
                {index === 0 ? <CloudUploadIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <div>
          <TextField
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="adminpass"
            variant="outlined"
            value={new_text}
            onChange={e => set_new_text(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            disabled={new_text.length > 5 ? false : true}
            onClick={handleClick}
          >
            zend
          </Button>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}

const PersistentDrawerLeftWithRouter = withRouter(PersistentDrawerLeft);

export default PersistentDrawerLeftWithRouter;
