interface ButtonProps {
  path: string;
  name: string;
}

export default function Button({ path, name }: ButtonProps) {
  return (
    <a
      href={path}
      class="flex justify-center items-center bg-white rounded-full h-18 border-2 border-gray-300 transition-colors"
    >
      <span class="text-xl font-bold text-gray-900 group-hover:underline group-focus:underline">
        {name}
      </span>
    </a>
  );
}
