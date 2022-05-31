import { useState } from 'react';
import { createAuthUserFromEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../UI/button/button.component';

import FormInput from '../UI/form-input/form-input.component';
import './sign-up.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};
const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        setFormFields((prevState, prevProps) => {
            const updatedFormFields = {...prevState};
            updatedFormFields[event.target.name] = event.target.value;
            return updatedFormFields;
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password != confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const {user} = await createAuthUserFromEmailAndPassword(email, password);
            
            await createUserDocFromAuth(user, {
                displayName
            });

            resetFormFields();
        }
        catch(e) {
            if(e.code == 'auth/email-already-in-use') {
                alert('Email already in use');
            }
            console.log('Error creating user with email and password', e);
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="displayName">Display Name</label>
                <input type="text" required name="displayName" onChange={handleChange} value={displayName}/> */}

                <FormInput label="Display Name" type="text" required name="displayName" onChange={handleChange} value={displayName}/>

                <FormInput label="Email" type="email" required name="email" onChange={handleChange} value={email}/>

                <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password}/>

                <FormInput label="Confirm Password" type="password" required name="confirmPassword" onChange={handleChange} value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUp;