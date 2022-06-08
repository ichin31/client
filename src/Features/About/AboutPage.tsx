import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useState } from 'react';
import agent from '../../App/Api/Agent'

export default function AboutPage() {
  const [ValidationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError(){
    agent.TestErrors.GetValidationError()
      .then(()=> console.log('should not see this'))
      .catch(error => setValidationErrors(error));
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2"> Errors for testing purpose</Typography>
      <ButtonGroup fullWidth>
      <Button variant='contained' onClick={() => agent.TestErrors.Get400Error().catch(error =>console.log(error))}>Test 400 Error</Button>
      <Button variant='contained' onClick={() => agent.TestErrors.Get401Error().catch(error =>console.log(error))}>Test 401 Error</Button>
      <Button variant='contained' onClick={() => agent.TestErrors.Get404Error().catch(error =>console.log(error))}>Test 404 Error</Button>
      <Button variant='contained' onClick={() => agent.TestErrors.Get500Error().catch(error =>console.log(error))}>Test 500 Error</Button>
      <Button variant='contained' onClick={getValidationError}>Test ValidationError</Button>
      </ButtonGroup>
      {ValidationErrors.length > 0 && 
      <Alert severity='error'>
        <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {ValidationErrors.map(error => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        
        
      </Alert>
      
      }
    </Container>
  )
}
