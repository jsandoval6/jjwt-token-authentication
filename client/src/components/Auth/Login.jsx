import React, {useState} from 'react';
import axios from 'axios'




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const formData = { email, password };
        try{
            const res = await axios.post('http://localhost:3001/api/auth/login', formData);
            console.log(res);
            localStorage.setItem('user', res.data.token);
            setErrorMessage('')
        } catch(err) {
            console.log(err)
            setErrorMessage(err.response.data.message)
        }
       
    }

  return (
      <div className="ui container">
    <div className="ui middle aligned center aligned grid">
    <div className="column">
        <h2 className="ui image header">
        <div className="content">
            Log-in to your account
        </div>
        </h2>
    {errorMessage && (
    <div className="ui negative message">
        <i className="close icon" onClick={() => setErrorMessage('')}></i>
        <div className="header">
            {errorMessage}
        </div>
    </div>)}    
    <form  className="ui form" onSubmit={submit}>
      <div className="ui stacked secondary  segment">
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="E-mail address" />
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}placeholder="Password" />
          </div>
        </div>
        <button className="ui fluid large teal submit button">Login</button>
      </div>

      <div className="ui error message"></div>

    </form>

  </div>
</div>
      </div>
   
  )
}

export default Login