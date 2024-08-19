import Image from "next/image";
import LoginFooter from "../components/LoginFooter/LoginFooter";
import LoginHeader from "../components/LoginHeader/LoginHeader";
import loginStyles from "./style/login.module.scss";
import LoginForm from "../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className={loginStyles.login}>
      <title>Login</title>
      <div
        className={`container-fluid d-flex min-vh-100 flex-column flex-grow-0 body ${loginStyles.body}`}
      >
        <LoginHeader />
        <main className="d-flex flex-column flex-grow-1 row">
          <div className="d-flex justify-content-center align-items-center flex-grow-1 ">
            <div className="col-9 col-sm-8 col-md-5 col-lg-4 col-xl-4 col-xxl-3 shadow bg-body-secondary py-4 rounded-3">
              <div className="m-0 row">
                <div className="w-75 ms-3">
                  <Image
                    className="img-fluid"
                    src="/img/logoIfam.png"
                    alt="logo"
                    width={200}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              </div>
              <LoginForm />
            </div>
          </div>
        </main>

        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
