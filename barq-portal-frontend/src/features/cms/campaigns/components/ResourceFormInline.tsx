import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/shared/components/ui/input';
import { countries } from '@/shared/constants/countries';

interface ResourceFormInlineProps {
    resourceTitle?: string;
}

export default function ResourceFormInline({ resourceTitle = "Managed Services" }: ResourceFormInlineProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        organizationName: '',
        countryCode: 'KSA',
        mobileNumber: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            countryCode: value
        });
    };

    const selectedCountry = countries.find(country => country.code === formData.countryCode);

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="w-full p-10 max-w-[624px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(10px)",
            }}
        >
            <div className='flex flex-col flex-1 w-[560px] items-center justify-center'>
                <motion.h2
                    className="text-white text-[36px] frutiger-lt-std-bold leading-[43.2px] text-center mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    Join Us at the Event
                </motion.h2>
                <motion.p
                    className="text-[#ECEEEE] text-[18px] leading-[27px] text-center mb-4 max-w-[650px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    Fill out this form
                </motion.p>
            </div>
            <div className='flex flex-col gap-4 items-center'>
                <div className="flex gap-4">
                    <Input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="py-4 px-6 h-[56px] w-[264px]"
                        placeholder="First Name"
                    />
                    <Input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="py-4 px-6 h-[56px] w-[264px]"
                        placeholder="Last Name"
                    />
                </div>
                <Input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="py-4 px-6 h-[56px] w-[544px]"
                    placeholder="Email"
                />
                <div className="flex gap-0">
                    <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={e => handleSelectChange(e.target.value)}
                        className="py-4 px-6 h-[56px] min-w-[131px]"
                    >
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.code}
                            </option>
                        ))}
                    </select>
                    <input
                        type="tel"
                        name="mobileNumber"
                        required
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="py-4 px-6 h-[56px] w-[413px]"
                        placeholder={`${selectedCountry?.dialCode} Mobile Number`}
                    />
                </div>
                <Input
                    type="text"
                    name="organizationName"
                    required
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="py-4 px-6 h-[56px] w-[544px]"
                    placeholder="Company / Organization Name"
                />
                <Input
                    type="text"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="py-4 px-6 h-[56px] w-[544px]"
                    placeholder="Position"
                />
                <button
                    type="submit"
                    className="mt-2 w-[544px] h-[56px] text-white text-[18px]"
                >
                    Submit
                </button>
            </div>
        </motion.form>
    );
}
