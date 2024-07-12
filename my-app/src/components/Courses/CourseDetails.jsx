import {AppBar, Button, Dialog, Divider, IconButton, List, ListItemButton, ListItemText, Slide, Toolbar, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {forwardRef} from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CourseDetails = ({course, open, setOpen}) => {
    console.log(course);


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            {
                course && <>
                    <AppBar sx={{position: 'relative'}}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                                {course.courseName} Details
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className="container">
                        <div className="row">
                            <div className="col-8">

                            </div>
                            <div className="col-4">
                                <h3 className="my-3">
                                    Teams code: {course.teamsCode}
                                </h3>
                                <div className="cta">
                                    <Button variant="contained" size="large">
                                        Go To Material
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Dialog>
    );
};

export default CourseDetails;