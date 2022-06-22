import {Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Task from "./Task";
import { useSelector, useDispatch } from 'react-redux'
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import sendData from '../sendData';
import { setData,markDone,deleteElement } from '../redux/tasksDataSlice';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

const AppTasks = () =>{
    
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

  const deleteTask = (id =>{
    sendData(`http://localhost:8000/api/tasks/${id}/`, 'DELETE', {delete:true})
      .then(res => {
        dispatch(deleteElement(res));
      })
      .catch(err =>{
        console.log(err);
      })
  })
  
  const markAsDone = ((id, done) =>{
    let mark = done ? false : true;
    sendData(`http://localhost:8000/api/complete-task/${id}/`, 'PUT', {id:id, done:mark})
      .then(res => {
        dispatch(markDone(res))
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
    let url = activeElement.id ? `http://localhost:8000/api/tasks/${activeElement.id}/` : `http://localhost:8000/api/tasks/`;
    let payLoad = {
      description: activeElement.description,
      duedate: activeElement.duedate,
      priority: activeElement.priority
  }

    sendData(url, method, payLoad)
      .then(res => {
            dispatch(setData({activeElement:activeElement, module:"tasks", res:res}))
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

   const tasksData = useSelector((state) => state.tasksData.value)
  
   const {data, isPending, error} = useFetch('http://127.0.0.1:8000/api/tasks/')

   useEffect(() => {
      dispatch(setData(data));
   },[data,dispatch])


    const tasks = []
    if(tasksData.length){
      tasksData.forEach(el => {
            tasks.push(<Task key={el.id} 
                description={el.description}
                done={el.done}
                duedate={el.duedate}
                id={el.id}
                insdate={el.insdate}
                priority={el.priority}
                priorityName={el.priorityName}
                handleClickOpen={handleClickOpen}
                markAsDone={markAsDone}
                deleteTask={deleteTask}
             />)
        });
    }

    return <Container>
        <Box sx={{minWidth: 275, maxWidth:800, display:"flex",alignItems:"center",justifyContent:"space-between",mb:3, mt:1}}><Typography variant="h4" sx={{mb:3, mt:1}} color="#90caf9">Tasks</Typography><AddCircleOutlinedIcon onClick={() => handleClickOpen({}, "New task")} fontSize="large" sx={{color:"#90caf9"}}/></Box>
        {!tasksData.length && <Typography>You have no tasks set. Enjoy the free time. :-)</Typography>}
        {tasks}
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


export default AppTasks;