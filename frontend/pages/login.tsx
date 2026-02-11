import { useState } from 'react';
import { api } from '../src/services/api';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', res.data.access_token);
    router.push('/');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>

      <input placeholder="Usuário" onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
