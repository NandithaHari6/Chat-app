

const Login = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.location.href = "http://localhost:4000/api/auth/google/login";
        }}
      >
        Login with Google
      </button>
    </div>
  )
}

export default Login