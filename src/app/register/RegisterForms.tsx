'use client'

import { FormGroup, Stack, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

interface FormValues {
    username: string;
    password: string;
    passwordConfirm: string;

    firstname: string;
    lastname: string;
    gender: boolean;
    address?: string;
    bio?: string;
}

const RegisterForms = ({ step }: { step: number }) => {
    const [formValues, setFormValues] = useState<FormValues>({
        username: "",
        password: "",
        passwordConfirm: "",

        firstname: "",
        lastname: "",
        gender: true,
    });

    const handleTextFieldChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    return (<form className="w-full">
        <FormGroup sx={{ display: step === 0 ? "" : "none" }}>
            <Stack spacing={3} className="w-full px-5">
                <TextField
                    id="name"
                    name="name"
                    label="Username"
                    value={formValues.username}
                    onChange={handleTextFieldChange}
                />
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formValues.password}
                    onChange={handleTextFieldChange}
                />
                <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Confirm Password"
                    value={formValues.passwordConfirm}
                    onChange={handleTextFieldChange}
                />
            </Stack>
        </FormGroup>
        <FormGroup sx={{ display: step === 1 ? "" : "none" }}>
            <Stack spacing={3} className="w-full px-5">
                <Stack direction="row" spacing={3}><TextField
                    id="name"
                    name="name"
                    label="First Name"
                    value={formValues.username}
                    onChange={handleTextFieldChange}
                />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Last Name"
                        value={formValues.password}
                        onChange={handleTextFieldChange}
                    /></Stack>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formValues.gender === true ? 1 : 0}
                        label="Age"
                        onChange={(e) => setFormValues({ ...formValues, gender: e.target.value === 1 ? true : false })}
                    >
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={0}>Female</MenuItem>
                    </Select></FormControl>
                <TextField
                    id="address"
                    name="address"
                    type="address"
                    label="Address"
                    value={formValues.address}
                    onChange={handleTextFieldChange}
                />
                <TextField
                    id="bio"
                    name="bio"
                    type="bio"
                    label="Bio"
                    value={formValues.bio}
                    onChange={handleTextFieldChange}
                />
            </Stack>
        </FormGroup>
        <FormGroup sx={{ display: step === 2 ? "" : "none" }}>

        </FormGroup>
    </form>)
}

export default RegisterForms;