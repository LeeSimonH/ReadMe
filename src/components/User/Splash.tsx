
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function UserHero({ name, imageLink }) {

  return (
    <Stack
      className="user-splash"
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <Avatar className="image" alt={name} src={imageLink ? imageLink : null} />
      <h2>Welcome back, {name}.</h2>
    </Stack>
  )
}