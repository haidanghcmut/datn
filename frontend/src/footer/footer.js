import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaGithubSquare,
  FaDribbbleSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
      <div>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">OCR Hub</h1>
        <p className="py-4">
          Explore the power of OCR technology. Effortlessly extract text from
          images and documents to enhance your workflow.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-gray-400">Services</h6>
          <ul>
            <li className="py-2 text-sm">Text Recognition</li>
            <li className="py-2 text-sm">Document Analysis</li>
            <li className="py-2 text-sm">Data Extraction</li>
            <li className="py-2 text-sm">Image-to-Text</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Resources</h6>
          <ul>
            <li className="py-2 text-sm">Documentation</li>
            <li className="py-2 text-sm">Tutorials</li>
            <li className="py-2 text-sm">API Reference</li>
            <li className="py-2 text-sm">Case Studies</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Company</h6>
          <ul>
            <li className="py-2 text-sm">About Us</li>
            <li className="py-2 text-sm">Blog</li>
            <li className="py-2 text-sm">Careers</li>
            <li className="py-2 text-sm">Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
