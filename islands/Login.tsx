const Login = () => {
  return (
    <div class="flex flex-col items-center justify-start my-32">
      <p class="text-2xl font-bold text-gray-900 ">
        Log In Bookmobile
      </p>
      <input
        type="text"
        placeholder="Name"
        class="p-2 w-2/3 border-2 border-gray-300 rounded-md text-lg mt-16 text-left duration-300 focus:(outline-none border-gray-400)"
      />
    </div>
  );
};

export default Login;
