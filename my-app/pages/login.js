import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { authenticateUser } from '@/lib/authenticate';
import { getFavourites } from '@/lib/userData';

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtom();
      router.push("/");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="glass-panel p-5 text-white" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
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
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input 
              className="form-control" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}