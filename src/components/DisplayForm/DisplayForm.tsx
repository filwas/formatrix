import { useDynamicFormContext } from "@/context/DynamicFormContext";
import { FormType, generateSchema } from "@/types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"


interface DisplayFormProps {
  formId: string;
}

const DisplayForm = ({ formId }: DisplayFormProps) => {
  const { dynamicForm } = useDynamicFormContext();
  const  elements  = dynamicForm.formData || [];
  console.log(elements)
  const formSchema = generateSchema(dynamicForm)
  
  const { register, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: dynamicForm as FormType,
  });

  const onSubmit = async (data: any) => {
    try {
      // const response = await fetch(dynamicForm.webhookUrl as string, {
        const response = await fetch("https://submit-form.com/kGteNP1Hj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        //mode: "no-cors"
      });
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Form ID: {formId}</h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(elements) && elements.map((element: any, index: number) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {element.label}
            </label>
            <input
              type={element.type}
              placeholder={element.placeholder}
              required={element.required}
              {...register(element.name)} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default DisplayForm;
