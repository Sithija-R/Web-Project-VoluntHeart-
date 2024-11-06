import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Help = () => {

const navigate = useNavigate() 



  return (
    <div className='h-[86vh] overflow-y-scroll space-y-3 mt-5 hideScrollBar mx-1 relative'>

<div
        className="text-gray-900 font-semibold  text-xl left-5 z-50 flex justify-start items-center space-x-1 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
        <p>Back</p>
      </div>
        <header className='sticky top-0 bg-white py-2 rounded-md mb-1   '>
        
        <ul className='flex items-center justify-evenly px-2 text-lg text-blue-700 '>
            <li><a href="#login">How to Login</a></li>
            <li><a href="#register">How to Register</a></li>
            <li><a href="#use-site">How to Use the Site</a></li>
            <li><a href="#faq">FAQ</a></li>
        </ul>
   
        </header>
    <section id="login" className='bg-white my-5 px-5 py-2 rounded-lg shadow-md'>
        <h2 className='text-2xl py-2 text-[#0cac74]'>How to Login</h2>
        <p className='text-lg py-1'>Follow these steps to login:</p>
        <ol className='list-decimal list-inside px-8'>
            <li>Go to the login page.</li>
            <li>Enter your username and password.</li>
            <li>Click the "Login" button.</li>
        </ol>
    </section>
    <section id="register" className='bg-white my-5 px-5 py-2 rounded-lg shadow-md'>
        <h2 className='text-2xl py-2 text-[#0cac74]'>How to Register</h2>
        <p className='text-lg py-1'>Follow these steps to register:</p>
        <ol className='list-decimal list-inside px-8'>
            <li>Go to the registration page.</li>
            <li>Fill out the registration form with your details.</li>
            <li>Click the "Register" button.</li>
            <li>Check your email for a confirmation link.</li>
            <li>Click the confirmation link to activate your account.</li>
        </ol>
    </section>
    <section id="use-site" className='bg-white my-5 px-5 py-2 rounded-lg shadow-md'>
        <h2 className='text-2xl py-2 text-[#0cac74]'>How to Use the Site</h2>
        <p className='text-lg py-1'>Once logged in, you can navigate the site using the main menu. Here are some tips:</p>
        <ul className='list-inside list-disc px-8 '>
            <li>To update your profile, go to the "Profile" section.</li>
            <li>To view your dashboard, click on "Dashboard".</li>
            <li>For any assistance, contact support through the "Support" page.</li>
        </ul>
    </section>
    <section id="faq" className='bg-white my-5 px-5 py-2 rounded-lg shadow-md'>
        <h2 className='text-2xl py-2 text-[#0cac74]'>FAQ</h2>
        <h3 className='text-xl font-semibold text-blue-700'>Account and Login Issues</h3>
        <p className='text-lg py-1 px-5'><strong>How do I create an account?</strong> <br/>Go to the registration page, fill in your details, and click "Register".</p>
        <p className='text-lg py-1 px-5'><strong>How do I log in to my account?</strong> <br/>Click on the "Login" button at the top right and enter your credentials.</p>
        <p className='text-lg py-1 px-5'><strong>What should I do if I forget my password?</strong> <br/>Click on "Forgot Password" on the login page and follow the instructions.</p><br/>
        
        <h3 className='text-xl font-semibold text-blue-700'>Site Navigation and Usage</h3>
        <p className='text-lg py-1 px-5'><strong>How do I navigate the site?</strong> <br/>Use the main menu at the top to access different sections of the site.</p>
        <p className='text-lg py-1 px-5'><strong>How do I search for volunteer opportunities?</strong> <br/>Use the search bar at the top of the page to find opportunities by location, cause, or organization.</p><br/>
        
        <h3 className='text-xl font-semibold text-blue-700'>Volunteer Opportunities</h3>
        <p className='text-lg py-1 px-5'><strong>How do I sign up for a volunteer opportunity?</strong> <br/>Find an opportunity that interests you, and click "Sign Up" to register.</p>
        <p className='text-lg py-1 px-5'><strong>Can I volunteer with friends or family?</strong> <br/>Yes, you can sign up together for the same opportunities.</p>
        <p className='text-lg py-1 px-5'><strong>How do I know if my application has been accepted?</strong> <br/>You will receive an email confirmation once your application is reviewed and accepted.</p><br/>
        
        <h3 className='text-xl font-semibold text-blue-700'>Profile and Preferences</h3>
        <p className='text-lg py-1 px-5'><strong>How do I update my profile information?</strong> <br/>Go to the "Profile" section and make the necessary updates.</p>
        <p className='text-lg py-1 px-5'><strong>How do I set my volunteer preferences?</strong> <br/>In your profile, you can specify your interests and availability to receive personalized recommendations.</p><br/>
        
        <h3 className='text-xl font-semibold text-blue-700'>Technical Support</h3>
        <p className='text-lg py-1 px-5'><strong>Why am I experiencing issues with the website?</strong> <br/>Please clear your browser cache and try again. If the issue persists, contact support.</p>
        <p className='text-lg py-1 px-5'><strong>How do I report a bug?</strong> <br/>Use the "Contact Us" form to report any technical issues.</p><br/>
        
        <h3 className='text-xl font-semibold text-blue-700'>Privacy and Security</h3>
        <p className='text-lg py-1 px-5'><strong>How do you handle my personal information?</strong> <br/>Please refer to our Privacy Policy for details.</p>
        <p className='text-lg py-1 px-5'><strong>Are my payment details secure?</strong> <br/>Yes, we use industry-standard encryption to protect your payment information.</p><br/>
        
        <h3 className='text-xl font-semibold text-blue-700'>Contact and Support</h3>
        <p className='text-lg py-1 px-5'><strong>How can I contact customer support?</strong> <br/>You can reach us via the "Contact Us" page or call our support number.</p>
        <p className='text-lg py-1 px-5'><strong>What are your customer support hours?</strong> <br/>Our support team is available from 9 AM to 5 PM, Monday to Friday.</p><br/>
        
        <h3 className='text-xl font-semibold text-blue-700'>General Information</h3>
        <p className='text-lg py-1 px-5'><strong>Where can I find more information about VoluntHeart?</strong> <br/>Visit the "About Us" page for more details.</p><br/>
    <footer>
        <p className='text-center text-lg text-[#0cac74]'>&copy; 2024 VoluntHeart</p>
    </footer>
    </section >



    </div>
  )
}

export default Help