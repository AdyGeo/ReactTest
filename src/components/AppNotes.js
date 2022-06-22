import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Note from "./Note";
import { useSelector, useDispatch } from 'react-redux'
import useFetch from "../useFetch";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useEffect, useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { setData,deleteElement } from '../redux/notesDataSlice';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import sendData from '../sendData';
import { Box } from "@mui/system";

const AppNotes = () =>{

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [activeElement, setActiveElement] = useState({});
    const [module, setModule] = useState("");
    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)


  const handleClickOpen = (el={}, module) => {
    setTitleError(false);
    setDescriptionError(false);
    setOpen(true);
    setActiveElement(el);
    setModule(module);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const deleteNote = (id =>{
    sendData(`http://localhost:8000/api/notes/${id}/`, 'DELETE', {delete:true})
      .then(res => {
        dispatch(deleteElement(res));
      })
      .catch(err =>{
        console.log(err);
      })
  })


  const handleSave = () =>{

    setTitleError(false);
    setDescriptionError(false);

    if(!activeElement.title){
      setTitleError(true);
    }

    if(!activeElement.description){
      setDescriptionError(true);
    }

    let method = activeElement.id ? "PUT" : "POST"
    let url = activeElement.id ? `http://localhost:8000/api/notes/${activeElement.id}/` : `http://localhost:8000/api/notes/`;
    let payLoad = {
          title: activeElement.title,
          description: activeElement.description,
    }

    sendData(url, method, payLoad)
      .then(res => {
            dispatch(setData({activeElement:activeElement, module:"notes", res:res}))
            setOpen(false);
        }
      )
      .catch(err =>{
        console.log(err);
      })

      
  }

  const handleFormChanges = (event, input) =>{
    let priorityMap={
      L:"LOW",
      M:"MEDIUM",
      H: "HIGH"
    }
    let newActiveTask = {...activeElement};
    newActiveTask[input] = input !== 'duedate' ? event.target.value : event ? new Date(event).toLocaleDateString("en-CA") : null; 
    if (input === 'priority'){
      newActiveTask.priorityName = priorityMap[event.target.value]
    }
    setActiveElement(newActiveTask);
  }

    const notesData = useSelector((state) => state.notesData.value)

    const {data} = useFetch('http://127.0.0.1:8000/api/notes/');
    useEffect(() => {
      dispatch(setData(data));
   },[data,dispatch])
    const notes = []
    if(notesData.length){
      notesData.forEach(el => {
            notes.push(<Note key={el.id} id={el.id} title={el.title} description={el.description} handleClickOpen={handleClickOpen} deleteNote={deleteNote}/>)
        });
    }

    return <Container>

        <Box sx={{display:"flex",alignItems:"center",mb:3, mt:1}}><Typography variant="h4" sx={{mb:3, mt:1}} color="#90caf9">Notes</Typography><AddCircleOutlinedIcon onClick={() => handleClickOpen({}, "New note")} fontSize="large" sx={{ml:"auto",color:"#90caf9"}}/></Box>
        {!notesData.length && <Typography>There are no notes here, look somewhere else o add a note.</Typography>}
        {notes}
        <div>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>{module}</DialogTitle>
            <DialogContent>
            {module.toLowerCase().includes("note") && <TextField
                autoFocus
                margin="dense"
                id="TitleId"
                label="Title"
                type="text"
                required
                error={titleError}
                fullWidth
                variant="standard"
                value={activeElement.title || ""}
                sx={{mb:3}}
                onChange={(event)=>handleFormChanges(event,'title')}
              />}
              <TextField
                autoFocus
                margin="dense"
                id="DescriptionId"
                label="Description"
                type="text"
                fullWidth
                error={descriptionError}
                variant="standard"
                value={activeElement.description || ""}
                sx={{mb:3}}
                onChange={(event)=>handleFormChanges(event,'description')}
              />
  
              {module.toLowerCase().includes("task") && <FormControl fullWidth variant="standard">
                <InputLabel id="PriorityLabel">Priority</InputLabel>
                <Select
                  labelId="PriorityLabel"
                  id="Priority"
                  value={activeElement.priority || "M"}
                  onChange={(event)=>handleFormChanges(event,'priority')}
                  label="Priority"
                  sx={{mb:4}}
                >
             
                  <MenuItem value={'L'}>Low</MenuItem>
                  <MenuItem value={'M'}>Medium</MenuItem>
                  <MenuItem value={'H'}>High</MenuItem>
                </Select>
              </FormControl>}
              {module.toLowerCase().includes("task") && <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Due Date"
                  value={activeElement.duedate || null}
                  onChange={(event)=>handleFormChanges(event,'duedate')}
                  inputFormat='dd/MM/yyyy'
                  renderInput={(params) => <TextField {...params} />}
                  clearable={true}
                />
              </LocalizationProvider>}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
    </Container>
}


export default AppNotes;