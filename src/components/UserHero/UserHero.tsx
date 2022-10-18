import './UserHero.css';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function UserHero({ name, imageLink }) {

  return (
    <Stack
      className="user-hero"
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <Avatar className="image" alt={name} src={imageLink ? imageLink : null} />
      <h2>Welcome back, {name}.</h2>
    </Stack>
  )
}

export default UserHero;