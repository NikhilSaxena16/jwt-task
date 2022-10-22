import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, []);

    const handleLogin = async () => {
        console.log(email, password)
        let result = await fetch('http://localhost:2000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/');
        } else {
            alert('please enter connect')
        }
    }

    return (
        <div className='login'>
            <input className='inputBox' type="text" placeholder='Enter mail'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className='inputBox' type="password" placeholder='Enter password '
                onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appButton" type="button">Login</button>

        </div>
    );
};

export default Login;