import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '@/lib/authenticate'; 

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      setWarning("Passwords do not match");
      return;
    }
    try {
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="glass-panel p-5 text-white" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 className="text-center mb-4">Create Account</h2>
        {warning && <div className="alert alert-danger" role="alert">{warning}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
              className="form-control" 
              type="text" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              className="form-control" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input 
              className="form-control" 
              type="password" 
              value={password2} 
              onChange={(e) => setPassword2(e.target.value)} 
            />
          </div>
          <button className="btn btn-success w-100 py-2" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}