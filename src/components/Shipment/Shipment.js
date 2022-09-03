import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './shipment.css'
const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
  
    console.log(watch("example")); 
  
    return (
    
      <form onSubmit={handleSubmit(onSubmit)} className='ship-form'>  
        <h1>Your shipment details..</h1>  
        <input {...register("name", { required: true })} defaultValue={loggedInUser.name} placeholder='Your Name'/>
        {errors.name && <span className='error'>Name is required</span>}
        
        <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder='Your Email'/>
        {errors.email && <span className='error'>Email is required</span>}

        <input {...register("address", { required: true })} placeholder='Your Address'/>
        {errors.address && <span className='error'>Address is required</span>}

        <input {...register("phone", { required: true })} placeholder='Your Phone Number'/>
        {errors.phone && <span className='error'> Phone Number is required</span>}

        <input type="submit" className='btn'/>
      </form>
    );
};

export default Shipment;