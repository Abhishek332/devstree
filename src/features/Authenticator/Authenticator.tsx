import { useState } from "react";
import { InputBox } from "../../components";
import "./Authenticator.scss";

interface formState {
    [key: string]: string;
}

const Authenticator = () => {
    const [state, setState] = useState<formState>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        mobile: "",
        dob: "",
    }),
        [showSignIn, setShowSignIn] = useState<boolean>(false),
        { first_name, last_name, email, password, mobile, dob } = state;

    let formFields = [
        {
            name: 'first_name',
            value: first_name,
            label: 'First Name',
        },
        {
            name: 'last_name',
            value: last_name,
            label: 'Last Name',
        },
        {
            name: 'email',
            value: email,
            label: 'Email',
            type: 'email'
        },
        {
            name: 'mobile',
            value: mobile,
            label: 'Contact No.',
            type: 'number',
        },
        {
            name: 'password',
            value: password,
            label: 'Password',
            type: 'password'
        },
        {
            name: 'dob',
            value: dob,
            label: 'Date of Birth',
            type: 'date'
        }
    ];

    if (showSignIn) {
        formFields = formFields.filter((input: any) => (input.name === 'email' || input.name === 'password'))
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    },
        handleSubmit = (e: any) => {
            e.preventDefault();
        };


    return (
        <div className="authenticator">
            <div className="background">
                <img src="background.png" alt="" />
            </div>
            <div className="form-box flex-col-center">
                {
                    showSignIn ? <div >
                        <p>Welcome Back</p>
                        <h1>Login to your Account</h1>
                    </div>
                        : <h1>Create New Profile</h1>
                }
                <form onSubmit={handleSubmit} className="flex-col-center">
                    {
                        formFields.map((inputData, i) => <InputBox key={`form-input-${i}`} {...inputData} handleChange={handleChange} required />)
                    }
                    <button>Submit</button>
                </form>
                {
                    showSignIn ? <p>Don't have a account? <span onClick={() => setShowSignIn(false)}>SignUp</span> here.</p>
                        : <p>Already have an account? <span onClick={() => setShowSignIn(true)}>SignIn</span> here.</p>
                }
            </div>
        </div>
    )
}

export default Authenticator