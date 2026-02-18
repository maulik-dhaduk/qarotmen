import Signin from "../Page/Signin";
import Signup from "../Page/Signup";

export default function AuthModal({ showLogin, setShowLogin }) {
  return (
    <div className="modal fade" id="authModal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{showLogin ? "Login" : "Register"}</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            {showLogin ? (
              <Signin switchToRegister={() => setShowLogin(false)} />
            ) : (
              <Signup switchToLogin={() => setShowLogin(true)} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}