const SignUp = () => {
  return (
    <>
      <div class="flex flex-col items-center justify-start md:(w-1/2) w-4/5">
        <input
          type="text"
          placeholder="What's your name"
          class="p-2 w-full border-2 border-yellow-300 rounded-md text-lg mt-4 text-center duration-300 focus:(outline-none border-yellow-400)"
        />
      </div>
    </>
  );
};

export default SignUp;
