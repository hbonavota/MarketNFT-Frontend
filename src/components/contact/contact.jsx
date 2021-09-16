
import { Button, TextField } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import emailjs from 'emailjs-com'

export default function Contact() {
  function sendEmail(e) {
    e.preventDefault()
    emailjs
      .sendForm(
        'contact_service',
        'contact_form',
        e.target,
        'user_N0Deo4uHEueiZVnuDraRQ'
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
    e.target.reset()
  }
  return (
    <div>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <h3>Contact us!</h3>
        <form onSubmit={sendEmail}>
          <Box mb='1em'>
            <TextField
              name='name'
              type='text'
              variant='outlined'
              label='Name'
              size='small'
            />
          </Box>
          <Box mb='1rem'>
            <TextField
              name='email'
              type='email'
              variant='outlined'
              label='Email'
              size='small'
            />
          </Box>
          <Box mb='1rem'>
            <TextField
              name='message'
              type='text'
              variant='outlined'
              size='medium'
              label='Message'
            />
          </Box>
          <Box mb='1rem'>
            <Button type='submit' variant='outlined' size='large' fullWidth>
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  )
}
