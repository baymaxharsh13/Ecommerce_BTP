import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGoogle } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto flex justify-between items-start">
        <div className="flex space-x-8 w-1/2">
          {/* Contact Info Section */}
          <div>
            <h3 className="font-bold text-lg">Contact Us</h3>
            <p>Email: support@yourstore.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Your Street, City, Country</p>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul>
              <li><a href="/about-us" className="hover:underline">About Us</a></li>
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start w-1/2">
          {/* Newsletter Signup Section */}
          <div className="mb-8">
            <h3 className="font-bold text-lg">Newsletter</h3>
            <p>Sign up to receive the latest updates and promotions!</p>
            <form className="flex mt-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="p-2 rounded-l-md text-black"
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Payment Methods Section */}
          <div>
            <h3 className="font-bold text-lg">We Accept</h3>
            <div className="flex space-x-4 mt-2">
              <FaGoogle className="text-gray-400" />
              {/* Add other payment icons as needed */}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} Harsh Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
