import React, {useCallback, useEffect, useState} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import {endpointUrl} from "./Common";

export default function SelectCategory({onChangeFunction, currentValue}) {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(currentValue);
    const [inputValue, setInputValue] = useState('');
    const [keyPressValue, setKeyPressValue] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(endpointUrl() + '/category/select/active');

            let categories = []
            response.data.forEach(element => {
                categories.push(element.category);
            })

            setOptions(categories);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                } else {
                    alert("fetchData" + JSON.stringify(error.response.data));
                }
            }
        }
    }, []);

    useEffect(() => {
        //setOptions(['future', 'outstanding', 'cleared']);
        let response = fetchData();
        console.log(response);

        if (value === '') {
            setValue(currentValue);
        }
    }, [value, fetchData, currentValue]);

    const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
            options.find((state) => {
                if (state.startsWith(inputValue)) {
                    setKeyPressValue(state);
                    return state;
                }
                return "";
            })
        }
    }

    return (
        <div>
            <Autocomplete
                //getOptionLabel={(options) => options}
                defaultValue={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    onChangeFunction(newValue);
                }}

                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    if (keyPressValue === '') {
                        setInputValue(newInputValue);
                    } else {
                        setInputValue(keyPressValue)
                        setKeyPressValue('')
                    }
                }}
                style={{width: 140}}
                options={options}

                renderInput={(params) => <TextField {...params} onKeyDown={(e) => handleKeyDown(e)}/>}
            />
        </div>
    );
}