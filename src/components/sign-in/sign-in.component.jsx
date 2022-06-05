import { useState } from 'react';

import { signInWithGooglePopup, createUserDocFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import Button from '../UI/button/button.component';
import FormInput from '../UI/form-input/form-input.component';

import './sign-in.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};
const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

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

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch(e) {
            switch(e.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;

                case 'auth/user-not-found':
                    alert('Did not find a user with this email');
                    break;

                default:
                    console.log('Error while signing in', e);
            }
        }
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required name="email" onChange={handleChange} value={email}/>
                <FormInput label="Password" type="password" required name="password" onChange={handleChange} value={password}/>
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' onClick={logGoogleUser} buttonType='google'>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;