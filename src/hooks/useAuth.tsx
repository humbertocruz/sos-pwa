const useAuth = () => {
  
  const doLogin = (email:string,password:string) => {
    const token = fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => data.token)
    return token
  }

  return { 
    doLogin
   }
}
export default useAuth