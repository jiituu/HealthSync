import { Box } from "@mui/material";
import { Row, Typography } from "antd";

export const ContactUs = () => {
    return (
        // <Box className="px-4 py-20 text-neutral-100 text-center">
        //     <Typography className="text-3xl mb-8">Contact Us</Typography>
        //     <Typography className="max-w-lg mx-auto break-words">
        //         We’d love to hear from you! Whether you have questions, need support, or want to explore partnership opportunities, feel free to reach out.
        //     </Typography>
            // <Box className="mt-6">
            //     <Typography>📍 <strong>Address:</strong> [Your Office Location]</Typography>
            //     <Typography>📧 <strong>Email:</strong> <a href="mailto:support@healthsync.com" className="text-blue-400">support@healthsync.com</a></Typography>
            //     <Typography>📞 <strong>Phone:</strong> +1 (123) 456-7890</Typography>
            //     <Typography>🌐 <strong>Website:</strong> <a href="https://www.healthsync.com" className="text-blue-400">www.healthsync.com</a></Typography>
            // </Box>
            // <Typography className="mt-6">
            //     🚀 Let’s build a healthier future together!
            // </Typography>
        // </Box>
        <Row className='justify-around'>
            <Box className='px-4 py-20'>
                <Typography className="text-neutral-100 text-3xl mb-8">
                    Contact Us
                </Typography>
                <Typography className="text-neutral-100 max-w-lg break-words text-xl">
                    We’d love to hear from you! Whether you have questions, need support, or want to explore partnership opportunities, feel free to reach out.
                </Typography>
                <Box className="mt-6 !text-white">
                    <Typography className="!text-white">📍 <strong>Address:</strong> Addis Ababa, Bole</Typography>
                    <Typography className="!text-white">📧 <strong>Email:</strong> <a href="mailto:support@healthsync.com" className="text-[#FFA07A]">support@healthsync.com</a></Typography>
                    <Typography className="!text-white">📞 <strong>Phone:</strong> +1 (123) 456-7890</Typography>
                    <Typography className="!text-white">🌐 <strong>Website:</strong> <a href="https://health-sync-ivory.vercel.app/" className="text-[#FFA07A]">www.healthsync.com</a></Typography>
                </Box>
            </Box>
            <Box className='flex-[0.6]'></Box>
        </Row>
    );
};
