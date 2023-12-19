import { Autocomplete, TextField } from '@mui/material';

export const GroupAutoComplete = ({ disabled, selectedOption, Options, handleChange }) => {
    return (
        <Autocomplete
            disabled={disabled}
            fullWidth
            required
            id='users'
            size='small'
            value={selectedOption}
            options={Options}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => {
                handleChange(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant='standard'
                    placeholder='Select a group'
                    required={!selectedOption}
                />
            )}
        />
    );
};

export const IndividualAutoComplete = ({ disabled, selectedOptions, Options, handleChange }) => {
    return (
        <Autocomplete
            disabled={disabled}
            multiple
            fullWidth
            required
            id='users'
            size='small'
            value={selectedOptions}
            options={Options}
            getOptionLabel={(option) => option.display_name}
            onChange={(event, newValue) => {
                handleChange(newValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant='standard'
                    placeholder='Type Name'
                    required={!selectedOptions.length > 0}
                />
            )}
        />
    );
};
