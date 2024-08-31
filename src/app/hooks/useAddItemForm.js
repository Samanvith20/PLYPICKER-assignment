
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const useAddItemForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
   
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      image: null,
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

    try {
      const response = await fetch('/api/create-product', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        
        router.push('/'); // Redirect to homepage or any other page
      } else {
        setError('server', { message: result.message });
      }
    } catch (err) {
      console.error('Error:', err);
      setError('server', { message: 'An error occurred while adding the item.' });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    reset,
  };
};

export default useAddItemForm;
