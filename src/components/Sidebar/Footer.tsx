import { Link } from 'interweave-autolink';
import Script from 'next/script';
import React, { useState } from 'react';

const Footer = () => (
  <div className="mb-8 mt-6 hidden xl:block">
    <p className="mt-5 text-sm text-gray-400">© 2022 LensShare</p>
    <Link href="/terms">
      <p className="mt-1 cursor-pointer text-sm text-black hover:underline dark:text-white">
        Terms of Service
      </p>
    </Link>
    <Link href="/privacy">
      <p className="mt-1 cursor-pointer text-sm text-black hover:underline dark:text-white">
        Privacy Policy
      </p>
    </Link>
  </div>
);

export default Footer;
