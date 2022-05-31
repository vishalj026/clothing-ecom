import SignUp from '../../components/sign-up/sign-up.component';
import {signInWithGooglePopup, createUserDocFromAuth} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(response.user)

        // console.log(response);
    }
    return (
        <div>
            <h2>Sign In Page</h2>
            <button onClick={logGoogleUser}>Sign In with Google</button>

            <SignUp />
        </div>
    );
}

export default SignIn;