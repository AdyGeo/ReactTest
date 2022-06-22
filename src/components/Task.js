import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup, Chip, Paper } from '@mui/material';
import { EventOutlined } from '@mui/icons-material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { el } from 'date-fns/locale';

const priorityStyle = {
  "L": "primary",
  "M" : "success",
  "H": "error"
}



export default function Task(props) {
  const { description,  done,  duedate, id, insdate, priority, priorityName } = props;
  return (
    <Box sx={{ minWidth: 275, maxWidth:800, mb:2}}>
      <Paper elevation={2}>
        <Card variant="outlined" sx={{background: props.done ? "#d3d3d3" : undefined}}>
          <React.Fragment>
            <Box display="flex">
              <CardContent>
                <Typography sx={{ mb: 1.5 }}>
                  {props.description}
                </Typography>
              <div style={{display: 'flex', alignItems: 'center'}}>
                {!props.done && <Chip label={props.priorityName} color={priorityStyle[props.priority]} size="small"/>}
                {props.duedate && !props.done && <div style={{display: 'flex', alignItems: 'center'}}><EventOutlined/>&nbsp;<Typography sx={{display:'inline'}}>{new Date(props.duedate).toLocaleDateString('en-GB')}</Typography></div>}
              </div>
              </CardContent>
              <CardActions sx={{ml:'auto'}}>
                <ButtonGroup  variant="text" aria-label="actions button group">
                    <Button key="mark" onClick={() => props.markAsDone(id,done)}>{props.done ? <CheckBoxOutlinedIcon/> : <CheckBoxOutlineBlankOutlinedIcon/>}</Button>
                    <Button key="edit" onClick={() => props.handleClickOpen({description,  done,  duedate, id, insdate, priority, priorityName},'Edit task')}><EditOutlinedIcon/></Button>
                    <Button key="delete" onClick={() => props.deleteTask(id)}><DeleteOutlinedIcon/></Button>
                </ButtonGroup>
              </CardActions>
            </Box>
          </React.Fragment>
        </Card>
      </Paper>
    </Box>
  );
}
