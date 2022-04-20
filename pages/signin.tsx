import AuthForm from "../components/authForm";

const SignIn = () => {
  return <AuthForm mode="signin" />;
};

SignIn.excludeLayout = true;

export default SignIn;
