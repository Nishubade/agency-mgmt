// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useWallet } from '@hooks/useWallet';
import { useChainProvider } from '@hooks/useChainProvider';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user, wallet } = useAuthContext();
  const provider = useChainProvider();
  const test = async () => {
    console.log(await provider.getBalance(wallet.address));
  };

  test();

  return (
    <Link underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar src={user?.photoURL} alt={user?.name?.first} name={user?.name?.first} />
        {/* <CustomAvatar src={user?.photoURL} alt={user?.name?.first} name={user?.name?.first} /> */}

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.name?.first} ${user?.name?.last}`}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {wallet?.address || 'No Wallet Address'}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
