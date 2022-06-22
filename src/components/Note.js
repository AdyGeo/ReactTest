import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup, Paper } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


export default function Note(props) {
  return (
    <Box sx={{ minWidth: 275, maxWidth:800, mb:2 }}>
      <Paper elevation={2}>
        <Card variant="outlined">
          <React.Fragment>
            <Box display="flex">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {props.title}
                </Typography>
                <Typography variant="body2">
                  {props.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ml:'auto'}}>
                <ButtonGroup variant="text" aria-label="actions button group">
                  <Button key="edit" onClick={() => props.handleClickOpen({id:props.id, title:props.title, description:props.description},'Edit note')}><EditOutlinedIcon/></Button>
                  <Button key="delete" onClick={() => props.deleteNote(props.id)}><DeleteOutlinedIcon/></Button>
                </ButtonGroup>
              </CardActions>
            </Box>
          </React.Fragment>
        </Card>
      </Paper>
    </Box>
  );
}
