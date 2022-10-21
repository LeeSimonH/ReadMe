import { useState } from 'react';

import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';


export default function LoginForm({ onSubmit, toggleForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`signing IN with ${email} and ${password}`);
    onSubmit(email, password);
  }

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby='email-helper-text' />
        <FormHelperText id="email-helper-text">Enter your email</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby='password-helper-text' />
        <FormHelperText id="password-helper-text">Enter your password</FormHelperText>
      </FormControl>
      <Stack direction="row" className="btn-group">
        <Button
          variant="outlined"
          onClick={() => {
            setEmail('');
            setPassword('');
          }}
        >
          Reset
        </Button>
        <Button type="submit" variant="contained">Sign In</Button>
      </Stack>
      <div onClick={toggleForm}>
        <a id="sign-up-link" href="#" target={"blank"}>Don't have an account? Sign up</a>
      </div>
    </form>
  )
}