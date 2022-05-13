const textStyle = {
  label: "block text-sm font-medium text-gray-700 formkit-invalid:text-red-500",
  inner: "mt-1",
  input:
    "placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full text-base shadow-sm  border-gray-300 formkit-invalid:ring-red-500 formkit-invalid:border-red-500 rounded-md transition-colors",
  help: "text-xs text-gray-500 mt-1",
  outer: "mb-5",
  messages: "list-none p-0 mt-1 mb-0",
  message: "text-red-500 mb-1 text-xs",
};
const formkitClasses: Partial<any> = {
  text: {
    ...textStyle,
  },
  email: {
    ...textStyle,
  },
  number: {
    ...textStyle,
  },
};

export default formkitClasses;
