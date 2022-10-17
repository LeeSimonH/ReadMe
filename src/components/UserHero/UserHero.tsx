import './UserHero.css';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const stackStyles = {}

function UserHero({ name, imageLink }) {
  // const [name, setName] = useState('');
  // const [imageLink, setImageLink] = useState('');

  return (
    <Stack
      className="user-hero"
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <Avatar className="image" alt={name} src={imageLink ? imageLink : null} />
      <div>Hello, {name}!</div>
    </Stack>
  )
}

export default UserHero;