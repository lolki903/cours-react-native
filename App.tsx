import * as React from 'react';
import { MainStack } from './stack/MainStack';
import Login from './screen/Login';
import { UserProvider, useUserContext } from './providers/UserContext';

function App() {
  return (
    <UserProvider>
        <MainApp />
    </UserProvider>
  );
}

function MainApp() {
  const { user, setUser } = useUserContext();
  const handleLogin = (userInfo: { name: string; email: string }) => {
    setUser(userInfo);
  };

  return (
      user ? <MainStack /> : <Login onLogin={handleLogin} />
  );
}

export default App;