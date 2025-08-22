import SigninForm from "../components/SigninForm";

const SigninPage = () => {
  return (
    <div>
      <div className="w-full max-w-md mx-auto mt-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold  mb-2">Iniciar Sesión</h3>
        </div>
        <SigninForm />
      </div>
    </div>
  );
};
export default SigninPage;
