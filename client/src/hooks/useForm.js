import useState from "react";
// write your custom hook here to control your checkout form

export const useForm = (initialValues, key) => {
  const [values, setValues] = useState(initialValues, key);

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return [values, handleChanges];
};
