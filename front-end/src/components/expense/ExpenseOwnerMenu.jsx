import { Menu, MenuItem } from '@mui/material';

export default function ExpenseOwnerMenu(props) {
    const { anchorEl, setAnchorEl, options, setPaidBy } = props;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOwnerChange = (newOwner) => {
        setPaidBy(newOwner);
        handleClose();
    };

    return (
        <Menu
            id='paid-by-menu'
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {options.map((friend) => (
                <MenuItem
                    key={friend.display_name}
                    onClick={() => {
                        handleOwnerChange(friend);
                    }}
                >
                    {friend.display_name}
                </MenuItem>
            ))}
        </Menu>
    );
}
