import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import './authenticaion.styles.scss';
const Authentication = () => {
    
    return (
        <div className='authenticaion-container'>
            <SignIn />
            <SignUp />
        </div>
    );
}

export default Authentication;