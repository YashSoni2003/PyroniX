export default function Register() {
  return (
    <div className="auth-page">
      <h1>Register</h1>
      <form>
        <label>
          Full Name:
          <input type="text" name="fullname" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" required />
        </label>
        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
}
