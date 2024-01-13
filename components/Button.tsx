interface ButtonProps {
  path: string;
  name: string;
}

export default function Button({ path, name }: ButtonProps) {
  return (
    <div class="flex flex-col items-center justify-start my-8">
      <a
        href={path}
        class="flex justify-center items-center bg-white rounded-full w-2/3 h-16 border-2 border-gray-300 transition-colors"
      >
        <span class="text-xl font-bold text-gray-900 group-hover:underline group-focus:underline">
          {name}
        </span>
      </a>
    </div>
  );
}
