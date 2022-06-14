import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { AuthenticationContainer } from './authenticaion.styles';
const Authentication = () => {
    
    return (
        <AuthenticationContainer>
            <SignIn />
            <SignUp />
        </AuthenticationContainer>
    );
}

export default Authentication;