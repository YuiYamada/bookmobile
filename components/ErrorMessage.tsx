interface ErrorMessageProps {
  hasError: boolean;
  errorMessage: string;
}

export default function ErrorMessage(
  { hasError, errorMessage }: ErrorMessageProps,
) {
  console.log(hasError);

  return hasError && (
    <p class="text-xs mt-4 font-bold text-red-500 ">{errorMessage}</p>
  );
}
