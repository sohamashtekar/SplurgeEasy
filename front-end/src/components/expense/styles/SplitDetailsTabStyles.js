import { styled } from '@mui/material/styles';
import { Tooltip, Tab, Box, Tabs } from '@mui/material';

const TabWithToolTip = (props) => {
    const { tooltipText } = props;
    const tabProps = { ...props };
    delete tabProps.tooltipText;
    return (
        <Tooltip title={tooltipText} arrow>
            <Tab {...tabProps} />
        </Tooltip>
    );
};

export const StyledTab = styled(TabWithToolTip)(({ theme }) => ({
    backgroundColor: 'transparent',
    border: '2px solid #ccc',
    '&.Mui-selected': {
        backgroundColor: '#DDDDDD',
        color: '#000000',
        border: '2px solid #ccc',
    },
    '&.MuiButtonBase-root': {
        minWidth: 0,
    },
}));

export function StyledTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

