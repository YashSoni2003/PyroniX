export default function Login() {
  return (
    <div className="auth-page">
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
}
